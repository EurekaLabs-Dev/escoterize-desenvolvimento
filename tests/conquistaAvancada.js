import test from 'ava'
import R from 'ramda'
import {sumRequisitosSatisfeitos, requisitoSatisfeitoEspecialidade, calculaRamosConhecimentoPC, calcularPercentual, sumPropsValues, conquistaByEspecialidade, sumDoneEspecialidades, calcularProgressaoRamosConhecimento, requisitosSatisfeitosRamoConhecimento} from '../src/conquistaAvancada'


test('Calcula percentual do requisito satisfeito em 100%', t => {
  const result = requisitoSatisfeitoEspecialidade  ({
    percentuais: {
      10: 4/6
    },
    requisitos: {
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
    requisitos: {
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
    requisitos: {
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
  const requisitos = {
    servico: {
      2: 2,
      3: 4
    }
  }
  const result = requisitosSatisfeitosRamoConhecimento({
    niveis,
    requisitos
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
  const requisitos = {
    servico: {
      2: 4,
      3: 8
    }
  }
  const result = requisitosSatisfeitosRamoConhecimento({
    niveis,
    requisitos
  })('servico')

  t.is(result, 0.5)
})


test('Soma percentuais dos requisitos para os ramos de conhecimento', t=> {
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
  const requisitos = {
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
    requisitos
  }, requisitosSatisfeitosRamoConhecimento)
  t.is(result, 0.75)
})

test('Soma percentuais de especialidades que atigiram seus niveis', t => {
  const percentuais = {
    10: 6/12,
    11: 6/9,
    14: 1/9
  }
  const requisitos = {
    10: 2,
    11: 2
  }
  const result = sumRequisitosSatisfeitos(
    {percentuais, requisitos},
    requisitoSatisfeitoEspecialidade
  )
  t.is(result, 0.75)
})


test('Calcula percentual com base no requisito', t=> {
  const requisitoCordaoDourado = {
    quantidadeMinima: 15,
    especialidades: {
      10: 3//primeiro socorros
    },
    ramosConhecimento: {
      servico: {
        3: 3
      }
    }

  }
  const percentuaisEspecialidades = {
    10: 1
  }
  const ramosConhecimento = {
    servico: { 3: 4 },
    cultura: { 3: 4 },
    habilidadesEscoteiras: { 3: 4 },
    servico: { 3: 4 }
  }

  const result = calcularPercentual({
    requisito: requisitoCordaoDourado,
    percentuais: percentuaisEspecialidades,
    ramosConhecimento
  })

  t.is(result, 1)
})

test('Calcula percentual para quando não distribuir em todos os ramos', t=> {
  const requisitoCordaoDourado = {
    quantidadeMinima: 15,
    nivelMinimo: 3,
    especialidades: {
      10: 3
    },
    ramosConhecimento: {
      servico: {
        3: 3
      }
    }

  }
  const percentuaisEspecialidades = {
    10: 1
  }
  const ramosConhecimento = {
    servico: { 3: 4 },
    cultura: { 3: 4 },
    habilidadesEscoteiras: { 3: 0},
    servico: { 3: 0 },
    cienciaTecnologia: {3: 0}
  }

  const result = calcularPercentual({
    requisito: requisitoCordaoDourado,
    percentuais: percentuaisEspecialidades,
    ramosConhecimento
  })

  t.is(result, 0.58)
})
