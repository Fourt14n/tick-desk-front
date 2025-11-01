import z, { nonoptional } from "zod";

const businessValidation = z.object({
    email: z.email("E-mail inválido!")
    .nonoptional("O e-mail é obrigatório!"),

    corporateName: z.string("A razão social é obrigatória!")
    .nonoptional("A razão social é obrigatória!"),

    fantasyName: z.string("O nome fantasia é obrigatório!")
    .nonoptional("O nome fantasia é obrigatório!"),

    cnpj: z.string("O CNPJ é um campo obrigatório!")
    .nonoptional("O CNPJ é obrigatório!"),

    phone: z.string("O telefone da empresa é um campo obrigatório!")
    .max(15, "O telefone pode ter no máximo 15 caracteres")
    .nonoptional("O telefone é um campo obrigatório!"),
})