import test from 'ava'
import create, {verificacao} from '../src/conquista'

const senior = {
  introdutorio: {
    target: 100,
    payload: {}
  }
}

test('Criar verificador de conquista com metodo por propriedade', t => {
  const verificador = create(senior)
  t.truthy(verificador.introdutorio)
})

test('Fazer verificação de ganho', t => {
  const result = verificacao(10, {ramo: 'SENIOR'})(9, 10)
  t.deepEqual(result, {
    type: 'REACHED',
    payload: {ramo: 'SENIOR'}
  })
})

test('Fazer verificação de perca', t => {
  const result = verificacao(10, {ramo: 'SENIOR'})(10, 9)
  t.deepEqual(result, {
    type: 'LOST',
    payload: {ramo: 'SENIOR'}
  })
})
