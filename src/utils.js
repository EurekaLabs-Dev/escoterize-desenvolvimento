export const limites = x => x > 100 ? 100 : limiteZero(x)
export const limites1 = x => x > 1 ? 1 : limiteZero(x)
export const roundTo4 = x => Math.floor(x * 10000) / 10000
export const limiteZero = x => x < 0 ? 0 : x
