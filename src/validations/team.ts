import z from "zod";

export const team = z.object({
    name: z.string("O nome não pode ser vazio!")
    .nonempty("O nome não pode ser vazio!")
    .nonoptional("O nome é obrigatório!"),

    enterpriseId: z.int32("O time precisa estar vinculado a uma empresa!")
    .nonoptional("O time precisa estar vinculado a uma empresa!")
})