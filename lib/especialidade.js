"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var nivelEspecialidade = exports.nivelEspecialidade = function nivelEspecialidade(count, total) {
  return nivelEspecialidadeFromPC(count / total);
};

var nivelEspecialidadeFromPC = exports.nivelEspecialidadeFromPC = function nivelEspecialidadeFromPC(pc) {
  return Math.trunc(pc / (1 / 3));
};