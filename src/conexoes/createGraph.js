import R from 'ramda'

export function createVertex(id, value) {
  return {
    value,
    outEdges: 0,
    inEdges: 0,
    addEdge: (label, edge) => {

    }
  }
}

export function createEdge(id, label, outVertex, inVertex) {
  return {
    id,
    label,
    outVertex,
    inVertex
  }
}

export default function createGraph() {
  return {
    addVertex() {
      return {}
    }
  }
}
