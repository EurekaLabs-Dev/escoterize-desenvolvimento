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

var _especialidade = require('./especialidade');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MARKED = _mark.MarkStatus.MARKED,
    UNMARKED = _mark.MarkStatus.UNMARKED;


var reduceQuantidade = function reduceQuantidade(qtd, marcacao) {
  return _mark.MarkStatus.isMarked(marcacao) ? qtd + 1 : qtd - 1;
};

var quantidadeMarcadas = exports.quantidadeMarcadas = function quantidadeMarcadas() {
  var quantidadeAtual = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var marcacoes = arguments[1];
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
    acc[divisao] = calcularDivisao(pc, divisao, divisoes);
    return acc;
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

var countBySegmento = function countBySegmento(marcacoesSegmento, quantidadesEspecialidades) {
  return function (state, segmento) {
    if ((0, _segmentoCategoria2.default)(segmento) === _categorias2.default.ESPECIALIDADE) {
      return _ramda2.default.over(_ramda2.default.lensProp('especialidade'), function (state) {
        return desenvolvimentoEspecialidade(state, quantidadesEspecialidades, marcacoesSegmento[segmento]);
      }, state);
    }
    var segmentoLens = _ramda2.default.lensProp(segmento);
    var getBySegmento = _ramda2.default.view(segmentoLens);
    return _ramda2.default.set(segmentoLens, quantidadeMarcadas(getBySegmento(state), getBySegmento(marcacoesSegmento)), state);
  };
};

function desenvolvimento(state, quantidadesEspecialidades, marcacoes) {
  var marcacoesSegmento = _ramda2.default.groupBy(function (m) {
    return m.segmento;
  }, marcacoes);

  return _ramda2.default.keys(_desenvolvimento2.default).filter(function (segmento) {
    return !!marcacoesSegmento[segmento];
  }).reduce(countBySegmento(marcacoesSegmento, quantidadesEspecialidades), state);
}

function desenvolvimentoEspecialidade(state, quantidadesEspecialidades, marcacoes) {
  return marcacoes.reduce(function (acc, _ref) {
    var segmento = _ref.segmento,
        type = _ref.type,
        id = _ref.id;

    var total = quantidadesEspecialidades[id];
    var qtdAtualRamo = _ramda2.default.pathOr(0, [segmento, 'total'], acc);
    var ganhoEspecialidade = type === MARKED ? 1 : -1;
    var qtdEspecialidadeAtual = (acc[id] || 0) + ganhoEspecialidade;
    var ganhoRamo = calcularGanhoRamo(qtdEspecialidadeAtual, total, type);
    var nivelAtual = (0, _especialidade.nivelEspecialidade)(qtdEspecialidadeAtual, total);
    var nivelAnterior = (0, _especialidade.nivelEspecialidade)(qtdEspecialidadeAtual - ganhoEspecialidade, total);
    var mudouNivel = nivelAtual !== nivelAnterior;

    var setNiveisDefault = _ramda2.default.over(_ramda2.default.lensProp(segmento), function (ramo) {
      return _ramda2.default.merge(ramo, { n1: ramo.n1 || 0, n2: ramo.n2 || 0, n3: ramo.n3 || 0 });
    });
    var setNivelAtual = _ramda2.default.over(_ramda2.default.lensPath([segmento, 'n' + nivelAtual]), function () {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return mudouNivel ? x + 1 : x;
    });
    var setNivelAnterior = _ramda2.default.over(_ramda2.default.lensPath([segmento, 'n' + nivelAnterior]), function (x) {
      return mudouNivel ? x - 1 : x;
    });
    var setTotalSegmento = _ramda2.default.set(_ramda2.default.lensPath([segmento, 'total']), qtdAtualRamo + ganhoRamo);
    var setQtdEspecialidade = _ramda2.default.set(_ramda2.default.lensProp(id), qtdEspecialidadeAtual);

    return _ramda2.default.compose(nivelAtual > 0 ? setNivelAtual : _ramda2.default.identity, nivelAnterior > 0 ? setNivelAnterior : _ramda2.default.identity, setNiveisDefault, setTotalSegmento, setQtdEspecialidade)(acc);
  }, state || {});
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