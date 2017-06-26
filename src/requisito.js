import R from 'ramda'
import {nivelEspecialidadeFromPC} from './especialidade'
import { limites1, roundTo2 } from './utils'

const validateRamoConhecimento = ramo => {
  const invalid = ![
    'servico',
    'cultura',
    'habilidadesEscoteiras',
    'desportos',
    'cienciaTecnologia'].includes(ramo)
  if (invalid) {
    throw Error('Ramo inválido. ' + ramo)
  }
  return ramo
}

export const requisitoSatisfeitoEspecialidade = ({percentuais, requisito}) => id =>
  R.compose(
    limites1,
    nivel => nivel / requisito[id],
    nivelEspecialidadeFromPC
  )(percentuais[id])

export const requisitoSatisfeitoRamoConhecimento = ({requisito, niveis}) => ramo =>
  R.compose(
    limites1,
    pc => pc / R.keys(requisito[ramo]).length,
    R.reduce((pc, nivel) =>
      pc + niveis[ramo][nivel] / requisito[ramo][nivel], 0),
    R.keys
  )(requisito[ramo])

export const sumRequisitosSatisfeitos = (data, requisitoSatisfeito) =>
  R.compose(
    percentuais => R.reduce(R.add, 0, percentuais) / percentuais.length,
    R.map(requisitoSatisfeito(data)),
    R.keys
  )(data.requisito)

const sumPropsValues = obj =>
  R.compose(
    R.reduce(({acc, key}) => acc + obj[key]),
    R.keys
  )(obj)

const reduceNiveisRamo = (nivelMinimo) => (acc, ramo) =>
  acc + sumNiveisRamoConhecimento(ramo, nivelMinimo)

const sumNiveisRamoConhecimento = (ramo, nivelMinimo) =>
  R.compose(
    R.reduce(R.add, 0),
    R.map(nivel => ramo[nivel]),
    R.filter(nivel => nivel >= nivelMinimo),
    R.keys
  )(ramo)


export const calcularPercentualRamos =({requisito, ramosConhecimento})  =>
  R.compose(
    limites1,
    roundTo2,
    x => x / requisito.quantidadeMinima,
    R.reduce(reduceNiveisRamo(requisito.nivelMinimo), 0),
    R.map(R.compose(
      key => ramosConhecimento[key],
      validateRamoConhecimento
    )),
    R.keys
  )(ramosConhecimento)

export const calcularPercentualDistribuicao = ({requisito, ramosConhecimento}) =>
  R.compose(
    limites1,
    roundTo2,
    x => x / 5,
    R.reduce(R.add, 0),
    R.map(key =>
      sumNiveisRamoConhecimento(ramosConhecimento[key], requisito.nivelMinimo) > 0 ? 1 : 0),
    R.keys
  )(ramosConhecimento)

const pesos = {
  quantidadeEspecialidadeRamos: 9/10,
  especialidadesDistribuidas: 1/10,
  especialidadesRequeridas: 1/2,
  ramosRequeridos: 1/2
}

export const calcularPercentual = data => {
  const pcQuantidadeEspecialidadeRamos = calcularPercentualRamos(data)
  const pcEspecialidadesDistribuidas = calcularPercentualDistribuicao(data)
  const pcEspecialidadesRequeridas = sumRequisitosSatisfeitos({
    requisito: data.requisito.especialidades,
    percentuais: data.percentuais
  }, requisitoSatisfeitoEspecialidade)
  const pcRamosRequeridos = sumRequisitosSatisfeitos({
    requisito: data.requisito.ramosConhecimento,
    niveis: data.ramosConhecimento
  }, requisitoSatisfeitoRamoConhecimento)


  const result = (pcQuantidadeEspecialidadeRamos * pesos.quantidadeEspecialidadeRamos
    + pcEspecialidadesDistribuidas * pesos.especialidadesDistribuidas)
    * 0.9
    + ((pcEspecialidadesRequeridas * pesos.especialidadesRequeridas
      + pcRamosRequeridos * pesos.ramosRequeridos))
    * 0.1

  return roundTo2(result)
}
