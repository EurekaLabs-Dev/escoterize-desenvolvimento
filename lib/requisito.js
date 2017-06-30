'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcularPercentual = exports.calcularPercentualDistribuicao = exports.calcularPercentualRamos = exports.sumRequisitosSatisfeitos = exports.requisitoSatisfeitoRamoConhecimento = exports.requisitoSatisfeitoEspecialidade = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _especialidade = require('./especialidade');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateRamoConhecimento = function validateRamoConhecimento(ramo) {
  var invalid = !['servico', 'cultura', 'habilidadesEscoteiras', 'desportos', 'cienciaTecnologia'].includes(ramo);
  if (invalid) {
    throw Error('Ramo inválido. ' + ramo);
  }
  return ramo;
};

var requisitoSatisfeitoEspecialidade = exports.requisitoSatisfeitoEspecialidade = function requisitoSatisfeitoEspecialidade(_ref) {
  var percentuais = _ref.percentuais,
      requisito = _ref.requisito;
  return function (id) {
    return _ramda2.default.compose(_utils.limites1, function (nivel) {
      return nivel / requisito[id];
    }, _especialidade.nivelEspecialidadeFromPC)(percentuais[id]);
  };
};

var requisitoSatisfeitoRamoConhecimento = exports.requisitoSatisfeitoRamoConhecimento = function requisitoSatisfeitoRamoConhecimento(_ref2) {
  var requisito = _ref2.requisito,
      niveis = _ref2.niveis;
  return function (ramo) {
    return _ramda2.default.compose(_utils.limites1, function (pc) {
      return pc / _ramda2.default.keys(requisito[ramo]).length;
    }, _ramda2.default.reduce(function (pc, nivel) {
      return pc + niveis[ramo][nivel] / requisito[ramo][nivel];
    }, 0), _ramda2.default.keys)(requisito[ramo]);
  };
};

var sumRequisitosSatisfeitos = exports.sumRequisitosSatisfeitos = function sumRequisitosSatisfeitos(data, requisitoSatisfeito) {
  return _ramda2.default.compose(function (percentuais) {
    return _ramda2.default.reduce(_ramda2.default.add, 0, percentuais) / percentuais.length;
  }, _ramda2.default.map(requisitoSatisfeito(data)), _ramda2.default.keys)(data.requisito);
};

var sumPropsValues = function sumPropsValues(obj) {
  return _ramda2.default.compose(_ramda2.default.reduce(function (_ref3) {
    var acc = _ref3.acc,
        key = _ref3.key;
    return acc + obj[key];
  }), _ramda2.default.keys)(obj);
};

var reduceNiveisRamo = function reduceNiveisRamo(nivelMinimo) {
  return function (acc, ramo) {
    return acc + sumNiveisRamoConhecimento(ramo, nivelMinimo);
  };
};

var sumNiveisRamoConhecimento = function sumNiveisRamoConhecimento(ramo, nivelMinimo) {
  return _ramda2.default.compose(_ramda2.default.reduce(_ramda2.default.add, 0), _ramda2.default.map(function (nivel) {
    return ramo[nivel];
  }), _ramda2.default.filter(function (nivel) {
    return nivel >= nivelMinimo;
  }), _ramda2.default.keys)(ramo);
};

var calcularPercentualRamos = exports.calcularPercentualRamos = function calcularPercentualRamos(_ref4) {
  var requisito = _ref4.requisito,
      ramosConhecimento = _ref4.ramosConhecimento;
  return _ramda2.default.compose(_utils.limites1, _utils.roundTo2, function (x) {
    return x / requisito.quantidadeMinima;
  }, _ramda2.default.reduce(reduceNiveisRamo(requisito.nivelMinimo), 0), _ramda2.default.map(_ramda2.default.compose(function (key) {
    return ramosConhecimento[key];
  }, validateRamoConhecimento)), _ramda2.default.keys)(ramosConhecimento);
};

var calcularPercentualDistribuicao = exports.calcularPercentualDistribuicao = function calcularPercentualDistribuicao(_ref5) {
  var requisito = _ref5.requisito,
      ramosConhecimento = _ref5.ramosConhecimento;
  return _ramda2.default.compose(_utils.limites1, _utils.roundTo2, function (x) {
    return x / 5;
  }, _ramda2.default.reduce(_ramda2.default.add, 0), _ramda2.default.map(function (key) {
    return sumNiveisRamoConhecimento(ramosConhecimento[key], requisito.nivelMinimo) > 0 ? 1 : 0;
  }), _ramda2.default.keys)(ramosConhecimento);
};

var pesos = {
  quantidadeEspecialidadeRamos: 9 / 10,
  especialidadesDistribuidas: 1 / 10,
  especialidadesRequeridas: 1 / 2,
  ramosRequeridos: 1 / 2
};

var calcularPercentual = exports.calcularPercentual = function calcularPercentual(data) {
  var pcQuantidadeEspecialidadeRamos = calcularPercentualRamos(data);
  var pcEspecialidadesDistribuidas = calcularPercentualDistribuicao(data);
  var pcEspecialidadesRequeridas = sumRequisitosSatisfeitos({
    requisito: data.requisito.especialidades,
    percentuais: data.percentuais
  }, requisitoSatisfeitoEspecialidade);
  var pcRamosRequeridos = sumRequisitosSatisfeitos({
    requisito: data.requisito.ramosConhecimento,
    niveis: data.ramosConhecimento
  }, requisitoSatisfeitoRamoConhecimento);

  var result = (pcQuantidadeEspecialidadeRamos * pesos.quantidadeEspecialidadeRamos + pcEspecialidadesDistribuidas * pesos.especialidadesDistribuidas) * 0.9 + (pcEspecialidadesRequeridas * pesos.especialidadesRequeridas + pcRamosRequeridos * pesos.ramosRequeridos) * 0.1;

  return (0, _utils.roundTo2)(result);
};