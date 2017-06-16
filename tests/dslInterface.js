import createDSL from '../src/createDSL'
import test from 'ava'

test('Cria desenvolvimento dsl com funções para periodo introdutório', t => {
  const desenvolvimentoDSL = createDSL({
    introdutorio: {
      lobinho: 7,
      comum: 10
    }
  })

  t.truthy(desenvolvimentoDSL.introdutorio.lobinho)
  t.truthy(desenvolvimentoDSL.introdutorio.comum)
})

