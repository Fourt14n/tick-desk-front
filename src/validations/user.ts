import z from "zod";

export const userValidation = z.object({
    name: z.string("O nome do usuário não pode ser vazio!")
    .nonempty("O nome do usuário não pode ser vazio!")
    .max(255, "O nome do usuário precisar ter até 255 caracteres!")
    .nonoptional("O nome do usuário é obrigatório!"),

    username: z.string("O apelido não pode ser vazio")
    .nonempty("O apelido não pode ser vazio")
    .max(60, "O máximo do apelido do usuário é de 60 caracteres!")
    .nonoptional("O apelido do usuário é obrigatório!"),

    email: z.email("O e-mail precisa ser válido!")
    .nonempty("O email é obrigatório!")
    .max(255, "O email pode ter no máximo 255 caracteres!"),

    password: z.string("A senha não pode ser vazia!")
    .min(8, "A senha precisa ter no mínimo 8 caracteres!")
    .max(255, "A senha pode ter no máximo 255 caracteres!"),
    
    role: z.string("O tipo de usuário é obrigatório!")
    .refine(valor => valor != "", {
        message: "O tipo de usuário é obrigatório!"
    }),

    teamId: z.int32("A equipe é obrigatória!")
    .refine(valor => valor != 0, {
        message: "A equipe é obrigatória!"
    })
});