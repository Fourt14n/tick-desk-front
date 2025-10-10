import z from "zod";

export const sendMailRecoveryPassword = z.object({
    email: z.email("E-mail inválido!")
    .nonoptional("O e-mail é obrigatório!")
})