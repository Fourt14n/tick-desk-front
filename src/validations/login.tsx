import { nonoptional, z  } from "zod";

export const loginSchema = z.object({
    email: z.email("E-mail inválido!")
            .nonoptional("E-mail é obrigatório!"),
    password: z.string()
            .nonempty("A senha é obrigatória!")
            .min(8, "Senha inválida!")
            .nonoptional()
})