import z from "zod";

export const ticketValidation = z.object({
    // Vai ficar pro usuário externo, depois olhamos melhor
    // nomeEnvio: z.string("O nome de envio não pode ser vazio!")
    // .max(255, "Nome muito longo para envio, máximo de 255 caracteres")
    // .nonempty("Nome para envio não pode ser vazio!")
    // .nonoptional("Nome de envio é obrigatório"),

    title: z.string("O título não pode ser vazio")
    .max(255, "Nome muito longo do título, máximo de 255 caracteres!")
    .nonempty("Título do ticket não pode ser vazio!")
    .nonoptional("Título do ticket é obrigatório"),

    // Vai ficar pro usuário externo, depois olhamos melhor
    // emailEnvio: z.email("O e-mail não pode ser vazio!")
    // .nonempty("E-mail de envio não pode ser vazio!")
    // .nonoptional("E-mail de envio é obrigatório!"),

    teamId: z.string("Selecione uma equipe!")
    .refine((valor) => valor === "0", {
            message: "Selecione uma equipe!"
        })
    .nonoptional("A equipe é obrigatória!"),

    userResponsavelId: z.string("Selecione um usuário responsável!")
    .refine((valor) => valor === "0", {
            message: "Selecione um usuário responsável"
        })
    .nonoptional("Usuário responsável é obrigatório!"),

    urgency: z.string("Selecione uma urgência!")
    .nonoptional("A urgência é obrigatória!"),

    // Tá sendo definido pelo back
    // previsaoSolucao: z.date("A previsão de solução é obrigatória!")
    // .nonoptional("A previsão de solução é obrigatória!")
    // .refine((data) => data < new Date(), {
    //     message: "A data de previsão de solução não pode ser menor que a data atual!",
    // }),

    dataHoraFechamento: z.date("Tipo inválido da data e hora de fechamento!")
    .optional(),

    idUsuarioFechamento: z.uuid("Tipo inválido do usuário de fechamento!")
    .optional()
})