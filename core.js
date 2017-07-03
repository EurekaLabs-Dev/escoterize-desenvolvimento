const desenvolvimento = require('./lib/desenvolvimento.js')
const requisito = require('./lib/requisito.js')
const especialidade = require('./lib/especialidade.js')
const verificacao = require('./lib/verificacao.js')

const core = {
  desenvolvimento,
  requisito,
  especialidade,
  verificacao
}

exports.default = core
module.exports = core
