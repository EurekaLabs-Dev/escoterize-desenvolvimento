import R from 'ramda'
import requisitos from '../config/requisitos'
import {percentualCordao, percentualRamos, calcularPercentualDistribuicao} from './requisito'
import {roundTo2, limites1} from './utils'

export const higher = R.pipe(
  R.sort(R.descend(R.identity)),
  R.take(1),
  R.head
)

export const calcularComPesos = (values, pesos) =>
  R.compose(
    roundTo2,
    R.reduce(R.add, 0),
    R.map(([peso, pc]) => peso * pc),
    R.zip(pesos)
  )(values)

export const insigniaEspecialSenior = desenvolvimento =>
  higher([
    desenvolvimento.IMMA_SENIOR || 0,
    desenvolvimento.CONE_SUL_SENIOR || 0,
    desenvolvimento.APRENDER_SENIOR || 0,
    desenvolvimento.LUSOFONIA_SENIOR || 0,
    desenvolvimento.DESAFIO_COMUNITARIO || 0,
  ])

export const insigniaEspecialLobinho = desenvolvimento =>
  higher([
    desenvolvimento.IMMA_LOBINHO || 0,
    desenvolvimento.CONE_SUL_LOBINHO || 0,
    desenvolvimento.APRENDER_LOBINHO || 0,
    desenvolvimento.LUSOFONIA_LOBINHO || 0,
    desenvolvimento.BOA_ACAO|| 0,
  ])

export const insigniaEspecialEscoteiro = desenvolvimento =>
  higher([
    desenvolvimento.IMMA_ESCOTEIRO || 0,
    desenvolvimento.CONE_SUL_ESCOTEIRO || 0,
    desenvolvimento.APRENDER_ESCOTEIRO || 0,
    desenvolvimento.LUSOFONIA_ESCOTEIRO || 0,
    desenvolvimento.ACAO_COMUNITARIA|| 0,
  ])

export const calcularSenior = (desenvolvimento, pcModalidade) => {
  const values = [
    desenvolvimento.segmento.PROGRESSAO_SENIOR || 0,
    insigniaEspecialSenior(desenvolvimento.segmento),
    percentualCordao(requisitos.dourado, desenvolvimento.especialidade),
    pcModalidade
  ]

  const pesos = [
    1.5/4,
    0.5/4,
    1 / 4,
    1 / 4
  ]
  return calcularComPesos(values, pesos)
}

export const calcularLobinho = desenvolvimento => {
  const requisitoEspecialidades = {nivelMinimo: 1, quantidadeMinima: 5}
  const values = [
    desenvolvimento.segmento.PROGRESSAO_PATATENRA_SALTADOR || 0,
    desenvolvimento.segmento.PROGRESSAO_RASTREADOR_CACADOR || 0,
    insigniaEspecialLobinho(desenvolvimento.segmento),
    percentualRamos(requisitoEspecialidades, desenvolvimento.especialidade),
    calcularPercentualDistribuicao(desenvolvimento.especialidade, 3)
  ]

  const pesos =  [
    0.7/4,
    0.7/4,
    1/4/2,
    1/4/2,
    0.6/4
  ]

  return calcularComPesos(values, pesos)
}

export const calcularEscoteiro = (desenvolvimento, pcModalidade) => {
  const requisitoEspecialidades = {nivelMinimo: 1, quantidadeMinima: 5}
  const values = [
    desenvolvimento.segmento.PROGRESSAO_PISTA_TRILHA || 0,
    desenvolvimento.segmento.PROGRESSAO_RUMO_TRAVESSIA || 0,
    insigniaEspecialEscoteiro(desenvolvimento.segmento),
    percentualCordao(requisitos.vermelhoBranco, desenvolvimento.especialidade),
    pcModalidade
  ]

  const pesos =  [
    0.8/4,
    0.8/4,
    0.4/4,
    1 / 4,
    1 / 4
  ]

  return calcularComPesos(values, pesos)
}
