import R from 'ramda'

export default function Enum(values) {
  return values.reduce((obj, value) => {
    return R.merge(obj, {[value]: value})
  }, {})
}
