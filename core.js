const desenvolvimento = require('./lib/desenvolvimento')
const requisito = require('./lib/requisito.js').default
const especialidade = require('./lib/especialidade.js')
const verificacao = require('./lib/verificacao.js').default

const core = {
  desenvolvimento: desenvolvimento.desenvolvimento,
  desenvolvimentoEspecialidade: desenvolvimento.desenvolvimentoEspecialidade,
  percentual: desenvolvimento.percentual,
  divisoes: desenvolvimento.divisoes,
  requisito,
  verificacao,
  nivelEspecialidade: especialidade.nivelEspecialidade
}

exports.default = core
module.exports = core
