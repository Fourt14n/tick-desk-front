import type { LoginCredentials } from "@/pages/Login/Login";
import { toast } from "sonner"
import Cookies from "js-cookie";

const API_URL = "";

interface TokenAnswer{
    access_token: string,
    refresh_token: string,
    expires_in: number
}

function showError(message : any){
    toast.error(message, {
        closeButton: false
    });
}

function Authenticate({email, password} : LoginCredentials){
    // Objeto padrão nulo
    var result : TokenAnswer = {access_token: "", expires_in: 1, refresh_token: ""};
    try{
        fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then((data : TokenAnswer) => data)
    }catch(error){
        showError(error);
    }

    return result;
}

// Essa função vai ser exportada e vai ser usada pra validar a autenticação
export function validateAuth(){
    let tokenCookies = Cookies.get("Token");
    return tokenCookies == "" || tokenCookies == undefined ? false : true;
}

export default function useAuth({email, password} : LoginCredentials, rememberMe : boolean){
    console.log(email);
    console.log(password);

    // Lógica que vai fazer uma requisição pra conseguir puxar e validar o token
    // var tokenResposta = Authenticate({email, password});
    // Cookies.set("Token", tokenResposta.access_token, {expires: tokenResposta.expires_in, path: "/"});

    // if(rememberMe)
    //     Cookies.set("RefreshToken", tokenResposta.refresh_token, {expires: 7, path: "/"});

    // return validateAuth();

    // Por enquanto vou sempre retornar true pra fazer com que seja possível ir pra Home
    return true;
}