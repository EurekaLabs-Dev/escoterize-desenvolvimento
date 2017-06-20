import R from 'ramda'

export const verificacao = (target, payload) => (oldValue, newValue) => {
  if (oldValue < target && newValue === target) {
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

export default function create(options) {
  return R.keys(options)
    .reduce((verificador, key) =>
      R.merge(verificador, {
        [key]: verificacao(options[key].payload)
      }), {})
}

export const nivelEspecialidade = (count, total) =>
  Math.trunc(count / total / (1/3))
