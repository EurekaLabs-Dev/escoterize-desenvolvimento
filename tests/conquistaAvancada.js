import test from 'ava'
import R from 'ramda'
import {requisitoSatisfeitoEspecialidade, calculaRamosConhecimentoPC, calcularPercentual, sumPropsValues, conquistaByEspecialidade, sumDoneEspecialidades, calcularProgressaoRamosConhecimento, requisitosSatisfeitosRamoConhecimento} from '../src/conquistaAvancada'


test.only('Calcula percentual do requisito satisfeito em 100%', t => {
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

test.only('Percentual não pode passar de 100%', t => {
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

test.only('Calcula percentual do requisito satisfeito em 50%', t => {
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

test.only('Calcula percentual de especialidades que atigiram seus niveis', t => {
  const percentuais = {
    10: 6/12,
    11: 6/9,
    14: 1/9
  }
  const requisitos = {
    10: 2,
    11: 2
  }
  const result = sumDoneEspecialidades({percentuais, requisitos})
  t.is(result, 0.75)
})

test.only('Calcula perncentual de 100% atingido nos ramos de conhecimento', t => {
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

test.only('Calcula perncentual de 50% atingido nos ramos de conhecimento', t => {
  const niveis = {
    servico: {
      1: 0,
      2: 2,
      3: 4
    }
  }
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

test('Cria evento de ganho de conquista', t => {
  const oldPercentuais = {
    10: 2/9,
    25: 6/9
  }
  const newPercentuais = {
    10: 3/9,
    25: 6/9
  }
  const newRamosConhecimento = {
    SERVICO: 2
  }
  const oldRamosConhecimento = {
    SERVICO: 2
  }
  const requisitos = {
    especialidade: {
      10: 1,
      25: 2
    },
    ramosConhecimento: {
      SERVICO: 2
    },
    payload: {}
  }
  const result = conquistaByEspecialidade({
    oldPercentuais,
    newPercentuais,
    oldRamosConhecimento,
    newRamosConhecimento,
    requisitos
  })

  t.deepEqual(result, {
    type: 'REACHED',
    payload: {}
  })
})
