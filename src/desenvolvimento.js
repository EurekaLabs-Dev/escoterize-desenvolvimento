import R from 'ramda'
import { MarkStatus } from './enums/mark'
import {roundTo4, limiteZero, limites} from './utils'
import DESENVOLVIMENTO from './enums/desenvolvimento'
import segmentoCategoria from './conexoes/segmentoCategoria'
import CATEGORIA from './enums/categorias'

const {MARKED, UNMARKED} = MarkStatus;

const reduceQuantidade = (qtd, marcacao) =>
  MarkStatus.isMarked(marcacao) ? qtd + 1: qtd - 1

export const quantidadeMarcadas = (quantidadeAtual, marcacoes) =>
  R.compose(
    limiteZero,
    R.reduce(reduceQuantidade, quantidadeAtual)
  )(marcacoes)

export function percentual(quantidadeMarcacoes, quantidadeAtividades) {
  return R.compose(
    limites,
    roundTo4,
    x => x * 100
  )(quantidadeMarcacoes / quantidadeAtividades)
}

export function divisoes(quantidadeMarcacoes, quantidadeAtividades, divisoes) {
  const pc = percentual(quantidadeMarcacoes, quantidadeAtividades)
  return R.range(1, divisoes + 1)
    .reduce(
      (acc, divisao) =>
      R.merge(acc, {[divisao]: calcularDivisao(pc, divisao, divisoes)}), {}
    )
}

const calcularDivisao = (percentual, divisao, divisoes) =>
  limites(percentual * divisoes - ((divisao - 1) * 100))

export const countBy  = (byValue, state, list) =>
  list ?
    R.compose(
      R.merge(state),
      R.map(marcacoes => quantidadeMarcadas(state[byValue(marcacoes[0])] || 0, marcacoes)),
      R.groupBy(byValue)
    )(list)
    : state

export const byMetadata = m => m.metadata
export const byEspecialidadeId = m => m.especialidadeId
export const byRamoConhecimento = m => m.metadata.ramoConhecimento

const countBySegmento = marcacoesSegmento => (state, segmento) => {
  const segmentoLens = R.lensProp(segmento)
  const getBySegmento = R.view(segmentoLens)
  return R.set(segmentoLens, quantidadeMarcadas(getBySegmento(state), getBySegmento(marcacoesSegmento)), state)
}

export function desenvolvimento(state, marcacoes) {
  const marcacoesSegmento = R.groupBy(m => m.segmento, marcacoes)

  return R.keys(DESENVOLVIMENTO)
    .filter(segmento => !!marcacoesSegmento[segmento])
    .reduce(countBySegmento(marcacoesSegmento), state)
}

export function desenvolvimentoEspecialidade(state, marcacoes) {
  return marcacoes.reduce((acc, {ramo, type, id, total}) => {
    const qtdAtualRamo = acc[ramo] || 0
    const qtdEspecialidadeAtual = (acc[id] || 0) + (type === MARKED ? 1 : -1)
    const ganhoRamo = calcularGanhoRamo(qtdEspecialidadeAtual, total, type)

    return R.merge(acc, {
      [id]: qtdEspecialidadeAtual,
      [ramo]: qtdAtualRamo + ganhoRamo
    })
  }, state)
}


export function calcularGanhoRamo(quantidadeEspecialidade, totalEspecialidade, type) {
  if (quantidadeEspecialidade / totalEspecialidade === 1/3 && type === MARKED) {
    return 1
  }
  if ((quantidadeEspecialidade + 1) / totalEspecialidade === 1/3 && type === UNMARKED) {
    return -1
  }
  return 0
}
