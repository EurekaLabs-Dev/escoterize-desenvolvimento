import R from 'ramda'

export const verificacao = (target, payload) => (oldValue, newValue) => {
  if (oldValue < target && newValue >= target) {
    return {
      type: 'REACHED',
      payload
    }
  }

  if(oldValue === target && newValue < target) {
    return {
      type: 'LOST',
      payload
    }
  }

  return {
    type: 'NONE'
  }
}

const verificacoesDinamicas = options =>
  R.keys(options)
    .reduce((verificador, key) =>
      R.merge(verificador, {
        [key]: verificacao(options[key].payload)
      }), {})


export default function create(options) {
  return {
    introdutorio: verificacao(options.introdutorio.payload),
    progressao: verificacoesDinamicas(options.progressao),
    insigniaEspecial: verificacoesDinamicas(options.insigniaEspecial)
  }
}


export const verificacaoEspecialidade = (oldValue, newValue) =>
  [
    verificacao(1/3, {segmento: 'ESPECIALIDADE', nivel: 1})(oldValue, newValue),
    verificacao(2/3, {segmento: 'ESPECIALIDADE', nivel: 2})(oldValue, newValue),
    verificacao(1, {segmento: 'ESPECIALIDADE', nivel: 3})(oldValue, newValue)
  ]
    .filter(result => result.type !== 'NONE')[0]
    || {type: 'NONE'}
