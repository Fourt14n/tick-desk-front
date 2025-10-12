import type { LoginCredentials } from "@/pages/Login/Login";
import { showError } from "./useToast";
import { api } from "@/lib/axios";
import useUser from "./useUser";
import { useUserInfo } from "@/store/UserInfosStore";
import { useNavigate } from "react-router";

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
    console.trace("Veio validar");
    let token = sessionStorage.getItem("Token_TickDesk");
    console.log(sessionStorage.getItem("Token_TickDesk_ExpiresAt"))
    var decoded = useUser(token || "")
    let expiresAt = new Date( decoded.exp * 1000);
    console.log(token)
    console.log(expiresAt)
    if (token && expiresAt && new Date() < expiresAt) {
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
    const expiresAt = tokenResposta.expires_in;
    sessionStorage.setItem("Token_TickDesk_ExpiresAt", expiresAt.toString());

    if (rememberMe)
        localStorage.setItem("Token_TickDesk", tokenResposta.access_token);

    console.log("Antes de ir pro validate")
    return validateAuth();
}

export function DisconnectUser() {
        const {clearUser} = useUserInfo();
        const navigate = useNavigate();
        sessionStorage.removeItem("Token_TickDesk");
        clearUser();
        navigate("/Login");
    }