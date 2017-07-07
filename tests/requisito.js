import test from 'ava'
import R from 'ramda'
import {percentualEspecialidades, percentualRequisitoEspecialidade, calcularPercentualDistribuicao, requisitoSatisfeitoEspecialidade, calcularPercentual, calcularPercentualRamos} from '../src/requisito'

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
    quantidade: 4
  }

  const result = percentualEspecialidades(requisito, desenvolvimento)
  t.is(result, 0.50)
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
  const result = calcularPercentualRamos(requisito, desenvolvimento)
  t.is(result, 1)
})

test('Calcula percentual intermediario da conquista dos ramos de acordo com requisito', t=> {
  const requisito = {
    quantidadeMinima: 15,
    nivelMinimo: 3
  }
  const desenvolvimento = {
    SERVICOS: { n3: 1 },
    CULTURA: { n3: 1 },
    HABILIDADES_ESCOTEIRAS: { n3: 3},
    DESPORTOS: { n3: 1 },
    CIENCIA_TECNOLOGIA: {n3: 5}
  }

  const result = calcularPercentualRamos(requisito, desenvolvimento)
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

  const result = calcularPercentualRamos(requisito, desenvolvimento)
  t.is(result, 0.73)
})

test('Calcula percentual da distribuição entre os ramos', t => {
  const requisito = {
    quantidadeMinima: 15,
    nivelMinimo: 3
  }
  const desenvolvimento = {
    SERVICOS: { n3: 1, total: 1 },
    CULTURA: { n3: 2, total: 2 },
    HABILIDADES_ESCOTEIRAS: { n3: 2, total: 2},
    DESPORTOS: { n3: 0, total: 0 },
    CIENCIA_TECNOLOGIA: {n3: 0, total: 0}
  }
  const result = calcularPercentualDistribuicao(requisito, desenvolvimento)

  t.is(result, 3/5)
})

test('Calcula percentual faltando um nivel em seviço', t=> {
  const desenvolvimento = {
    SERVICOS: { n3: 2, total: 2 },
    CULTURA: { n3: 4, total: 4 },
    HABILIDADES_ESCOTEIRAS: { n3: 0, total: 0},
    DESPORTOS: { n3: 0, total: 0 },
    CIENCIA_TECNOLOGIA: {n3: 0, total: 0},
    10: 1
  }
  const result = calcularPercentual(requisitoCordaoDourado, desenvolvimento)
  t.is(result, 0.43)
})

test('Calcula percentual de uma conquista com base no requisito', t=> {
  const desenvolvimento = {
    SERVICOS: { n3: 4, total: 4 },
    CULTURA: { n3: 4, total: 4 },
    HABILIDADES_ESCOTEIRAS: { n3: 3, total: 3 },
    DESPORTOS: { n3: 3, total: 3 },
    CIENCIA_TECNOLOGIA: { n3: 1, total: 1 },
    10: 1
  }
  const result = calcularPercentual(requisitoCordaoDourado, desenvolvimento)
  t.is(result, 1)
})


test('Calcula percentual para quando não distribuir em todos os ramos', t=> {
  const desenvolvimento = {
    SERVICOS: { n3: 4, total: 4 },
    CULTURA: { n3: 4, total: 4 },
    HABILIDADES_ESCOTEIRAS: { n3: 0, total: 0 },
    DESPORTOS: { n3: 0, total: 0 },
    CIENCIA_TECNOLOGIA: { n3: 0, total: 0 },
    10: 1
  }
  const result = calcularPercentual(requisitoCordaoDourado, desenvolvimento)
  t.is(result, 0.54)
})

test('Calcular percentual para cordão do desafio sênior em 100%', t=> {
  const requisito = {
    quantidadeMinima: 8,
    nivelMinimo: 4,
    especialidades: [12,34,44,56,76]//uma é obrigatória
  }
  const desenvolvimento = {
    SERVICOS: { n3: 2, total: 2 },
    CULTURA: { n2: 2, total: 2 },
    HABILIDADES_ESCOTEIRAS: { n2: 2, total: 2 },
    DESPORTOS: { n3: 2, total: 2 },
    CIENCIA_TECNOLOGIA: { n3: 2, total: 2 }
  }
  const result = calcularPercentual(requisito, desenvolvimento)
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
    SERVICOS: { n3: 2, total: 2 },
    CULTURA: { n2: 2, total: 2 },
    HABILIDADES_ESCOTEIRAS: { n2: 2, total: 2 },
    DESPORTOS: { n3: 2, total: 2 },
    CIENCIA_TECNOLOGIA: { n3: 2, total: 2 }
  }
  const result = calcularPercentual(requisito, desenvolvimento)
  t.is(result, 1)
})

test('Calcular percentual para cordão verde e Amarelo em 100%', t=> {
  const requisito = {
    quantidadeMinima: 6
  }
  const desenvolvimento = {
    SERVICOS: { n3: 2, total: 2 },
    CULTURA: { n2: 2, total: 2 },
    HABILIDADES_ESCOTEIRAS: { n2: 2, total: 2 },
    DESPORTOS: { n3: 2, total: 2 },
    CIENCIA_TECNOLOGIA: { n3: 2, total: 2 }
  }
  const result = calcularPercentual(requisito, desenvolvimento)
  t.is(result, 1)
})


test('Calcular percentual para cordão vermelho e branco em 100%', t=> {
  const requisito = {
    quantidadeMinima: 12,
    nivelMinimo: 2,
    especialidades: [10],
    validaServicos: true
  }
  const desenvolvimento = {
    SERVICOS: { n3: 2, total: 2 },
    CULTURA: { n2: 2, total: 2 },
    HABILIDADES_ESCOTEIRAS: { n2: 2, total: 2 },
    DESPORTOS: { n3: 2, total: 2 },
    CIENCIA_TECNOLOGIA: { n3: 2, total: 2 }
  }
  const result = calcularPercentual(requisito, desenvolvimento)
  t.is(result, 1)
})

