'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _desenvolvimento = require('../enums/desenvolvimento');

var _desenvolvimento2 = _interopRequireDefault(_desenvolvimento);

var _categorias = require('../enums/categorias');

var _categorias2 = _interopRequireDefault(_categorias);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (key) {
  if (key.includes('PROGRESSAO') || key.includes('PROMESSA')) {
    return _categorias2.default.PROGRESSAO;
  }
  if (key.includes('LUSOFONIA') || key.includes('IMMA') || key.includes('CONE_SUL') || key.includes('COMUNITARI') || key.includes('APRENDER') || key.includes('BOA_')) {
    return _categorias2.default.INSIGNIA_ESPECIAL;
  }

  return _categorias2.default.ESPECIALIDADE;
};