import z from "zod";

export const ticketValidation = z.object({
    nomeEnvio: z.string("Tipo inválido do nome!")
    .max(255, "Nome muito longo para envio, máximo de 255 caracteres")
    .nonempty("Nome para envio não pode ser vazio!")
    .nonoptional("Nome de envio é obrigatório"),

    tituloTicket: z.string("Tipo inválido do título")
    .max(255, "Nome muito longo do título, máximo de 255 caracteres!")
    .nonempty("Título do ticket não pode ser vazio!")
    .nonoptional("Título do ticket é obrigatório"),

    emailEnvio: z.email("E-mail inválido de envio")
    .nonempty("E-mail de envio não pode ser vazio!")
    .nonoptional("E-mail de envio é obrigatório!"),

    idEquipe: z.uuid("Tipo inválido da equipe!")
    .refine((valor) => valor === "0", {
            message: "Selecione uma equipe!"
        })
    .nonoptional("A equipe é obrigatória!"),

    idUsuarioResponsavel: z.uuid("Tipo inválido do usuário responsável!")
    .refine((valor) => valor === "0", {
            message: "Selecione um usuário responsável"
        })
    .nonoptional("Usuário responsável é obrigatório!"),

    urgencia: z.int32("Tipo inválido da urgência!")
    .nonnegative("Ocorreu um erro desconhecido ao selecionar a urgência")
    .nonoptional("A urgência é obrigatória!"),

    previsaoSolucao: z.date("Tipo inválido da previsão de solução!")
    .nonoptional("A previsão de solução é obrigatória!")
    .refine((data) => data < new Date(), {
        message: "A data de previsão de solução não pode ser menor que a data atual!",
    }),

    dataHoraFechamento: z.date("Tipo inválido da data e hora de fechamento!")
    .optional(),

    idUsuarioFechamento: z.uuid("Tipo inválido do usuário de fechamento!")
    .optional()
})