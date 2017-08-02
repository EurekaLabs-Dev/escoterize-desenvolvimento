import R from 'ramda'
import { MarkStatus } from './enums/mark'
import {roundTo4, limiteZero, limites} from './utils'
import DESENVOLVIMENTO from './enums/desenvolvimento'
import segmentoCategoria from './conexoes/segmentoCategoria'
import CATEGORIA from './enums/categorias'
import {nivelEspecialidade} from './especialidade'

const {MARKED, UNMARKED} = MarkStatus;

const reduceQuantidade = (qtd, marcacao) =>
  MarkStatus.isMarked(marcacao) ? qtd + 1: qtd - 1

export const quantidadeMarcadas = (quantidadeAtual = 0, marcacoes) =>
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
    .reduce( (acc, divisao) => {
        acc[divisao] = calcularDivisao(pc, divisao, divisoes)
        return acc
      }, {})
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

const countBySegmento = (marcacoesSegmento, quantidadesEspecialidades) => (state, segmento) => {
  if (segmentoCategoria(segmento) === CATEGORIA.ESPECIALIDADE) {
    return R.over(
      R.lensProp('especialidade'),
      state => desenvolvimentoEspecialidade(state, quantidadesEspecialidades, marcacoesSegmento[segmento]),
      state
    )
  }
  const segmentoLens = R.lensProp(segmento)
  const getBySegmento = R.view(segmentoLens)
  return R.set(segmentoLens, quantidadeMarcadas(getBySegmento(state), getBySegmento(marcacoesSegmento)), state)
}

export function desenvolvimento(state, quantidadesEspecialidades, marcacoes) {
  const marcacoesSegmento = R.groupBy(m => m.segmento, marcacoes)

  return R.keys(DESENVOLVIMENTO)
    .filter(segmento => !!marcacoesSegmento[segmento])
    .reduce(countBySegmento(marcacoesSegmento, quantidadesEspecialidades), state)
}

export function desenvolvimentoEspecialidade(state, quantidadesEspecialidades, marcacoes) {
  return marcacoes.reduce((acc, {segmento, type, id}) => {
    const total = quantidadesEspecialidades[id]
    const qtdAtualRamo = R.pathOr(0, [segmento, 'total'], acc)
    const ganhoEspecialidade = type === MARKED ? 1 : -1
    const qtdEspecialidadeAtual = (acc[id] || 0) + ganhoEspecialidade
    const ganhoRamo = calcularGanhoRamo(qtdEspecialidadeAtual, total, type)
    const nivelAtual = nivelEspecialidade(qtdEspecialidadeAtual, total)
    const nivelAnterior = nivelEspecialidade(qtdEspecialidadeAtual - ganhoEspecialidade, total)
    const mudouNivel = nivelAtual !== nivelAnterior

    const setNiveisDefault = R.over(
      R.lensProp(segmento),
      (ramo) => R.merge(ramo, ({n1: ramo.n1 || 0, n2: ramo.n2 || 0, n3: ramo.n3 || 0}))
    )
    const setNivelAtual = R.over(
      R.lensPath([segmento, 'n'+nivelAtual]),
      (x = 0) => mudouNivel ? x + 1 : x
    )
    const setNivelAnterior = R.over(
      R.lensPath([segmento, 'n'+nivelAnterior]),
      x => mudouNivel ? x - 1 : x
    )
    const setTotalSegmento = R.set(
      R.lensPath([segmento, 'total']),
      qtdAtualRamo + ganhoRamo
    )
    const setQtdEspecialidade = R.set(R.lensProp(id), qtdEspecialidadeAtual)

    return R.compose(
      nivelAtual > 0 ? setNivelAtual : R.identity,
      nivelAnterior > 0 ? setNivelAnterior : R.identity,
      setNiveisDefault,
      setTotalSegmento,
      setQtdEspecialidade
    )(acc)
  }, state || {})
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
