import test from 'ava'
import R from 'ramda'
import {createMarcacoes} from './helpers'
import desenvolvimento, {countBy, byMetadata, byEspecialidadeId, byRamoConhecimento} from '../src/desenvolvimento'

test('Conta especialidades', t => {
  const marcacoes = createMarcacoes('MARKED', 2)
    .map(R.merge(R.__, { especialidadeId: 11 }))

  const result = countBy(byEspecialidadeId, {}, marcacoes)
  t.deepEqual(result, {
    11: 2
  })
})


test('Conta especialidades com estado inicial', t => {
  const marcacoes = createMarcacoes('MARKED', 2)
    .map(R.merge(R.__, { especialidadeId: 11 }))

  const result = countBy(byEspecialidadeId, {22: 4}, marcacoes)
  t.deepEqual(result, {
    11: 2,
    22: 4
  })
})


test('Calcula desenvolvimento com base nos enums', t => {
  const initialState = {
    PROMESSA_ESCOTEIRA_LOBINHO: 0,
    PROMESSA_ESCOTEIRA_SENIOR: 0,
    PROGRESSAO_SENIOR: 0
  }

  const marcacoes = R.flatten([
    createMarcacoes('MARKED', 4).map(R.merge(R.__, {segmento: 'PROMESSA_ESCOTEIRA_SENIOR'})),
    createMarcacoes('MARKED', 8).map(R.merge(R.__, {segmento: 'PROMESSA_ESCOTEIRA_LOBINHO'})),
    createMarcacoes('MARKED', 7).map(R.merge(R.__, {segmento: 'PROGRESSAO_SENIOR'}))
  ])
  const result = desenvolvimento(initialState, marcacoes)
  t.deepEqual(result, {
    PROMESSA_ESCOTEIRA_LOBINHO: 8,
    PROMESSA_ESCOTEIRA_SENIOR: 4,
    PROGRESSAO_SENIOR: 7
  })
})

test('Calcula desenvolvimento das especialidades', t => {
  const marcacoes = createMarcacoes('MARKED', 10)
    .map(R.merge(R.__, {
      especialidadeId: 11,
      segmento: 'SERVICOS'
    }))

  const result = desenvolvimento({SERVICOS: 0}, marcacoes)
  t.deepEqual(result, {
    especialidade: {
      11: 10
    },
    SERVICOS: 10
  })
})
