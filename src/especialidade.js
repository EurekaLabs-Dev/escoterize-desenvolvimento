export const nivelEspecialidade = (count, total) =>
  nivelEspecialidadeFromPC(count / total)

export const nivelEspecialidadeFromPC = pc =>
  Math.trunc(pc / (1/3))


