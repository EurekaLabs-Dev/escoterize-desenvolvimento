import test from 'ava'
import {createMarcacoes} from './helpers'
import {introdutorioLobinho, introdutorio} from '../src/desenvolvimento'

test('Marcando uma por uma até 7 marcações lobinho', t => {
  //perder precisão na 4 case decimal. 0,0001
  const total = createMarcacoes('MARKED', 7)
    .reduce((acc, m, i) => introdutorioLobinho(i + 1, acc, [m]), 0)
  t.is(total, 100)
})

test('Desmarcando uma por uma até 0 marcações lobinho', t => {
  const total = createMarcacoes('UNMARKED', 7)
    .reduce((acc, m, i) => introdutorioLobinho(6 - i, acc, [m]), 100)
  t.is(total, 0)
})

test('Marcando uma por uma até 10 marcações comum', t => {
  const total = createMarcacoes('MARKED', 10)
    .reduce((acc, m, i) => introdutorio(i + 1, acc, [m]), 0)
  t.is(total, 100)
})

test('Desmarcando uma por uma até 0 marcações comum', t => {
  const total = createMarcacoes('UNMARKED', 10)
    .reduce((acc, m, i) => introdutorio(9 - i, acc, [m]), 100)
  t.is(total, 0)
})

