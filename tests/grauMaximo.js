import test from 'ava'
import R from 'ramda'
import { calcularSenior, calcularLobinho, calcularEscoteiro, higher } from '../src/grauMaximo'

test('Retorna o maior valor', t => {
  const result = higher([
    0.2,
    1,
    0.4
  ])

  t.is(result, 1)
})

const desenvolvimentoSenior = {
    PROGRESSAO_SENIOR: 1,
    IMMA_SENIOR: 1,
    CONE_SUL_SENIOR: 1/3,
    especialidade: {
      107: 1,
      SERVICOS: {n1: 1, n2: 0, n3: 3, total: 4},
      CULTURA: {n1: 1, n2: 2, n3: 3, total: 6},
      CIENCIA_TECNOLOGIA: {n1: 1, n2: 0, n3: 1, total: 2},
      DESPORTOS: {n1: 0, n2: 2, n3: 0, total: 2},
      HABILIDADES_ESCOTEIRAS: {n1: 0, n2: 1, n3: 0, total: 1},
    }
}
test('Calcular grau maximo do sênior', t => {
  const pcModalidade = 1
  t.is(calcularSenior(desenvolvimentoSenior, pcModalidade), 1)
})

test('Calcular grau maximo do sênior sem uma das variaveis para conquista', t => {
  const desenvolvimento = R.merge(desenvolvimentoSenior, {
    PROGRESSAO_SENIOR: 0
  })
  t.is(calcularSenior(desenvolvimento, 1), 0.63)
})

test('Calcular grau maximo do lobinho', t => {
  const desenvolvimento = {
    PROGRESSAO_PATATENRA_SALTADOR: 1,
    PROGRESSAO_RASTREADOR_CACADOR: 1,
    LUSOFONIA_LOBINHO: 0.5,
    BOA_ACAO: 1,
    especialidade: {
      107: 1,
      SERVICOS: {n1: 1, n2: 2, n3: 0, total: 3},
      CIENCIA_TECNOLOGIA: {n1: 1, n2: 0, n3: 0, total: 1},
      HABILIDADES_ESCOTEIRAS: {n1: 1, n2: 0, n3: 0, total: 1},
    }
  }
  t.is(calcularLobinho(desenvolvimento), 1)
})

test('Calcular grau maximo do escoteiro', t => {
  const desenvolvimento = {
    PROGRESSAO_PISTA_TRILHA: 1,
    PROGRESSAO_RUMO_TRAVESSIA: 1,
    CONE_SUL_ESCOTEIRO: 0.5,
    ACAO_COMUNITARIA: 1,
    especialidade: {
      107: 2/3,
      SERVICOS: {n1: 0, n2: 3, n3: 0, total: 3},
      CIENCIA_TECNOLOGIA: {n1: 1, n2: 2, n3: 0, total: 3},
      HABILIDADES_ESCOTEIRAS: {n1: 1, n2: 0, n3: 1, total: 2},
      DESPORTOS: {n1: 4, n2: 0, n3: 0, total: 4},
      CULTURA: {n1: 1, n2: 0, n3: 0, total: 1},
    }
  }
  t.is(calcularEscoteiro(desenvolvimento, 1), 1)
})
