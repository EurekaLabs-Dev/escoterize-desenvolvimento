import R from 'ramda'
import { MarkStatus } from './enums'

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
