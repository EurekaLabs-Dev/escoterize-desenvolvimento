import R from 'ramda'
import { MarkStatus } from './enums'

const {MARKED, UNMARKED} = MarkStatus;
const limites = x => x > 100 ? 100 : x < 0 ? 0 : x
const roundTo4 = x => Math.floor(x * 10000) / 10000

export const quantidadeMarcadas = (sum, marcacao) =>
  MarkStatus.isMarked(marcacao) ? sum + 1: sum - 1

export function percentualMarcacoes(totalAtual, marcacoes, totalMarcacoes) {
  return R.compose(
    limites,
    x => totalAtual + x,
    roundTo4,
    qtd => (qtd / totalMarcacoes) * 100,
    R.reduce(quantidadeMarcadas, 0)
  )(marcacoes)
}

