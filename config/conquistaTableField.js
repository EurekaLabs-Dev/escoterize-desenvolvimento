const createConquista = field => ({table: 'conquista', field})
const createProgressao = field => ({table: 'progressao', field})

export default {
  PROMESSA_ESCOTEIRA_LOBINHO:createConquista('dt_promessa_lobinho'),
  PROMESSA_ESCOTEIRA_ESCOTEIRO:createConquista('dt_promessa_escoteira'),
  PROMESSA_ESCOTEIRA_SENIOR:createConquista('dt_promessa_escoteira'),
  PROMESSA_ESCOTEIRA_PIONEIRO:createConquista('dt_promessa_escoteira'),
  ESCALADA: createProgressao('dt_escalada'),
  CONQUISTA: createProgressao('dt_conquista'),
  AZIMUTE: createProgressao('dt_azimute'),
  IMMA: createConquista('dt_meio_ambiente_senior'),
  LUSOFONIA_SENIOR: createConquista('dt_conquista_lusofonia_senior'),
  CONE_SUL_SENIOR: createConquista('dt_conquista_cone_sul_senior'),
  DESAFIO_COMUNITARIO: createConquista('dt_conquista_desafio_comunitario'),
  MATEIRO: createConquista('dt_correia_do_mateiro'),
  AERONAUTA: createConquista('dt_insignia_modalidade_ar'),
  NAVAL: createConquista('dt_insignia_mar'),
  CORDAO_DESAFIO_SENIOR: createConquista('dt_conquista_cordao_desafio_senior'),
  CORDAO_DOURADO: createConquista('dt_cordao_dourado'),
  ESCOTEIRO_PATRIA: createConquista('dt_escoteiro_da_patria')
}
