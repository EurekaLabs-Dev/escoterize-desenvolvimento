'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createDSL;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _desenvolvimento = require('./desenvolvimento');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var calcularPercentual = function calcularPercentual(qtdAtividades) {
  return function (qtdMarcacoes, marcacoes) {
    return qtdMarcacoes === qtdAtividades ? 100 : (0, _desenvolvimento.percentual)((0, _desenvolvimento.quantidadeMarcadas)(qtdMarcacoes, marcacoes), qtdAtividades);
  };
};

function simplePercentual(segmento) {
  return Object.keys(segmento).reduce(function (dsl, key) {
    return _ramda2.default.merge(dsl, _defineProperty({}, key, calcularPercentual(segmento[key])));
  }, {});
}

function createDSL(config) {
  return Object.keys(config).reduce(function (dsl, key) {
    return _ramda2.default.merge(dsl, _defineProperty({}, key, simplePercentual(config[key])));
  }, {});
}