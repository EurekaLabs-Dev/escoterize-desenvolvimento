import test from 'ava'
import {createMarcacoes} from './helpers'
import {percentual, quantidadeMarcadas, divisoes} from '../src/desenvolvimento'

test('Calcula quantidade de atividades marcadas', t => {
  const qtd = quantidadeMarcadas(0, createMarcacoes('MARKED', 7))
  t.is(qtd, 7)
})

test('Recalcula quantidade marcações removendo marcações', t => {
  const marcacoes = [
    ...createMarcacoes('MARKED', 7),
    ...createMarcacoes('UNMARKED', 2)
  ]
  const result = quantidadeMarcadas(0, marcacoes)
  t.is(result, 5)
})

test('Adicionar uma marcação a 5', t => {
  t.is(quantidadeMarcadas(5, createMarcacoes('MARKED', 1)), 6)
})

test('Remove uma marcação de 7', t => {
  t.is(quantidadeMarcadas(7, createMarcacoes('UNMARKED', 1)), 6)
})

test('calcula 2 de 7', t => t.is(percentual(2, 7), 28.5714))

test('calcula 1 de 7', t => t.is(percentual(1, 7), 14.2857))

test('calcula 6 de 7', t => t.is(percentual(6, 7), 85.7142))

test('Não pode acima de 100%', t => t.is(percentual(8, 7), 100))

test('Não pode ser abaixo de 0%', t => t.is(percentual(-1, 7), 0))

test('Faz 2 divisões com 50%', t => {
  t.deepEqual(divisoes(5, 10, 2), {
    1: 100,
    2: 0,
  })
})

test('Faz 2 divisões com 30%', t => {
  t.deepEqual(divisoes(3, 10, 2), {
    1: 60,
    2: 0,
  })
})

test('Faz 3 divisões com 50%', t => {
  t.deepEqual(divisoes(5, 10, 3), {
    1: 100,
    2: 50,
    3: 0
  })
})

test('Faz 3 divisões com 100%', t => {
  t.deepEqual(divisoes(10, 10, 3), {
    1: 100,
    2: 100,
    3: 100
  })
})
