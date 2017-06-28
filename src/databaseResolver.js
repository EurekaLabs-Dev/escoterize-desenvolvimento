import R from 'ramda'


export const tableFieldResolver = config => input => {
  const tableField = config[input]
  if (tableField) return tableField
  throw new Error('Tabela e campo não definido para ' + input.type)
}

export const marcacaoTableResolver = input => {
}


