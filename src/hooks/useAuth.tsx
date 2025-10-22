import type { LoginCredentials } from "@/pages/Login/Login";
import { showError } from "./useToast";
import { api } from "@/lib/axios";
import useUser from "./useUser";

interface TokenAnswer {
    access_token: string,
    expires_in: number
}

async function Authenticate({ email, password }: LoginCredentials) {
    // Objeto padrão nulo
    var result: TokenAnswer = { access_token: "", expires_in: 0 };
    try {
        await api.post("/api/user/login", {
            email,
            password
        })
            .then((res) => {
                // Se der errado o fetch eu puxo a mensagem de erro
                // Pra então poder mostrar essa mensagem pro usuário
                if (res.status !== 200)
                    showError(res.data.error);

                Object.assign(result, res.data);
            })
            .catch(erro => {
                console.log(erro.response.data.error)
                showError(erro.response.data.error);
            })
    } catch (error) {
        showError(error);
    }

    return result;
}

// Essa função vai ser exportada e vai ser usada pra validar a autenticação
export function validateAuth() {
    let token = sessionStorage.getItem("Token_TickDesk");
    var decoded = useUser(token || "")
    let expiresAt = new Date( decoded.exp * 1000);
    if (token && expiresAt && new Date() < expiresAt) {
        return true;
    } else {
        sessionStorage.removeItem("Token_TickDesk");
        sessionStorage.removeItem("Token_TickDesk_ExpiresAt");
        return false;
    }
}

export default async function useAuth({ email, password }: LoginCredentials, rememberMe: boolean) {
    // Lógica que vai fazer uma requisição pra conseguir puxar e validar o token
    var tokenResposta = await Authenticate({ email, password });
    sessionStorage.setItem("Token_TickDesk", tokenResposta.access_token);

    if (rememberMe)
        localStorage.setItem("Token_TickDesk", tokenResposta.access_token);

    return validateAuth();
}