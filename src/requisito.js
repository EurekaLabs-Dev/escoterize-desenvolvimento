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

export const percentualRamos = (requisito, desenvolvimento)  =>
  R.compose(
    limites1,
    roundTo2,
    x => x / requisito.quantidadeMinima,
    R.reduce(R.add, 0),
    R.flatten,
    R.map(
      R.compose(
        values => R.range(requisito.nivelMinimo, 4)
          .map(nivel => values['n'+nivel] || 0),
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
    R.merge(acc, {[id]: desenvolvimento[id] || 0})
    , {}
  )
  const pc =  percentualEspecialidades({
    nivelMinimo: requisito.nivelMinimo,
    quantidade: requisito.quantidadeMinima
  }, desenvolvimentoEspecifico)
  return limites1(pc)
}

const percentualServicos = ({SERVICOS: {n2 = 0, n3 = 0}}) =>
  limites1((n2 + n3)/ 3)

export const percentualCordao = (requisito, desenvolvimento) => {
  const {validaServicos} = requisito
  const totalEspecialidadesPeso = requisito.quantidadeMinima + 3 + 2
  const pesos = [
    0.9 * requisito.quantidadeMinima / totalEspecialidadesPeso,
    0.1 * requisito.quantidadeMinima / totalEspecialidadesPeso,
    (validaServicos ? 3 : 0) / totalEspecialidadesPeso,
    (validaServicos ? 2 : 5) / totalEspecialidadesPeso
  ]
  const percentuais = [
    percentualRamos(R.merge(requisito, {nivelMinimo: 1}), desenvolvimento),
    calcularPercentualDistribuicao(requisito, desenvolvimento),
    percentualServicos(desenvolvimento),
    percentuaisEspecialidadesEspecificas(R.merge(requisito, {quantidadeMinima: 1}), desenvolvimento),
  ]

  return R.compose(
    roundTo2,
    R.reduce(R.add, 0),
    R.map(([peso, pc]) => peso * pc)
  )(R.zip(pesos, percentuais))
}
