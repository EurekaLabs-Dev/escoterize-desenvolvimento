import test from 'ava'
import {createMarcacoes} from './helpers'
import createDSL from '../src/createDSL'


const config = {
  introdutorio: {
    lobinho: 7,
    comum: 10
  }
}

const dsl = createDSL(config)

test('Marcando uma por uma até 7 marcações lobinho', t => {
  //perder precisão na 4 case decimal. 0,0001
  const total = createMarcacoes('MARKED', 7)
    .reduce((acc, m, i) => 
      dsl.introdutorio.lobinho(i + 1, acc, [m]),
      0
    )
  t.is(total, 100)
})

test('Desmarcando uma por uma até 0 marcações lobinho', t => {
  const total = createMarcacoes('UNMARKED', 7)
    .reduce((acc, m, i) => 
      dsl.introdutorio.lobinho(6 - i, acc, [m]), 
      100
    )
  t.is(total, 0)
})

test('Marcando uma por uma até 10 marcações comum', t => {
  const total = createMarcacoes('MARKED', 10)
    .reduce((acc, m, i) => 
      dsl.introdutorio.comum(i + 1, acc, [m]), 
      0
    )
  t.is(total, 100)
})

test('Desmarcando uma por uma até 0 marcações comum', t => {
  const total = createMarcacoes('UNMARKED', 10)
    .reduce((acc, m, i) => 
      dsl.introdutorio.comum(9 - i, acc, [m]), 
      100
    )
  t.is(total, 0)
})

