import R from 'ramda'
import {nivelEspecialidadeFromPC} from './especialidade'
import { limites1 } from './utils'

const pcEspecialidades = R.lens(data => ({
  requisitos: data.requisitos.especialidade,
  percentuais: data.especialidades
}), R.assoc('pcEspecialidades'))

const pcRamosConhecimento = R.lens(R.identity, R.assoc('pcRamosConhecimento'))

export const requisitoSatisfeitoEspecialidade = ({percentuais, requisitos}) => id =>
  R.compose(
    limites1,
    nivel => nivel / requisitos[id],
    nivelEspecialidadeFromPC
  )(percentuais[id])

export const sumDoneEspecialidades = data =>
  R.compose(
    pcs => R.reduce(R.add, 0, pcs) / pcs.length,
    R.map(requisitoSatisfeitoEspecialidade(data)),
    R.keys
  )(data.requisitos)

export const requisitosSatisfeitosRamoConhecimento = ({requisitos, niveis}) => ramo =>
  R.compose(
    limites1,
    pc => pc / R.keys(requisitos[ramo]).length,
    R.reduce((pc, nivel) =>
      pc + niveis[ramo][nivel] / requisitos[ramo][nivel], 0),
    R.keys
  )(requisitos[ramo])

export const calcularPercentual = data => data

export const definirConquista =
  ({pcEspecialidades, pcRamosConhecimento, requisitos}) =>
    pcEspecialidades * pcRamosConhecimento === 1 ?
    {type: 'REACHED', payload: requisitos.payload}
    : { type: 'NONE'}

//export const conquistaByEspecialidade =
//  R.pipe(
//    R.over(pcEspecialidades, calculaEspecialidadesPC),
//    R.over(pcRamosConhecimento, calculaRamosConhecimentoPC),
//    definirConquista
//  )
