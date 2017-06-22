import test from 'ava'
import R from 'ramda'
import {createMarcacoes} from './helpers'
import desenvolvimento, {countBy, byMetadata, byEspecialidadeId, byRamoConhecimento} from '../src/desenvolvimento'

test('Gera state', t => {
  const result = desenvolvimento({introdutorio: 0}, [])
  t.deepEqual(result, {
    introdutorio: 0,
    progressao: {},
    insigniaEspecial: {},
    especialidade: {},
    ramoConhecimento: {}
  })
})

test('Faz 10 marcações para periodo introdutorio', t => {
  const marcacoes = createMarcacoes('MARKED', 10)
    .map(R.merge(R.__, {segmento: 'INTRODUTORIO'}))
  const result = desenvolvimento({introdutorio: 0}, marcacoes)
  return t.is(result.introdutorio, 10)
})

test('Faz contagem de marcações por metadata', t => {
  const marcacoes = [
    ...createMarcacoes('MARKED', 2).map(R.merge(R.__, {metadata: 'pistaTrilha'})),
    ...createMarcacoes('MARKED', 5).map(R.merge(R.__, {metadata: 'rumoTravessia'}))
  ].map(R.merge(R.__, {segmento: 'PROGRESSAO'}))

  const initialState = {
    pistaTrilha: 0,
    rumoTravessia: 0
  }
  const result = countBy(byMetadata, initialState, marcacoes)
  t.deepEqual(result, {
    pistaTrilha: 2,
    rumoTravessia: 5
  })
})

test('Conta especialidades', t => {
  const marcacoes = createMarcacoes('MARKED', 2)
    .map(R.merge(R.__, {
      metadata: {
        especialidadeId: 11,
        ramoConhecimento: 'SERVICO'
      }
    }))

  const result = countBy(byEspecialidadeId, {}, marcacoes)
  t.deepEqual(result, {
    11: 2
  })
})


test('Conta especialidades por ramo de conhecimento', t => {
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

  const result = countBy(byRamoConhecimento, {}, [...marcacoesCultura, ...marcacoesServico])
  t.deepEqual(result, {
    SERVICO: 2,
    CULTURA: 4
  })
})
