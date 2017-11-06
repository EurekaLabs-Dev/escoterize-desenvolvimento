'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcularEscoteiro = exports.calcularLobinho = exports.calcularSenior = exports.insigniaEspecialEscoteiro = exports.insigniaEspecialLobinho = exports.insigniaEspecialSenior = exports.calcularComPesos = exports.higher = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _requisitos = require('../config/requisitos');

var _requisitos2 = _interopRequireDefault(_requisitos);

var _requisito = require('./requisito');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var higher = exports.higher = _ramda2.default.pipe(_ramda2.default.sort(_ramda2.default.descend(_ramda2.default.identity)), _ramda2.default.take(1), _ramda2.default.head);

var calcularComPesos = exports.calcularComPesos = function calcularComPesos(values, pesos) {
  return _ramda2.default.compose(_utils.roundTo2, _ramda2.default.reduce(_ramda2.default.add, 0), _ramda2.default.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        peso = _ref2[0],
        pc = _ref2[1];

    return peso * pc;
  }), _ramda2.default.zip(pesos))(values);
};

var insigniaEspecialSenior = exports.insigniaEspecialSenior = function insigniaEspecialSenior(desenvolvimento) {
  return higher([desenvolvimento.IMMA_SENIOR || 0, desenvolvimento.CONE_SUL_SENIOR || 0, desenvolvimento.APRENDER_SENIOR || 0, desenvolvimento.LUSOFONIA_SENIOR || 0, desenvolvimento.DESAFIO_COMUNITARIO || 0]);
};

var insigniaEspecialLobinho = exports.insigniaEspecialLobinho = function insigniaEspecialLobinho(desenvolvimento) {
  return higher([desenvolvimento.IMMA_LOBINHO || 0, desenvolvimento.CONE_SUL_LOBINHO || 0, desenvolvimento.APRENDER_LOBINHO || 0, desenvolvimento.LUSOFONIA_LOBINHO || 0, desenvolvimento.BOA_ACAO || 0]);
};

var insigniaEspecialEscoteiro = exports.insigniaEspecialEscoteiro = function insigniaEspecialEscoteiro(desenvolvimento) {
  return higher([desenvolvimento.IMMA_ESCOTEIRO || 0, desenvolvimento.CONE_SUL_ESCOTEIRO || 0, desenvolvimento.APRENDER_ESCOTEIRO || 0, desenvolvimento.LUSOFONIA_ESCOTEIRO || 0, desenvolvimento.ACAO_COMUNITARIA || 0]);
};

var calcularSenior = exports.calcularSenior = function calcularSenior(desenvolvimento, pcModalidade) {
  var values = [desenvolvimento.segmento.PROGRESSAO_SENIOR || 0, insigniaEspecialSenior(desenvolvimento.segmento), (0, _requisito.percentualCordao)(_requisitos2.default.dourado, desenvolvimento.especialidade), pcModalidade];

  var pesos = [1.5 / 4, 0.5 / 4, 1 / 4, 1 / 4];
  return calcularComPesos(values, pesos);
};

var calcularLobinho = exports.calcularLobinho = function calcularLobinho(desenvolvimento) {
  var requisitoEspecialidades = { nivelMinimo: 1, quantidadeMinima: 5 };
  var values = [desenvolvimento.segmento.PROGRESSAO_PATATENRA_SALTADOR || 0, desenvolvimento.segmento.PROGRESSAO_RASTREADOR_CACADOR || 0, insigniaEspecialLobinho(desenvolvimento.segmento), (0, _requisito.percentualRamos)(requisitoEspecialidades, desenvolvimento.especialidade), (0, _requisito.calcularPercentualDistribuicao)(desenvolvimento.especialidade, 3)];

  var pesos = [1 / 4, 1 / 4, 1 / 4 / 2, 1 / 4 / 2, 1 / 4];

  return calcularComPesos(values, pesos);
};

var calcularEscoteiro = exports.calcularEscoteiro = function calcularEscoteiro(desenvolvimento, pcModalidade) {
  var requisitoEspecialidades = { nivelMinimo: 1, quantidadeMinima: 5 };
  var values = [desenvolvimento.segmento.PROGRESSAO_PISTA_TRILHA || 0, desenvolvimento.segmento.PROGRESSAO_RUMO_TRAVESSIA || 0, insigniaEspecialEscoteiro(desenvolvimento.segmento), (0, _requisito.percentualCordao)(_requisitos2.default.vermelhoBranco, desenvolvimento.especialidade), pcModalidade];

  var pesos = [0.8 / 4, 0.8 / 4, 0.4 / 4, 1 / 4, 1 / 4];

  return calcularComPesos(values, pesos);
};