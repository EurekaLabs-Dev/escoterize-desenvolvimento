'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.marcacaoTableResolver = exports.tableFieldResolver = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tableFieldResolver = exports.tableFieldResolver = function tableFieldResolver(config) {
  return function (input) {
    var tableField = config[input];
    if (tableField) return tableField;
    throw new Error('Tabela e campo não definido para ' + input.type);
  };
};

var marcacaoTableResolver = exports.marcacaoTableResolver = function marcacaoTableResolver(input) {};