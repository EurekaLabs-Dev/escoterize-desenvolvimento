import R from 'ramda'

export const verificacao = (target, payload) => (oldValue, newValue) => {
  if (newValue === target && oldValue < target) {
    return {
      type: 'REACHED', 
      payload
    }
  }

  if (oldValue === target && )
}

export default function create(options) {
  return R.keys(options)
    .reduce((verificador, key) =>
      R.merge(verificador, {
        [key]: verificacao(options[key].payload)
      }), {})
}
