import test from 'ava'
import create, {verificacao, verificacaoEspecialidade} from '../src/conquistaBasica'
import {nivelEspecialidade} from '../src/especialidade'

const senior = {
  introdutorio: {
    target: 1,
    payload: {}
  },
  progressao: {
    escalada: {
      target: 1/3,
      payload: {}
    },
    conquista: {
      target: 2/3,
      payload: {}
    },
    azimute: {
      target: 1,
      payload: {}
    }
  },
  insigniaEspecial: {
    imma: {
      target: 1,
      payload: {}
    }
  }
}

test('Criar verificador de conquista com metodo por propriedade', t => {
  const verificador = create(senior)
  t.truthy(verificador.introdutorio)
  t.true(typeof verificador.insigniaEspecial.imma === 'function')
  t.true(typeof verificador.progressao.escalada === 'function')
  t.true(typeof verificador.progressao.conquista === 'function')
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

test('Faz verificação que não tem mudança', t => {
  const result = verificacao(10, {})(7,8)
  t.deepEqual(result, {
    type: 'NONE'
  })
})

test('Calcula nivel da especialidade', t=> {
  t.is(nivelEspecialidade(3, 9), 1)
  t.is(nivelEspecialidade(4, 9), 1)
  t.is(nivelEspecialidade(6, 9), 2)
  t.is(nivelEspecialidade(8, 9), 2)
  t.is(nivelEspecialidade(9, 9), 3)
})

test('Faz verificação de ganho ao passar target', t => {
  const result = verificacao(1/3, {})(0.32, 0.34)
  t.deepEqual(result, {
    type: 'REACHED',
    payload: {}
  })
})

test('Ganho de especialidade nivel 1', t => {
  const old = 2/9
  const newValue = 3/9
  const result = verificacaoEspecialidade(old, newValue)
  t.deepEqual(result, {
    type: 'REACHED',
    payload: {
      segmento: 'ESPECIALIDADE',
      nivel: 1
    }
  })
})

test('Não ganha nível especialidade', t => {
  const old = 3/9
  const newValue = 4/9
  const result = verificacaoEspecialidade(old, newValue)
  t.deepEqual(result, {
    type: 'NONE'
  })
})

test('Ganho de especialidade nivel 2', t => {
  const old = 5/9
  const newValue = 6/9
  const result = verificacaoEspecialidade(old, newValue)
  t.deepEqual(result, {
    type: 'REACHED',
    payload: {
      segmento: 'ESPECIALIDADE',
      nivel: 2
    }
  })
})

test('Ganho de especialidade nivel 3', t => {
  const old = 8/9
  const newValue = 1
  const result = verificacaoEspecialidade(old, newValue)
  t.deepEqual(result, {
    type: 'REACHED',
    payload: {
      segmento: 'ESPECIALIDADE',
      nivel: 3
    }
  })
})
