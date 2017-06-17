import R from 'ramda'
import {percentual, quantidadeMarcadas} from './desenvolvimento'

const calcularPercentual = qtdAtividades =>
  (qtdMarcacoes, marcacoes) =>
    qtdMarcacoes === qtdAtividades ?
      100 :
      percentual(quantidadeMarcadas(qtdMarcacoes, marcacoes), qtdAtividades)


function simplePercentual(segmento) {
  return Object.keys(segmento)
    .reduce((dsl, key) =>
      R.merge(dsl, {
        [key]: calcularPercentual(segmento[key])
      }) , {})

}

export default function createDSL(config) {
  return Object.keys(config)
    .reduce(
      (dsl, key) => R.merge(dsl, {[key]: simplePercentual(config[key])}),
      {}
    )
}
