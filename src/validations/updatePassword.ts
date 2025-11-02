import z from "zod";

export const updatePasswordValidation = z.object({
    oldPassword: z.string("A senha antiga é obrigatória")
    .min(8, "A senha antiga tinha no mínimo 8 caracteres!")
    .nonoptional("A senha antiga é obrigatória!"),

    newPassword: z.string("A nova senha é obrigatória!")
    .min(8, "A nova senha deve ter no mínimo 8 caracteres!")
    .nonoptional("A senha é obrigatória!")
})

export const forgotPassword = z.object({
    newPassword: z.string("A senha precisa ser válida!")
    .min(8, "A senha precisa ter no mínimo 8 caracteres!")
    .max(30, "A senha pode ter no máximo 30 caracters")
    .nonempty("A senha é obrigatória!")
    .nonoptional("A senha é obrigatória!"),

    confirmPassword: z.string("As senhas precisam coincidir!")
    .nonempty("A senha é obrigatória!"),

    token: z.string("Não foi possível identificar a solicitação de recuperação de senha, abra o link novamente!")
    .nonempty("Não foi possível identificar a solicitação de recuperação de senha, abra o link novamente!")
    .nonoptional("Não foi possível identificar a solicitação de recuperação de senha, abra o link novamente!")
    
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas devem coincidir!",
    path: ["confirmPassword"]
})