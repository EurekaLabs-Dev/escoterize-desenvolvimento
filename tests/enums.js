import test from 'ava'
import Enum from '../src/enums/create'

test('Deve criar enums', t => {
  const CORES = Enum(['AZUL', 'VERMELHO'])
  t.is(CORES.AZUL, 'AZUL')
  t.is(CORES.VERMELHO, 'VERMELHO')
})
