import test from 'ava'
import R from 'ramda'
import {calcularPercentualDistribuicao, sumRequisitosSatisfeitos, requisitoSatisfeitoEspecialidade, calcularPercentual, requisitoSatisfeitoRamoConhecimento, calcularPercentualRamos} from '../src/requisito'


test('Calcula percentual do requisito satisfeito em 100%', t => {
  const result = requisitoSatisfeitoEspecialidade  ({
    percentuais: {
      10: 4/6
    },
    requisito: {
      10: 2
    }
  })(10)

  t.is(result, 1)
})

test('Percentual não pode passar de 100%', t => {
  const result = requisitoSatisfeitoEspecialidade({
    percentuais: {
      10: 4/6
    },
    requisito: {
      10: 1
    }
  })(10)

  t.is(result, 1)
})

test('Calcula percentual do requisito satisfeito em 50%', t => {
  const result = requisitoSatisfeitoEspecialidade({
    percentuais: {
      10: 3/6
    },
    requisito: {
      10: 2
    }
  })(10)

  t.is(result, 0.5)
})


test('Calcula perncentual de 100% atingido nos ramos de conhecimento', t => {
  const niveis = {
    servico: {
      1: 0,
      2: 2,
      3: 4
    }
  }
  const requisito = {
    servico: {
      2: 2,
      3: 4
    }
  }
  const result = requisitoSatisfeitoRamoConhecimento({
    niveis,
    requisito
  })('servico')

  t.is(result, 1)
})

test('Calcula perncentual de 50% atingido nos ramos de conhecimento', t => {
  const niveis = {
    servico: {
      1: 0,
      2: 2,
      3: 4
    } }
  const requisito = {
    servico: {
      2: 4,
      3: 8
    }
  }
  const result = requisitoSatisfeitoRamoConhecimento({
    niveis,
    requisito
  })('servico')

  t.is(result, 0.5)
})


test('Soma percentuais dos requisito para os ramos de conhecimento', t=> {
  const niveis = {
    servico: {
      1: 0,
      2: 2,
      3: 4
    },
    cultura: {
      1: 0,
      2: 3,
      3: 0
    }
  }
  const requisito = {
    servico: {
      2: 2,
      3: 4
    },
    cultura:  {
      2: 6
    }
  }

  const result = sumRequisitosSatisfeitos({
    niveis,
    requisito
  }, requisitoSatisfeitoRamoConhecimento)
  t.is(result, 0.75)
})

test('Soma percentuais de especialidades que atigiram seus niveis', t => {
  const percentuais = {
    10: 6/12,
    11: 6/9,
    14: 1/9
  }
  const requisito = {
    10: 2,
    11: 2
  }
  const result = sumRequisitosSatisfeitos(
    {percentuais, requisito},
    requisitoSatisfeitoEspecialidade
  )
  t.is(result, 0.75)
})


const requisitoCordaoDourado = {
  quantidadeMinima: 15,
  nivelMinimo: 3,
  especialidades: { 10: 3 },
  ramosConhecimento: {
    servico: { 3: 3 }
  }
}

test('Calcula percentual de uma conquista com base no requisito', t=> {
  const percentuaisEspecialidades = { 10: 1 }
  const ramosConhecimento = {
    servico: { 3: 4 },
    cultura: { 3: 4 },
    habilidadesEscoteiras: { 3: 3 },
    desportos: { 3: 3 },
    cienciaTecnologia: { 3: 1 }
  }

  const result = calcularPercentual({
    requisito: requisitoCordaoDourado,
    percentuais: percentuaisEspecialidades,
    ramosConhecimento
  })

  t.is(result, 1)
})


test('Calcula percentual para quando não distribuir em todos os ramos', t=> {
  const percentuaisEspecialidades = {
    10: 1
  }
  const ramosConhecimento = {
    servico: { 3: 4 },
    cultura: { 3: 4 },
    habilidadesEscoteiras: { 3: 0},
    desportos: { 3: 0 },
    cienciaTecnologia: {3: 0}
  }

  const result = calcularPercentual({
    requisito: requisitoCordaoDourado,
    percentuais: percentuaisEspecialidades,
    ramosConhecimento
  })

  t.is(result, 0.57)
})

test('Calcula percentual da conquista dos ramos de acordo com requisito', t=> {
  const data = {
    requisito: {
      quantidadeMinima: 15,
      nivelMinimo: 3
    },
    ramosConhecimento: {
      servico: { 3: 4 },
      cultura: { 3: 4 },
      habilidadesEscoteiras: { 3: 3},
      desportos: { 3: 2 },
      cienciaTecnologia: {3: 2}
    }
  }
  const result = calcularPercentualRamos(data)
  t.is(result, 1)
})

test('Calcula percentual intermediario da conquista dos ramos de acordo com requisito', t=> {
  const data = {
    requisito: {
      quantidadeMinima: 15,
      nivelMinimo: 3
    },
    ramosConhecimento: {
      servico: { 3: 1},
      cultura: { 3: 1 },
      habilidadesEscoteiras: { 3: 3},
      desportos: { 3: 1 },
      cienciaTecnologia: {3: 5}
    }
  }
  const result = calcularPercentualRamos(data)
  t.is(result, 0.73)
})

test('Calcula percentual da distribuição entre os ramos', t => {
  const result = calcularPercentualDistribuicao({
    ramosConhecimento: {
      servico: {3: 1},
      cultura: {3: 2},
      cienciaTecnologia: {2: 2},
      habilidadesEscoteiras: {3: 2},
    },
    requisito: {
      nivelMinimo: 3
    }
  })

  t.is(result, 3/5)
})

test('Calcula percentual para faltando um nivel em seviço', t=> {
  const percentuaisEspecialidades = {
    10: 1
  }
  const ramosConhecimento = {
    servico: { 3: 2 },
    cultura: { 3: 4 },
    habilidadesEscoteiras: { 3: 0},
    desportos: { 3: 0 },
    cienciaTecnologia: {3: 0}
  }

  const result = calcularPercentual({
    requisito: requisitoCordaoDourado,
    percentuais: percentuaisEspecialidades,
    ramosConhecimento
  })

  t.is(result, 0.44)
})
