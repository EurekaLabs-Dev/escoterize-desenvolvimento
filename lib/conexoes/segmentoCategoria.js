'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _conexoes;

var _desenvolvimento = require('../enums/desenvolvimento');

var _desenvolvimento2 = _interopRequireDefault(_desenvolvimento);

var _categorias = require('../enums/categorias');

var _categorias2 = _interopRequireDefault(_categorias);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var conexoes = (_conexoes = {}, _defineProperty(_conexoes, _desenvolvimento2.default.ESPECIALIDADE, _categorias2.default.ESPECIALIDADE), _defineProperty(_conexoes, _desenvolvimento2.default.CULTURA, _categorias2.default.ESPECIALIDADE), _defineProperty(_conexoes, _desenvolvimento2.default.SERVICOS, _categorias2.default.ESPECIALIDADE), _defineProperty(_conexoes, _desenvolvimento2.default.CIENCIA_TECNOLOGIA, _categorias2.default.ESPECIALIDADE), _defineProperty(_conexoes, _desenvolvimento2.default.HABILIDADES_ESCOTEIRAS, _categorias2.default.ESPECIALIDADE), _defineProperty(_conexoes, _desenvolvimento2.default.DESPORTO, _categorias2.default.ESPECIALIDADE), _defineProperty(_conexoes, _desenvolvimento2.default.PROMESSA_ESCOTEIRA_LOBINHO, _categorias2.default.PROGRESSAO), _defineProperty(_conexoes, _desenvolvimento2.default.PROGRESSAO_LIBINHO, _categorias2.default.PROGRESSAO), _defineProperty(_conexoes, _desenvolvimento2.default.PROMESSA_ESCOTEIRA_SENIOR, _categorias2.default.PROGRESSAO), _defineProperty(_conexoes, _desenvolvimento2.default.PROGRESSAO_SENIOR, _categorias2.default.PROGRESSAO), _defineProperty(_conexoes, _desenvolvimento2.default.PROMESSA_ESCOTEIRA_PIONEIRO, _categorias2.default.PROGRESSAO), _defineProperty(_conexoes, _desenvolvimento2.default.PROGRESSAO_PIONEIRO, _categorias2.default.PROGRESSAO), _defineProperty(_conexoes, _desenvolvimento2.default.IMMA_SENIOR, _categorias2.default.INSIGNIA_ESPECIAL), _defineProperty(_conexoes, _desenvolvimento2.default.CONE_SUL_SENIOR, _categorias2.default.INSIGNIA_ESPECIAL), _defineProperty(_conexoes, _desenvolvimento2.default.LUSOFONIA_SENIOR, _categorias2.default.INSIGNIA_ESPECIAL), _defineProperty(_conexoes, _desenvolvimento2.default.DESAFIO_COMUNITARIO, _categorias2.default.INSIGNIA_ESPECIAL), _defineProperty(_conexoes, _desenvolvimento2.default.APRENDER_SENIOR, _categorias2.default.INSIGNIA_ESPECIAL), _conexoes);

exports.default = function (key) {
  return conexoes[key];
};