import R from 'ramda'
import { MarkStatus } from './enums/mark'
import {roundTo4, limiteZero, limites} from './utils'
import desenvolvimentoEnums from './enums/desenvolvimento'

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
      R.merge(acc, {[divisao]: calcularDivisao(pc, divisao, divisoes)}),
      {}
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

const isEspecialidade = segmento => [
    desenvolvimentoEnums.HABILIDADES_ESCOTEIRAS,
    desenvolvimentoEnums.SERVICOS,
    desenvolvimentoEnums.DESPORTOS,
    desenvolvimentoEnums.CULTURA,
    desenvolvimentoEnums.CIENCIA_TECNOLOGIA
  ].includes(segmento)

const countBySegmento = marcacoesSegmento => (state, segmento) => {
  if (isEspecialidade(segmento)) {
    const especialidadeState = countBy(byEspecialidadeId, state.especialidade || {}, marcacoesSegmento[segmento])
    return R.set(R.lensProp('especialidade'), especialidadeState, state)
  }
  const segmentoLens = R.lensProp(segmento)
  const getBySegmento = R.view(segmentoLens)
  return R.set(segmentoLens, quantidadeMarcadas(getBySegmento(state), getBySegmento(marcacoesSegmento)), state)
}

export default function desenvolvimento(state, marcacoes) {
  const marcacoesSegmento = R.groupBy(m => m.segmento, marcacoes)

  return R.keys(desenvolvimentoEnums)
    .filter(segmento => !!marcacoesSegmento[segmento])
    .reduce(countBySegmento(marcacoesSegmento), state)
}

