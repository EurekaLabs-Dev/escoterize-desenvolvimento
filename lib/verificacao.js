'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verificacaoEspecialidade = exports.verificacao = undefined;
exports.default = create;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var verificacao = exports.verificacao = function verificacao(target, payload) {
  return function (oldValue, newValue) {
    if (oldValue < target && newValue >= target) {
      return {
        type: 'REACHED',
        payload: payload
      };
    }

    if (oldValue === target && newValue < target) {
      return {
        type: 'LOST',
        payload: payload
      };
    }

    return {
      type: 'NONE'
    };
  };
};

var verificacoesDinamicas = function verificacoesDinamicas(options) {
  return _ramda2.default.keys(options).reduce(function (verificador, key) {
    return _ramda2.default.merge(verificador, _defineProperty({}, key, verificacao(options[key].payload)));
  }, {});
};

function create(options) {
  return {
    introdutorio: verificacao(options.introdutorio.payload),
    progressao: verificacoesDinamicas(options.progressao),
    insigniaEspecial: verificacoesDinamicas(options.insigniaEspecial)
  };
}

var verificacaoEspecialidade = exports.verificacaoEspecialidade = function verificacaoEspecialidade(oldValue, newValue) {
  return [verificacao(1 / 3, { segmento: 'ESPECIALIDADE', nivel: 1 })(oldValue, newValue), verificacao(2 / 3, { segmento: 'ESPECIALIDADE', nivel: 2 })(oldValue, newValue), verificacao(1, { segmento: 'ESPECIALIDADE', nivel: 3 })(oldValue, newValue)].filter(function (result) {
    return result.type !== 'NONE';
  })[0] || { type: 'NONE' };
};