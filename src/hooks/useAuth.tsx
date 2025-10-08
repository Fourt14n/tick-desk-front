import type { LoginCredentials } from "@/pages/Login/Login";
import { showError } from "./useToast";
import { api } from "@/lib/axios";

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
function validateAuth() {
    console.log("Veio validar")
    let token = sessionStorage.getItem("Token_TickDesk");
    let expiresAt = sessionStorage.getItem("Token_TickDesk_ExpiresAt");
    if (token && expiresAt && Date.now() < parseInt(expiresAt)) {
        return true;
    } else {
        sessionStorage.removeItem("Token_TickDesk");
        sessionStorage.removeItem("Token_TickDesk_ExpiresAt");
        return false;
    }
}

export default async function useAuth({ email, password }: LoginCredentials, rememberMe: boolean) {
    console.log(email);
    console.log(password);

    // Lógica que vai fazer uma requisição pra conseguir puxar e validar o token
    var tokenResposta = await Authenticate({ email, password });
    console.log(tokenResposta)
    sessionStorage.setItem("Token_TickDesk", tokenResposta.access_token);
    const expiresAt = Date.now() + (tokenResposta.expires_in * 1000);
    sessionStorage.setItem("Token_TickDesk_ExpiresAt", expiresAt.toString());

    if (rememberMe)
        localStorage.setItem("Token_TickDesk", tokenResposta.access_token);

    return validateAuth();
}