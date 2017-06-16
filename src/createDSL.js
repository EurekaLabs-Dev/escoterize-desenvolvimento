import R from 'ramda'
import {percentualMarcacoes} from './desenvolvimento'

const calcularPercentual = qtdAtividades =>
  (qtdMarcadas, totalAtual, marcacoes) => 
        qtdMarcadas === qtdAtividades ?
        100 :
        percentualMarcacoes(totalAtual, marcacoes, qtdAtividades)

function createIntrodutorio({introdutorio}) {
  return Object.keys(introdutorio)
    .reduce((dsl, key) => 
      R.merge(dsl, {
        [key]: calcularPercentual(introdutorio[key])
      })
    , {})

}

export default function createDSL(config) {

    return {
      introdutorio: createIntrodutorio(config)
    }
}
