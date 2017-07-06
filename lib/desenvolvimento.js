'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.byRamoConhecimento = exports.byEspecialidadeId = exports.byMetadata = exports.countBy = exports.quantidadeMarcadas = undefined;
exports.percentual = percentual;
exports.divisoes = divisoes;
exports.desenvolvimento = desenvolvimento;
exports.desenvolvimentoEspecialidade = desenvolvimentoEspecialidade;
exports.calcularGanhoRamo = calcularGanhoRamo;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _mark = require('./enums/mark');

var _utils = require('./utils');

var _desenvolvimento = require('./enums/desenvolvimento');

var _desenvolvimento2 = _interopRequireDefault(_desenvolvimento);

var _segmentoCategoria = require('./conexoes/segmentoCategoria');

var _segmentoCategoria2 = _interopRequireDefault(_segmentoCategoria);

var _categorias = require('./enums/categorias');

var _categorias2 = _interopRequireDefault(_categorias);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MARKED = _mark.MarkStatus.MARKED,
    UNMARKED = _mark.MarkStatus.UNMARKED;


var reduceQuantidade = function reduceQuantidade(qtd, marcacao) {
  return _mark.MarkStatus.isMarked(marcacao) ? qtd + 1 : qtd - 1;
};

var quantidadeMarcadas = exports.quantidadeMarcadas = function quantidadeMarcadas(quantidadeAtual, marcacoes) {
  return _ramda2.default.compose(_utils.limiteZero, _ramda2.default.reduce(reduceQuantidade, quantidadeAtual))(marcacoes);
};

function percentual(quantidadeMarcacoes, quantidadeAtividades) {
  return _ramda2.default.compose(_utils.limites, _utils.roundTo4, function (x) {
    return x * 100;
  })(quantidadeMarcacoes / quantidadeAtividades);
}

function divisoes(quantidadeMarcacoes, quantidadeAtividades, divisoes) {
  var pc = percentual(quantidadeMarcacoes, quantidadeAtividades);
  return _ramda2.default.range(1, divisoes + 1).reduce(function (acc, divisao) {
    return _ramda2.default.merge(acc, _defineProperty({}, divisao, calcularDivisao(pc, divisao, divisoes)));
  }, {});
}

var calcularDivisao = function calcularDivisao(percentual, divisao, divisoes) {
  return (0, _utils.limites)(percentual * divisoes - (divisao - 1) * 100);
};

var countBy = exports.countBy = function countBy(byValue, state, list) {
  return list ? _ramda2.default.compose(_ramda2.default.merge(state), _ramda2.default.map(function (marcacoes) {
    return quantidadeMarcadas(state[byValue(marcacoes[0])] || 0, marcacoes);
  }), _ramda2.default.groupBy(byValue))(list) : state;
};

var byMetadata = exports.byMetadata = function byMetadata(m) {
  return m.metadata;
};
var byEspecialidadeId = exports.byEspecialidadeId = function byEspecialidadeId(m) {
  return m.especialidadeId;
};
var byRamoConhecimento = exports.byRamoConhecimento = function byRamoConhecimento(m) {
  return m.metadata.ramoConhecimento;
};

var countBySegmento = function countBySegmento(marcacoesSegmento) {
  return function (state, segmento) {
    var segmentoLens = _ramda2.default.lensProp(segmento);
    var getBySegmento = _ramda2.default.view(segmentoLens);
    return _ramda2.default.set(segmentoLens, quantidadeMarcadas(getBySegmento(state), getBySegmento(marcacoesSegmento)), state);
  };
};

function desenvolvimento(state, marcacoes) {
  var marcacoesSegmento = _ramda2.default.groupBy(function (m) {
    return m.segmento;
  }, marcacoes);

  return _ramda2.default.keys(_desenvolvimento2.default).filter(function (segmento) {
    return !!marcacoesSegmento[segmento];
  }).reduce(countBySegmento(marcacoesSegmento), state);
}

function desenvolvimentoEspecialidade(state, marcacoes) {
  return marcacoes.reduce(function (acc, _ref) {
    var _R$merge2;

    var ramo = _ref.ramo,
        type = _ref.type,
        id = _ref.id,
        total = _ref.total;

    var qtdAtualRamo = acc[ramo] || 0;
    var qtdEspecialidadeAtual = (acc[id] || 0) + (type === MARKED ? 1 : -1);
    var ganhoRamo = calcularGanhoRamo(qtdEspecialidadeAtual, total, type);

    return _ramda2.default.merge(acc, (_R$merge2 = {}, _defineProperty(_R$merge2, id, qtdEspecialidadeAtual), _defineProperty(_R$merge2, ramo, qtdAtualRamo + ganhoRamo), _R$merge2));
  }, state);
}

function calcularGanhoRamo(quantidadeEspecialidade, totalEspecialidade, type) {
  if (quantidadeEspecialidade / totalEspecialidade === 1 / 3 && type === MARKED) {
    return 1;
  }
  if ((quantidadeEspecialidade + 1) / totalEspecialidade === 1 / 3 && type === UNMARKED) {
    return -1;
  }
  return 0;
}