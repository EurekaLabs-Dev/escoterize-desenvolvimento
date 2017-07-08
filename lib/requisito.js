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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var percentualRequisitoEspecialidade = exports.percentualRequisitoEspecialidade = function percentualRequisitoEspecialidade(percentual, nivelRequirido) {
  return (0, _utils.limites1)((0, _especialidade.nivelEspecialidadeFromPC)(percentual) / nivelRequirido);
};

var percentualEspecialidades = exports.percentualEspecialidades = function percentualEspecialidades(requisito, desenvolvimento) {
  return _ramda2.default.compose(_utils.limites1, function (total) {
    return total / requisito.quantidade;
  }, _ramda2.default.reduce(_ramda2.default.add, 0), _ramda2.default.map(function (id) {
    return percentualRequisitoEspecialidade(desenvolvimento[id], requisito.nivelMinimo);
  }), _ramda2.default.keys)(desenvolvimento);
};

var percentualRamos = exports.percentualRamos = function percentualRamos(requisito, desenvolvimento) {
  return _ramda2.default.compose(_utils.limites1, _utils.roundTo2, function (x) {
    return x / requisito.quantidadeMinima;
  }, _ramda2.default.reduce(_ramda2.default.add, 0), _ramda2.default.flatten, _ramda2.default.map(_ramda2.default.compose(function (values) {
    return _ramda2.default.range(requisito.nivelMinimo, 4).map(function (nivel) {
      return values['n' + nivel] || 0;
    });
  }, function (key) {
    return desenvolvimento[key];
  })), _ramda2.default.keys)(desenvolvimento);
};

var calcularPercentualDistribuicao = exports.calcularPercentualDistribuicao = function calcularPercentualDistribuicao(requisito, desenvolvimento) {
  return _ramda2.default.compose(_utils.limites1, _utils.roundTo2, function (x) {
    return x / 5;
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

var percentuaisEspecialidadesEspecificas = function percentuaisEspecialidadesEspecificas(requisito, desenvolvimento) {
  var desenvolvimentoEspecifico = requisito.especialidades.reduce(function (acc, id) {
    return _ramda2.default.merge(acc, _defineProperty({}, id, desenvolvimento[id] || 0));
  }, {});
  var pc = percentualEspecialidades({
    nivelMinimo: requisito.nivelMinimo,
    quantidade: requisito.quantidadeMinima
  }, desenvolvimentoEspecifico);
  return (0, _utils.limites1)(pc);
};

var percentualServicos = function percentualServicos(_ref) {
  var _ref$SERVICOS = _ref.SERVICOS,
      _ref$SERVICOS$n = _ref$SERVICOS.n2,
      n2 = _ref$SERVICOS$n === undefined ? 0 : _ref$SERVICOS$n,
      _ref$SERVICOS$n2 = _ref$SERVICOS.n3,
      n3 = _ref$SERVICOS$n2 === undefined ? 0 : _ref$SERVICOS$n2;
  return (0, _utils.limites1)((n2 + n3) / 3);
};

var percentualCordao = exports.percentualCordao = function percentualCordao(requisito, desenvolvimento) {
  var validaServicos = requisito.validaServicos;

  var totalEspecialidadesPeso = requisito.quantidadeMinima + 3 + 2;
  var pesos = [0.9 * requisito.quantidadeMinima / totalEspecialidadesPeso, 0.1 * requisito.quantidadeMinima / totalEspecialidadesPeso, (validaServicos ? 3 : 0) / totalEspecialidadesPeso, (validaServicos ? 2 : 5) / totalEspecialidadesPeso];
  var percentuais = [percentualRamos(_ramda2.default.merge(requisito, { nivelMinimo: 1 }), desenvolvimento), calcularPercentualDistribuicao(requisito, desenvolvimento), percentualServicos(desenvolvimento), percentuaisEspecialidadesEspecificas(_ramda2.default.merge(requisito, { quantidadeMinima: 1 }), desenvolvimento)];

  return _ramda2.default.compose(_utils.roundTo2, _ramda2.default.reduce(_ramda2.default.add, 0), _ramda2.default.map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        peso = _ref3[0],
        pc = _ref3[1];

    return peso * pc;
  }))(_ramda2.default.zip(pesos, percentuais));
};