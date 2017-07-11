import test from 'ava'
import R from 'ramda'
import {percentualEspecialidades, percentualCordao, percentualRequisitoEspecialidade, calcularPercentualDistribuicao, requisitoSatisfeitoEspecialidade, calcularPercentual, percentualRamos} from '../src/requisito'

test('Calcula percentual do requisito da especialidade em 100%', t => {
  const result = percentualRequisitoEspecialidade(4/6, 2)
  t.is(result, 1)
})

test('Calcula percentual do requisito da especialidade em 2/3%', t => {
  const result = percentualRequisitoEspecialidade(4/6, 3)
  t.is(result, 2/3)
})

test('Calcula percentual de especialidades por seu requisito', t => {
  const desenvolvimento = { 10: 8/12, 11: 6/9, 14: 1/9, 15: 1/9 }

  const requisito = {
    nivelMinimo: 2,
    quantidadeMinima: 4
  }

  const result = percentualEspecialidades(requisito, desenvolvimento)
  t.is(result, 0.50)
})

test('Calcula percentual de especialidades utilizando os três maiores percentuais', t => {
  const desenvolvimento = { 10: 1, 11: 1, 14: 1/3, 15: 2/3 }

  const requisito = {
    nivelMinimo: 3,
    quantidadeMinima: 3
  }

  const result = percentualEspecialidades(requisito, desenvolvimento)
  t.is(result, 0.89)
})

const requisitoCordaoDourado = {
  quantidadeMinima: 15,
  nivelMinimo: 3,
  especialidades: [10],
  ramosConhecimento: {
    servico: 3
  }
}

test('Calcula percentual da conquista dos ramos de acordo com requisito', t=> {
  const requisito = {
    quantidadeMinima: 15,
    nivelMinimo: 3
  }
  const desenvolvimento = {
    SERVICOS: { n3: 4 },
    CULTURA: { n3: 4 },
    HABILIDADES_ESCOTEIRAS: { n3: 3},
    DESPORTOS: { n3: 2 },
    CIENCIA_TECNOLOGIA: {n3: 2}
  }
  const result = percentualRamos(requisito, desenvolvimento)
  t.is(result, 1)
})

test('Calcula percentual intermediario da conquista dos ramos de acordo com requisito', t=> {
  const requisito = { quantidadeMinima: 15,
    nivelMinimo: 3
  }
  const desenvolvimento = {
    SERVICOS: { n3: 1 },
    CULTURA: { n3: 1 },
    HABILIDADES_ESCOTEIRAS: { n3: 3},
    DESPORTOS: { n3: 1 },
    CIENCIA_TECNOLOGIA: {n3: 5}
  }

  const result = percentualRamos(requisito, desenvolvimento)
  t.is(result, 0.73)
})

test('Calcula percentual dos ramos sem contar especialidades', t=> {
  const requisito = {
    quantidadeMinima: 15,
    nivelMinimo: 3
  }
  const desenvolvimento = {
    SERVICOS: { n3: 1 },
    CULTURA: { n3: 1 },
    HABILIDADES_ESCOTEIRAS: { n3: 3},
    DESPORTOS: { n3: 1 },
    CIENCIA_TECNOLOGIA: {n3: 5},
    10: 3/10
  }

  const result = percentualRamos(requisito, desenvolvimento)
  t.is(result, 0.73)
})

test('Calcula percentual da distribuição entre os ramos', t => {
  const desenvolvimento = {
    SERVICOS: { n3: 1, total: 1 },
    CULTURA: { n3: 2, total: 2 },
    HABILIDADES_ESCOTEIRAS: { n3: 2, total: 2},
    DESPORTOS: { n3: 0, total: 0 },
    CIENCIA_TECNOLOGIA: {n3: 0, total: 0}
  }
  const result = calcularPercentualDistribuicao(desenvolvimento, 5)

  t.is(result, 3/5)
})

test('Calcula percentual da distribuição entre os ramos. Não pode passar de 100%', t => {
  const desenvolvimento = {
    SERVICOS: { n3: 1, total: 1 },
    CULTURA: { n3: 2, total: 2 },
    HABILIDADES_ESCOTEIRAS: { n3: 2, total: 2},
    DESPORTOS: { n3: 2, total: 2 },
    CIENCIA_TECNOLOGIA: {n3: 0, total: 0}
  }
  const result = calcularPercentualDistribuicao(desenvolvimento, 3)

  t.is(result, 1)
})

