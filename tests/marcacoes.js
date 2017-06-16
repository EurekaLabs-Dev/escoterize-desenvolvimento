import test from 'ava'
import {createMarcacoes} from './helpers'
import {percentualMarcacoes} from '../src/desenvolvimento'



test('calcula % marcações do zero', t => {
  const result = percentualMarcacoes(0, createMarcacoes('MARKED', 2), 7)
  t.is(result, 28.5714)
})

test('calcula % marcações a partir de vl calculado', t => {
  const result = percentualMarcacoes(28.5714, createMarcacoes('MARKED', 2), 7)
  t.is(result, 57.1428)
})

test('calcula % marcações de 0% a 100%', t => {
  const result = percentualMarcacoes(0, createMarcacoes('MARKED', 7), 7)
  t.is(result, 100)
})

test('calcula periodo % marcações não pode passar de 100%', t => {
  const result = percentualMarcacoes(0, createMarcacoes('MARKED', 8), 7)
  t.is(result, 100)
})

test('Recalcula % marcações removendo marcações', t => {
  const marcacoes = [
    ...createMarcacoes('MARKED', 7),
    ...createMarcacoes('UNMARKED', 2)
  ]
  const result = percentualMarcacoes(0, marcacoes, 7)
  t.is(result, 71.4285)
})

test('%Marcações não pode ficar menor que 0', t => {
  t.is(
    percentualMarcacoes(0,createMarcacoes('UNMARKED', 1), 7),
    0
  )
})

test('Marcando uma por uma até 6 marcações', t => {
  //perder precisão na 4 case decimal. 0,0001
  const total = createMarcacoes('MARKED', 6)
    .reduce((acc, m) => percentualMarcacoes(acc, [m], 7), 0)
  t.is(total, 85.7142)
})

