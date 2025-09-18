import z from "zod";

export const ticketValidation = z.object({
    nomeEnvio: z.string()
    .max(255, "Nome muito longo para envio!")
    .nonempty("Nome para envio não pode ser vazio!")
    .nonoptional("Nome de envio é obrigatório"),

    emailEnvio: z.email("E-mail inválido de envio")
    .nonempty("E-mail de envio não pode ser vazio!")
    .nonoptional("E-mail de envio é obrigatório!"),

    idEquipe: z.uuid()
    .refine((valor) => valor === "0", {
            message: "Selecione uma equipe!"
        })
    .nonoptional("A equipe é obrigatória!"),

    idUsuarioResponsavel: z.uuid()
    .refine((valor) => valor === "0", {
            message: "Selecione um usuário responsável"
        })
    .nonoptional("Usuário responsável é obrigatório!"),

    urgencia: z.int32()
    .nonnegative("Ocorreu um erro desconhecido ao selecionar a urgência")
    .nonoptional("A urgência é obrigatória!"),

    previsaoSolucao: z.date()
    .nonoptional("A previsão de solução é obrigatória!")
    .refine((data) => data < new Date(), {
        message: "A data de previsão de solução não pode ser menor que a data atual!",
    }),

    dataHoraFechamento: z.date()
    .optional(),

    idUsuarioFechamento: z.uuid()
    .optional()
})