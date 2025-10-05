import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("E-mail com formato inválido!")
            .nonoptional("E-mail é obrigatório!"),

    password: z.string("Formato de texto inválido da senha!")
            .nonempty("A senha é obrigatória!")
            .min(8, "A senha precisa ter no mínimo 8 caracteres!")
})