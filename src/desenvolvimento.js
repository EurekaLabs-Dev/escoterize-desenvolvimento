import R from 'ramda'
import { MarkStatus, Segmentos } from './enums'

const {MARKED, UNMARKED} = MarkStatus;
const limites = x => x > 100 ? 100 : limiteZero(x)
const roundTo4 = x => Math.floor(x * 10000) / 10000
const limiteZero = x => x < 0 ? 0 : x

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

const getQuantidadeAtualMetadata = (marcacoes) =>
  R.path([marcacoes[0].metadata])

const calcularQuantidadeMetadata = (state, marcacoes) =>
  quantidadeMarcadas(getQuantidadeAtualMetadata(marcacoes)(state), marcacoes)

export const reduceByMetadata  = (state, list) =>
  list ?
    R.compose(
      R.map(marcacoes => calcularQuantidadeMetadata(state, marcacoes)),
      R.groupBy(m => m.metadata)
    )(list)
    : {}

const calculateEspecialidadeMarcacao = state => marcacoes => {
  const {especialidadeId, ramoConhecimento} = marcacoes[0].metadata
  const currentCount = R.pathOr(0, [especialidadeId, 'count'], state)
  return {
    id: especialidadeId,
    count: quantidadeMarcadas(currentCount, marcacoes),
    ramoConhecimento
  }
}

export const reduceEspecialidade = (state, marcacoes) =>
  marcacoes ?
    R.compose(
      R.map(calculateEspecialidadeMarcacao(state)),
      R.groupBy(m => m.metadata.especialidadeId)
    )(marcacoes)
    :{}

export default function desenvolvimento(state, marcacoes) {
  const marcacoesSegmento = R.groupBy(m => m.segmento.toLocaleLowerCase(), marcacoes)
  return {
    introdutorio:
      quantidadeMarcadas(
        state.introdutorio,
        marcacoesSegmento.introdutorio || []
      ),
    progressao: reduceByMetadata(state.progressao, marcacoesSegmento.progressao),
    insigniaEspecial: reduceByMetadata(state.insigniaEspecial, marcacoesSegmento.insignia_especial),
    especialidade: reduceEspecialidade(state.especialidade, marcacoesSegmento.especialidade)
  }
}
