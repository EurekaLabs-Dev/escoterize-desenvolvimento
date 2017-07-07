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

export const percentualRequisitoEspecialidade = (percentual, nivelRequirido) =>
  limites1(nivelEspecialidadeFromPC(percentual) / nivelRequirido)

//export const requisitoSatisfeitoEspecialidade = ({percentuais, requisito}) => id =>
//  percentualRequisitoEspecialidade(percentuais[id], requisito)

//export const requisitoSatisfeitoRamoConhecimento = ({requisito, niveis}) => ramo =>
//  R.compose(
//    limites1,
//    pc => pc / R.keys(requisito[ramo]).length,
//    R.reduce((pc, nivel) =>
//      pc + niveis[ramo][nivel] / requisito[ramo][nivel], 0),
//    R.keys
//  )(requisito[ramo])
//
//export const sumRequisitosSatisfeitos = (data, requisitoSatisfeito) =>
//  R.compose(
//    percentuais => R.reduce(R.add, 0, percentuais) / percentuais.length,
//    R.map(requisitoSatisfeito(data)),
//    R.keys
//  )(data.requisito)

export const percentualEspecialidades = (requisito, desenvolvimento) =>
  R.compose(
    limites1,
    total => total / requisito.quantidade,
    R.reduce(R.add, 0),
    R.map(id => percentualRequisitoEspecialidade(desenvolvimento[id], requisito.nivelMinimo)),
    R.keys
  )(desenvolvimento)

export const calcularPercentualRamos = (requisito, desenvolvimento)  =>
  R.compose(
    limites1,
    roundTo2,
    x => x / requisito.quantidadeMinima,
    R.reduce(R.add, 0),
    R.map(
      R.compose(
        R.flatten,
        values => R.range(requisito.nivelMinimo, 4)
          .map(nivel => values['n'+nivel]),
        key => desenvolvimento[key]
      )
    ),
    R.keys
  )(desenvolvimento)

export const calcularPercentualDistribuicao = (requisito, desenvolvimento) =>
  R.compose(
    limites1,
    roundTo2,
    x => x / 5,
    R.reduce(R.add, 0),
    R.map(key => desenvolvimento[key].total > 0 ? 1 : 0),
    R.keys
  )(desenvolvimento)

const pesos = {
  quantidadeEspecialidadeRamos: 9/10,
  especialidadesDistribuidas: 1/10,
  especialidadesRequeridas: 1/2,
  ramosRequeridos: 1/2
}

const percentuaisEspecialidadesEspecificas = (requisito, desenvolvimento) => {
  const desenvolvimentoEspecifico = requisito.especialidades.reduce((acc, id) => 
    R.merge(acc, {[id]: desenvolvimento[id]}) 
    , {}
  )
  return percentualEspecialidades({
    nivelMinimo: requisito.nivelMinimo,
    quantidade: requisito.especialidades.length
  }, desenvolvimentoEspecifico)
}

export const percentualCordao = (requisito, desenvolvimento) => {

}

export const calcularPercentual = (requisito, desenvolvimento) => {
  const pcQuantidadeEspecialidadeRamos = calcularPercentualRamos(requisito, desenvolvimento)
  const pcEspecialidadesDistribuidas = calcularPercentualDistribuicao(requisito, desenvolvimento)
  const pcRamosRequeridos = calcularPercentualRamos(requisito, desenvolvimento)
  const pcEspecialidadesRequeridas = percentuaisEspecialidadesEspecificas(requisito, desenvolvimento)

  const result = (pcQuantidadeEspecialidadeRamos * pesos.quantidadeEspecialidadeRamos
    + pcEspecialidadesDistribuidas * pesos.especialidadesDistribuidas)
    * 0.9
    + ((pcEspecialidadesRequeridas * pesos.especialidadesRequeridas
      + pcRamosRequeridos * pesos.ramosRequeridos))
    * 0.1

  return roundTo2(result)
}
