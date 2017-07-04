import test from 'ava'
import segmentoCategoria from '../../src/conexoes/segmentoCategoria'

test('Deve encontrar categoria pelo segmento', t => {
  t.is(segmentoCategoria('CONE_SUL_SENIOR'), 'INSIGNIA_ESPECIAL')
})
