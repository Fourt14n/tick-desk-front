import z from "zod";

export const ticketValidation = z.object({    
    title: z.string("O título não pode ser vazio")
    .max(255, "Nome muito longo do título, máximo de 255 caracteres!")
    .nonempty("Título do ticket não pode ser vazio!")
    .nonoptional("Título do ticket é obrigatório"),


    teamId: z.string("Selecione uma equipe!")
    .refine((valor) => valor !== "0", {
            message: "Selecione uma equipe!"
        })
    .nonoptional("A equipe é obrigatória!"),

    userResponsavelId: z.string("Selecione um usuário responsável!")
    .refine((valor) => valor !== "0", {
            message: "Selecione um usuário responsável"
        }),

    urgency: z.string("Selecione uma urgência!")
    .nonoptional("A urgência é obrigatória!"),

    // Tá sendo definido pelo back
    previsaoSolucao: z.date("A previsão de solução precisa ser válida!").optional()
    .refine((data) => data && data > new Date(), {
        message: "A data de previsão de solução não pode ser menor que a data atual!",
    }),

    status: z.boolean("O status do chamado precisa ser booleano")
    ,

    dataHoraFechamento: z.date("Tipo inválido da data e hora de fechamento!")
    .optional(),

    idUsuarioFechamento: z.uuid("Tipo inválido do usuário de fechamento!")
    .optional()
})