test('Calcular percentual para cordão verde e Amarelo em 100%', t=> {
  const requisito = {
    quantidadeMinima: 6,
    nivelMinimo: 1,
  }
  const desenvolvimento = {
    SERVICOS: { n3: 2, total: 2 },
    CULTURA: { n2: 2, total: 2 },
    HABILIDADES_ESCOTEIRAS: { n2: 2, total: 2 },
    DESPORTOS: { n3: 2, total: 2 },
    CIENCIA_TECNOLOGIA: { n3: 2, total: 2 }
  }
  const result = percentualCordao(requisito, desenvolvimento)
  t.is(result, 1)
})

test('Calcular percentual para cordão verde e Amarelo. Sem estar distribuido não pode chegar a 100%', t=> {
  const requisito = {
    quantidadeMinima: 6,
    nivelMinimo: 1,
  }
  const desenvolvimento = {
    SERVICOS: { n3: 0, total: 0 },
    CULTURA: { n2: 4, total: 4 },
    HABILIDADES_ESCOTEIRAS: { n2: 2, total: 2 },
    DESPORTOS: { n3: 0, total: 0 },
    CIENCIA_TECNOLOGIA: { n3: 6, total: 6 }
  }
  const result = percentualCordao(requisito, desenvolvimento)
  t.true(result < 1)
})

test('Calcular percentual para cordão vermelho e branco em 100%', t=> {
  const requisito = {
    quantidadeMinima: 12,
    nivelMinimo: 2,
    especialidades: [10],
    validaServicos: true
  }
  const desenvolvimento = {
    SERVICOS: { n2: 1, n3: 2, total: 3 },
    CULTURA: { n1: 4, n2: 2, total: 2 },
    HABILIDADES_ESCOTEIRAS: { n2: 2, total: 2 },
    DESPORTOS: { n3: 2, total: 2 },
    CIENCIA_TECNOLOGIA: { n3: 2, total: 2 },
    10: 4/6
  }
  const result = percentualCordao(requisito, desenvolvimento)
  t.is(result, 1)
})

test('Calcular percentual para cordão vermelho e branco em parcial', t=> {
  const requisito = {
    quantidadeMinima: 12,
    nivelMinimo: 2,
    especialidades: [10],
    validaServicos: true
  }
  const desenvolvimento = {
    SERVICOS: { n2: 1, n3: 1, total: 2 },
    CULTURA: { n1: 0, n2: 0, total: 0 },
    HABILIDADES_ESCOTEIRAS: { n2: 2, total: 2 },
    DESPORTOS: { n3: 2, total: 2 },
    CIENCIA_TECNOLOGIA: { n3: 2, total: 2 },
    10: 2/6
  }
  const result = percentualCordao(requisito, desenvolvimento)
  t.is(result, 0.69)
})

test('Calcular percentual para cordão do desafio sênior em 100%', t=> {
  const requisito = {
    quantidadeMinima: 8,
    nivelMinimo: 3,
    especialidades: [12,34,44,56,76],//uma é obrigatória
  }
  const desenvolvimento = {
    SERVICOS: { n3: 2, total: 2 },
    CULTURA: { n2: 2, total: 2 },
    HABILIDADES_ESCOTEIRAS: { n2: 2, total: 2 },
    DESPORTOS: { n3: 2, total: 2 },
    CIENCIA_TECNOLOGIA: { n3: 2, total: 2 },
    44: 1
  }
  const result = percentualCordao(requisito, desenvolvimento)
  t.is(result, 1)
})


test('Calcular percentual para cordão dourado em 100%', t=> {
  const requisito = {
    quantidadeMinima: 15,
    nivelMinimo: 3,
    especialidades: [10],
    validaServicos: true
  }
  const desenvolvimento = {
    SERVICOS: { n3: 3, total: 3 },
    CULTURA: { n2: 2, total: 2 },
    HABILIDADES_ESCOTEIRAS: { n1: 4, n2: 2, total: 2 },
    DESPORTOS: { n3: 2, total: 2 },
    CIENCIA_TECNOLOGIA: { n3: 2, total: 2 },
    10: 1
  }
  const result = percentualCordao(requisito, desenvolvimento)
  t.is(result, 1)
})


test('Não pode chegar a 100% sem 3 esps. no serviço', t=> {
  const requisito = {
    quantidadeMinima: 15,
    nivelMinimo: 3,
    especialidades: [10],
    validaServicos: true
  }
  const desenvolvimento = {
    SERVICOS: { n3: 2, n2: 10, total: 3 },
    CULTURA: { n2: 2, total: 2 },
    HABILIDADES_ESCOTEIRAS: { n1: 4, n2: 2, total: 2 },
    DESPORTOS: { n3: 2, total: 2 },
    CIENCIA_TECNOLOGIA: { n3: 2, total: 2 },
    10: 1
  }
  const result = percentualCordao(requisito, desenvolvimento)
  t.is(result, 0.95)
})


