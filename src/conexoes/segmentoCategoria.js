import DESENVOLVIMENTO from '../enums/desenvolvimento'
import CATEGORIAS from '../enums/categorias'


const conexoes = {
  [DESENVOLVIMENTO.ESPECIALIDADE]: CATEGORIAS.ESPECIALIDADE,
  [DESENVOLVIMENTO.CULTURA]: CATEGORIAS.ESPECIALIDADE,
  [DESENVOLVIMENTO.SERVICOS]: CATEGORIAS.ESPECIALIDADE,
  [DESENVOLVIMENTO.CIENCIA_TECNOLOGIA]: CATEGORIAS.ESPECIALIDADE,
  [DESENVOLVIMENTO.HABILIDADES_ESCOTEIRAS]: CATEGORIAS.ESPECIALIDADE,
  [DESENVOLVIMENTO.DESPORTO]: CATEGORIAS.ESPECIALIDADE,
  [DESENVOLVIMENTO.PROMESSA_ESCOTEIRA_LOBINHO]: CATEGORIAS.PROGRESSAO,
  [DESENVOLVIMENTO.PROGRESSAO_LIBINHO]: CATEGORIAS.PROGRESSAO,
  [DESENVOLVIMENTO.PROMESSA_ESCOTEIRA_SENIOR]: CATEGORIAS.PROGRESSAO,
  [DESENVOLVIMENTO.PROGRESSAO_SENIOR]: CATEGORIAS.PROGRESSAO,
  [DESENVOLVIMENTO.PROMESSA_ESCOTEIRA_PIONEIRO]: CATEGORIAS.PROGRESSAO,
  [DESENVOLVIMENTO.PROGRESSAO_PIONEIRO]: CATEGORIAS.PROGRESSAO,

  [DESENVOLVIMENTO.IMMA_SENIOR]: CATEGORIAS.INSIGNIA_ESPECIAL,
  [DESENVOLVIMENTO.CONE_SUL_SENIOR]: CATEGORIAS.INSIGNIA_ESPECIAL,
  [DESENVOLVIMENTO.LUSOFONIA_SENIOR]: CATEGORIAS.INSIGNIA_ESPECIAL,
  [DESENVOLVIMENTO.DESAFIO_COMUNITARIO]: CATEGORIAS.INSIGNIA_ESPECIAL,
  [DESENVOLVIMENTO.APRENDER_SENIOR]: CATEGORIAS.INSIGNIA_ESPECIAL,
}

export default key => conexoes[key]
