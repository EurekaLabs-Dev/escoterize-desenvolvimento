import test from 'ava'
import R from 'ramda'
import {createMarcacoes} from './helpers'
import {desenvolvimento, desenvolvimentoEspecialidade, countBy, byMetadata, byEspecialidadeId, byRamoConhecimento, calcularGanhoRamo} from '../src/desenvolvimento'

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
      id: 11,
      total: 12,
      segmento: 'SERVICOS'
    }))

  const result = desenvolvimentoEspecialidade({}, marcacoes)
  t.deepEqual(result, {
    11: 10,
    SERVICOS: {total: 1, n1: 0, n2: 1, n3: 0}
  })
})

test('Diminui quantidade por ramo com marcação desmarcada', t => {
  const marcacoes = createMarcacoes('UNMARKED', 1)
    .map(R.merge(R.__, {
      id: 11,
      total: 12,
      segmento: 'SERVICOS'
    }))

  const result = desenvolvimentoEspecialidade({
    SERVICOS: { total: 1, n1: 1, n2: 0, n3: 0 },
    11: 4
  }, marcacoes)
  t.deepEqual(result, {
    11: 3,
    SERVICOS: { total: 0, n1: 0, n2: 0, n3: 0 }
  })
})

test('Deve calcular ganho de ramo para 1', t => {
  const result = calcularGanhoRamo(3, 9, 'MARKED')
  const result2 = calcularGanhoRamo(4, 12, 'MARKED')
  t.is(result, 1)
  t.is(result2, 1)
})

test('Deve calcular ganho de ramo para 0', t => {
  const result = calcularGanhoRamo(1, 9, 'MARKED')
  const result2 = calcularGanhoRamo(3, 9, 'UNMARKED')
  t.is(result, 0)
  t.is(result2, 0)
})

test('Deve calcular ganho de ramo para -1', t => {
  const result = calcularGanhoRamo(2, 9, 'UNMARKED')
  t.is(result, -1)
})

test('Calcula desenvolvimento com especialidades', t => {
  const initialState = {
    PROMESSA_ESCOTEIRA_LOBINHO: 8,
    PROMESSA_ESCOTEIRA_SENIOR: 7,
    PROGRESSAO_SENIOR: 4,
    especialidade: {}
  }

  const marcacoes = createMarcacoes('MARKED', 4)
    .map(R.merge(R.__, {segmento: 'CULTURA', id: 23, type: 'MARKED', total: 9}))
   
  const result = desenvolvimento(initialState, marcacoes)
  t.deepEqual(result, {
    PROMESSA_ESCOTEIRA_LOBINHO: 8,
    PROMESSA_ESCOTEIRA_SENIOR: 7,
    PROGRESSAO_SENIOR: 4,
    especialidade: {
      23: 4,
      CULTURA: { total: 1, n1: 1, n2: 0, n3: 0 }
    }
  })
})

