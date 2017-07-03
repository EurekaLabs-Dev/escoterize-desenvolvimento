'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Segmentos = exports.Segmentos = {
  INTRODUTORIO: 'INTRODUTORIO',
  PROGRESSAO: 'PROGRESSAO',
  INSIGNIA_ESPECIAL: 'INSIGNIA_ESPECIAL',
  CORDAO: 'CORDAO',
  INSIGNIA_MODALIDADE: 'INSIGNIA_MODALIDADE',
  GRAU_MAXIMO: 'GRAU_MAXIMO',
  ESPECIALIDADE: 'ESPECIALIDADE'
};

var MarkStatus = exports.MarkStatus = {
  MARKED: 'MARKED',
  UNMARKED: 'UNMARKED',
  isMarked: function isMarked(m) {
    return m.type === 'MARKED';
  }
};