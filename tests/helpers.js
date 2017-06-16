export const createMarcacoes = (type, count) => {
  const marcacoes = []
  let i
  for (i = 0; i < count; i++) {
    marcacoes.push({
      type,
    })
  }
  return marcacoes
}
