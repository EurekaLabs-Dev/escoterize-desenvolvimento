'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.percentualCordao = exports.calcularPercentualDistribuicao = exports.percentualRamos = exports.percentualEspecialidades = exports.percentualRequisitoEspecialidade = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _especialidade = require('./especialidade');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var percentualRequisitoEspecialidade = exports.percentualRequisitoEspecialidade = function percentualRequisitoEspecialidade(percentual, nivelRequirido) {
  return (0, _utils.limites1)((0, _especialidade.nivelEspecialidadeFromPC)(percentual) / nivelRequirido);
};

var percentualEspecialidades = exports.percentualEspecialidades = function percentualEspecialidades(requisito) {
  var desenvolvimento = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _ramda2.default.compose(_utils.roundTo2, _utils.limites1, function (total) {
    return total / requisito.quantidadeMinima;
  }, _ramda2.default.reduce(_ramda2.default.add, 0), _ramda2.default.take(requisito.quantidadeMinima), _ramda2.default.sort(function (a, b) {
    return b - a;
  }), _ramda2.default.map(function (id) {
    return percentualRequisitoEspecialidade(desenvolvimento[id], requisito.nivelMinimo);
  }), _ramda2.default.keys)(desenvolvimento);
};

var getQuantidadesAcimaNivelMinimo = function getQuantidadesAcimaNivelMinimo(requisito, desenvolvimento) {
  return _ramda2.default.pipe(function (key) {
    return desenvolvimento[key];
  }, function (values) {
    return _ramda2.default.range(requisito.nivelMinimo, 4).map(function (nivel) {
      return values['n' + nivel] || 0;
    });
  });
};

var percentualRamos = exports.percentualRamos = function percentualRamos(requisito) {
  var desenvolvimento = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _ramda2.default.compose(_utils.limites1, _utils.roundTo2, function (x) {
    return x / requisito.quantidadeMinima;
  }, _ramda2.default.reduce(_ramda2.default.add, 0), _ramda2.default.flatten, _ramda2.default.map(getQuantidadesAcimaNivelMinimo(requisito, desenvolvimento)), _ramda2.default.keys)(desenvolvimento);
};

var calcularPercentualDistribuicao = exports.calcularPercentualDistribuicao = function calcularPercentualDistribuicao() {
  var desenvolvimento = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var quantidadeRamos = arguments[1];
  return _ramda2.default.compose(_utils.limites1, _utils.roundTo2, function (x) {
    return x / quantidadeRamos;
  }, _ramda2.default.reduce(_ramda2.default.add, 0), _ramda2.default.map(function (key) {
    return desenvolvimento[key].total > 0 ? 1 : 0;
  }), _ramda2.default.keys)(desenvolvimento);
};

var pesos = {
  quantidadeEspecialidadeRamos: 9 / 10,
  especialidadesDistribuidas: 1 / 10,
  especialidadesRequeridas: 1 / 2,
  ramosRequeridos: 1 / 2
};

var percentuaisEspecialidadesEspecificas = function percentuaisEspecialidadesEspecificas(requisito) {
  var desenvolvimento = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var desenvolvimentoEspecifico = requisito.especialidades.reduce(function (acc, id) {
    acc[id] = desenvolvimento[id] || 0;
    return acc;
  }, {});
  var pc = percentualEspecialidades({
    nivelMinimo: requisito.nivelMinimo,
    quantidadeMinima: requisito.quantidadeMinima
  }, desenvolvimentoEspecifico);
  return (0, _utils.limites1)(pc);
};

var percentualServicos = function percentualServicos(_ref) {
  var nivelMinimo = _ref.nivelMinimo;
  var desenvolvimento = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref2 = desenvolvimento.SERVICOS || {},
      _ref2$n = _ref2.n2,
      n2 = _ref2$n === undefined ? 0 : _ref2$n,
      _ref2$n2 = _ref2.n3,
      n3 = _ref2$n2 === undefined ? 0 : _ref2$n2;

  return nivelMinimo === 3 ? (0, _utils.limites1)(n3 / 3) : (0, _utils.limites1)((n2 + n3) / 3);
};

var percentualCordao = exports.percentualCordao = function percentualCordao(requisito, desenvolvimento) {
  var validaServicos = requisito.validaServicos;

  var totalEspecialidadesPeso = requisito.quantidadeMinima + 3 + 2;
  var percentuais = [percentualRamos(_ramda2.default.merge(requisito, { nivelMinimo: 1 }), desenvolvimento), calcularPercentualDistribuicao(desenvolvimento, 5)];
  var pesos = [0.6 * requisito.quantidadeMinima, 0.4 * requisito.quantidadeMinima];
  var totalPesos = requisito.quantidadeMinima;
  if (validaServicos) {
    percentuais.push(percentualServicos(requisito, desenvolvimento));
    pesos.push(3);
    totalPesos += 3;
  }
  if (requisito.especialidades) {
    percentuais.push(percentuaisEspecialidadesEspecificas(_ramda2.default.merge(requisito, { quantidadeMinima: 1 }), desenvolvimento));
    pesos.push(2);
    totalPesos += 2;
  }

  return _ramda2.default.compose(_utils.roundTo2, _ramda2.default.reduce(_ramda2.default.add, 0), _ramda2.default.map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        peso = _ref4[0],
        pc = _ref4[1];

    return peso / totalPesos * pc;
  }))(_ramda2.default.zip(pesos, percentuais));
};