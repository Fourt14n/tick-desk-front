import z from "zod";

export const updatePasswordValidation = z.object({
    oldPassword: z.string("A senha antiga é obrigatória")
    .min(8, "A senha antiga tinha no mínimo 8 caracteres!")
    .nonoptional("A senha antiga é obrigatória!"),

    newPassword: z.string("A nova senha é obrigatória!")
    .min(8, "A nova senha deve ter no mínimo 8 caracteres!")
    .nonoptional("A senha é obrigatória!")
})