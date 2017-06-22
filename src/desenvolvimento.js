import R from 'ramda'
import { MarkStatus, Segmentos } from './enums'
import {roundTo4, limiteZero, limites} from './utils'

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
      R.map(marcacoes => quantidadeMarcadas(state[byValue(marcacoes[0])] || 0, marcacoes)),
      R.groupBy(byValue)
    )(list)
    : {}

export const byMetadata = m => m.metadata
export const byEspecialidadeId = m => m.metadata.especialidadeId
export const byRamoConhecimento = m => m.metadata.ramoConhecimento

export default function desenvolvimento(state, marcacoes) {
  const marcacoesSegmento = R.groupBy(m => m.segmento.toLocaleLowerCase(), marcacoes)
  return {
    introdutorio:
      quantidadeMarcadas(
        state.introdutorio,
        marcacoesSegmento.introdutorio || []
      ),
    progressao: countBy(byMetadata, state.progressao, marcacoesSegmento.progressao),
    insigniaEspecial: countBy(byMetadata, state.insigniaEspecial, marcacoesSegmento.insignia_especial),
    especialidade: countBy(byEspecialidadeId, state.especialidade, marcacoesSegmento.especialidade),
    ramoConhecimento: countBy(byRamoConhecimento, state.ramoConhecimento, marcacoesSegmento.especialidades)
  }
}
