import test from 'ava'
import R from 'ramda'
import {tableFieldResolver} from '../src/databaseResolver'

const conquistaConfig = {
  pistas: {
    table: 'progressao',
    column: 'dt_pistas'
  }
}
test('gerar obj para salvar data da conquista', t => {
  const result = tableFieldResolver(conquistaConfig)('pistas')

  t.deepEqual(result, {
    table: 'progressao',
    column: 'dt_pistas'
  })
})

test('Lança exceção ao não encontrar conquistaType mapeado', t => {
  try {
    tableFieldResolver(conquistaConfig)('invalido')
    t.true(false)
  } catch (e) {
    t.true(true)
  }
})

//test('Decidi qual tabela salvar marcação', t => {
//  const progressao = marcacaoTableResolver('AZIMUTE')
//  const especialidade = marcacaoTableResolver('ESPECIALIDADE')
//  const insigniaCordao = marcacaoTableResolver('INSIGNIA_CORDAO')
//})
