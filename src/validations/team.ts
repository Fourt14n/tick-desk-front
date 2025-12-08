import z from "zod";

export const team = z.object({
    name: z.string("O nome não pode ser vazio!")
    .min(5, "O nome da equipe precisa de no mínimo 5 caracteres!")
    .max(30, "O nome da equipe pode ter até 30 caracteres máximos!")
    .nonempty("O nome não pode ser vazio!")
    .nonoptional("O nome é obrigatório!"),

    enterpriseId: z.string("O time precisa estar vinculado a uma empresa!")
    .nonoptional("O time precisa estar vinculado a uma empresa!")
})