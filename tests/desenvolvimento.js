import test from 'ava'
import R from 'ramda'
import {createMarcacoes} from './helpers'
import desenvolvimento, {reduceEspecialidade, reduceByMetadata} from '../src/desenvolvimento'

test('Gera state', t => {
  const result = desenvolvimento({introdutorio: 0}, [])
  t.deepEqual(result, {
    introdutorio: 0,
    progressao: {},
    insigniaEspecial: {},
    especialidade: {}
  })
})

test('Faz 10 marcações para periodo introdutorio', t => {
  const marcacoes = createMarcacoes('MARKED', 10)
    .map(R.merge(R.__, {segmento: 'INTRODUTORIO'}))
  const result = desenvolvimento({introdutorio: 0}, marcacoes)
  return t.deepEqual(result, {
    introdutorio: 10,
    progressao: {},
    insigniaEspecial: {},
    especialidade: {}
  })
})

test('Faz reduce de marcações por metadata', t => {
  const marcacoes = [
    ...createMarcacoes('MARKED', 2).map(R.merge(R.__, {metadata: 'pista'})),
    ...createMarcacoes('MARKED', 5).map(R.merge(R.__, {metadata: 'trilha'}))
  ].map(R.merge(R.__, {segmento: 'PROGRESSAO'}))

  const initialState = {
    pista: 0,
    trilha: 0
  }
  const result = reduceByMetadata(initialState, marcacoes)
  t.deepEqual(result, {
    pista: 2,
    trilha: 5
  })
})

test('Faz reduce de marcações de especialidades', t => {
  const marcacoes = createMarcacoes('MARKED', 2)
    .map(R.merge(R.__, {
      metadata: {
        especialidadeId: 11,
        ramoConhecimento: 'SERVICO'
      }
    }))

  const result = reduceEspecialidade({}, marcacoes)
  t.deepEqual(result, {
    11: {
      id: 11,
      count: 2,
      ramoConhecimento: 'SERVICO'
    }
  })
})


test('Faz reduce de marcações de 2 especialidades', t => {
  const marcacoesServico = createMarcacoes('MARKED', 2)
    .map(R.merge(R.__, {
      metadata: {
        especialidadeId: 11,
        ramoConhecimento: 'SERVICO'
      }
    }))
  const marcacoesCultura = createMarcacoes('MARKED', 4)
    .map(R.merge(R.__, {
      metadata: {
        especialidadeId: 33,
        ramoConhecimento: 'CULTURA'
      }
    }))

  const result = reduceEspecialidade({}, [...marcacoesCultura, ...marcacoesServico])
  t.deepEqual(result, {
    11: {
      id: 11,
      count: 2,
      ramoConhecimento: 'SERVICO'
    },
    33: {
      id:33,
      count: 4,
      ramoConhecimento: 'CULTURA'
    }
  })
})
