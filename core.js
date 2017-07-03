const desenvolvimento = require('./lib/desenvolvimento.js').default
const requisito = require('./lib/requisito.js').default
const especialidade = require('./lib/especialidade.js').default
const verificacao = require('./lib/verificacao.js').default

const core = {
  desenvolvimento,
  requisito,
  especialidade,
  verificacao
}

exports.default = core
module.exports = core
