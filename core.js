const desenvolvimento = require('./lib/desenvolvimento')
const requisito = require('./lib/requisito.js')
const especialidade = require('./lib/especialidade.js')
const verificacao = require('./lib/verificacao.js').default
const grauMaximo = require('./lib/grauMaximo')

const core = {
  desenvolvimento: desenvolvimento.desenvolvimento,
  desenvolvimentoEspecialidade: desenvolvimento.desenvolvimentoEspecialidade,
  percentual: desenvolvimento.percentual,
  divisoes: desenvolvimento.divisoes,
  percentualCordao: requisito.percentualCordao,
  percentualRamos: requisito.percentualRamos,
  percentualEspecialidades: requisito.percentualEspecialidades,
  verificacao,
  nivelEspecialidade: especialidade.nivelEspecialidade,
  calcularLobinho: grauMaximo.calcularLobinho,
  calcularEscoteiro: grauMaximo.calcularEscoteiro,
  calcularSenior: grauMaximo.calcularSenior
}

exports.default = core
module.exports = core
