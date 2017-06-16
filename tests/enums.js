import test from 'ava'
import enums from '../src/enums'

test(t => {
  t.is(enums.INTRODUTORIO, 'INTRODUTORIO')
  t.is(enums.PROGRESSAO, 'PROGRESSAO')
  t.is(enums.INSIGNIA_ESPECIAL, 'INSIGNIA_ESPECIAL')
  t.is(enums.CORDAO, 'CORDAO')
  t.is(enums.INSIGNIA_MODALIDADE, 'INSIGNIA_MODALIDADE')
  t.is(enums.GRAU_MAXIMO, 'GRAU_MAXIMO')
})
