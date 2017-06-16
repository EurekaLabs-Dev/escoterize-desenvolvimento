import test from 'ava'
import {Segmentos} from '../src/enums'

test(t => {
  t.is(Segmentos.INTRODUTORIO, 'INTRODUTORIO')
  t.is(Segmentos.PROGRESSAO, 'PROGRESSAO')
  t.is(Segmentos.INSIGNIA_ESPECIAL, 'INSIGNIA_ESPECIAL')
  t.is(Segmentos.CORDAO, 'CORDAO')
  t.is(Segmentos.INSIGNIA_MODALIDADE, 'INSIGNIA_MODALIDADE')
  t.is(Segmentos.GRAU_MAXIMO, 'GRAU_MAXIMO')
})
