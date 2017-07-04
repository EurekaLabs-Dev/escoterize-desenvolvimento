import test from 'ava'
import createGraph, {createVertex, createEdge} from '../src/conexoes/createGraph'

test('should create graph', t => {
  const g = createGraph()
  t.truthy(g)
})

//test('should create a vertex', t => {
//  const v = createVertex(1, 'PROGRESSAO_RUMO_TRAVESSIA')
//  t.is(v.value, 'PROGRESSAO_RUMO_TRAVESSIA')
//  t.is(v.id, 1)
//  t.is(v.outEdges, 0)
//  t.is(v.inEdges, 0)
//})
//
//test('should create an edge', t => {
//
//})
//
//test('graph should create vertex', t => {
//  const g = createGraph()
//  const v = g.addVertex('PROGRESSAO_PISTA_TRILHA')
//  t.truthy(v)
//})
//
//test('hould add an edge', t => {
//  const vPistaTrilha = createVertex('PROGRESSAO_PISTA_TRILHA')
//  const vProgressao = createVertex('PROGRESSAO')
//  const vProgressao2 = createEdge('segmento', vProgressao, vPistaTrilha)
//  t.deepEqual(vProgressao, {
//    value: 'PROGRESSAO',
//    outEdges: 0,
//    inEdges: 0
//  })
//  t.deepEqual(vProgressao2, {
//    value: 'PROGRESSAO'
//  })
//})

//test('vertex should have out edges', t => {
//  const g = createGraph()
//  const vPistaTrilha = g.addVertex('PROGRESSAO_PISTA_TRILHA')
//  const vRumoTravessia = g.addVertex('PROGRESSAO_RUMO_TRAVESSIA')
//  const vCategoria = g.addVertex('PROGRESSAO')
//  vCategoria.addEdges('segmento', [vPistaTrilha, vRumoTravessia])
//  t.is(vCategoria.outEdges, 2)
//})
