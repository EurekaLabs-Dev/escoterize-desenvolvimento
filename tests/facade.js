import test from 'ava'
import conexoes, {segmentoCategoria} from '../conexoes'
import enums, {CATEGORIA, DESENVOLVIMENTO} from '../enums'
import {desenvolvimentoEspecialidade, desenvolvimento} from '../core'
import {requisitos} from '../config'

test('Deve importar conexoes corretamente', t => {
  t.is(typeof segmentoCategoria, 'function')
  t.truthy(conexoes)
})

test('Deve importar enums corretamente', t => {
  t.is(DESENVOLVIMENTO.PROGRESSAO_RUMO_TRAVESSIA, 'PROGRESSAO_RUMO_TRAVESSIA')
  t.is(CATEGORIA.PROGRESSAO, 'PROGRESSAO')
  t.truthy(enums)
})

test('Deve importar desenvolvimento corretamente', t => {
  t.truthy(desenvolvimento)
  t.truthy(desenvolvimentoEspecialidade)
})

test('Importar configuração de requisitos', t => {
  t.truthy(requisitos.verdeAmarelo)
  t.truthy(requisitos.vermelhoBranco)
  t.truthy(requisitos.desafioSenior)
  t.truthy(requisitos.dourado)
})
