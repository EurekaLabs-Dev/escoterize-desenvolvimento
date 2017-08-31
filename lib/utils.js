"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var limites = exports.limites = function limites(x) {
  return x > 100 ? 100 : limiteZero(x);
};
var limites1 = exports.limites1 = function limites1(x) {
  return x > 1 ? 1 : limiteZero(x);
};
var roundTo4 = exports.roundTo4 = function roundTo4(x) {
  return Math.floor(x * 10000) / 10000;
};
var roundTo2 = exports.roundTo2 = function roundTo2(x) {
  return Math.floor(x * 100) / 100;
};
var limiteZero = exports.limiteZero = function limiteZero(x) {
  return x < 0 ? 0 : x;
};