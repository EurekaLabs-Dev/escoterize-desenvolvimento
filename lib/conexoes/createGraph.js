'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createVertex = createVertex;
exports.createEdge = createEdge;
exports.default = createGraph;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createVertex(id, value) {
  return {
    value: value,
    outEdges: 0,
    inEdges: 0,
    addEdge: function addEdge(label, edge) {}
  };
}

function createEdge(id, label, outVertex, inVertex) {
  return {
    id: id,
    label: label,
    outVertex: outVertex,
    inVertex: inVertex
  };
}

function createGraph() {
  return {
    addVertex: function addVertex() {
      return {};
    }
  };
}