import DESENVOLVIMENTO from '../enums/desenvolvimento'
import CATEGORIAS from '../enums/categorias'

export default key => {
  if (key.includes('PROGRESSAO') || key.includes('PROMESSA')) {
    return CATEGORIAS.PROGRESSAO
  }
  if (key.includes('LUSOFONIA') || 
    key.includes('IMMA') || 
    key.includes('CONE_SUL') || 
    key.includes('COMUNITARI') || 
    key.includes('APRENDER') ||
    key.includes('BOA_')) {
    return CATEGORIAS.INSIGNIA_ESPECIAL
  }

  return CATEGORIAS.ESPECIALIDADE
}
