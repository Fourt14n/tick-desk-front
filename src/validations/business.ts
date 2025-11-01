import z from "zod";

const businessValidation = z.object({
    email: z.email("E-mail inválido!")
    .nonoptional("O e-mail é obrigatório!"),

    corporateName: z.string("A razão social é obrigatória!")
})