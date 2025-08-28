import type { LoginCredentials } from "@/pages/Login/Login";
import { useState } from "react";
import { toast } from "sonner"

const API_URL = "";

function showError(message : any){
    toast.error(message, {
        closeButton: false
    });
}

function Authenticate({email, password} : LoginCredentials){
    var result = "";
    try{
        fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        result = data.access_token;

    })
    }catch(error){
        showError(error);
    }

    return result;
}

// Essa função vai ser exportada e vai ser usada pra validar a autenticação
export function validateAuth(){
    let tokenLocalStorage = localStorage.getItem("TOKEN");
    return tokenLocalStorage == "" || tokenLocalStorage == undefined ? false : true;
}

export default function useAuth({email, password} : LoginCredentials){
    console.log(email);
    console.log(password);

    // Lógica que vai fazer uma requisição pra conseguir puxar e validar o token

    // const [token, setToken] = useState("");
    // var tokenResposta = Authenticate({email, password});
    // setToken(tokenResposta);
    // localStorage.setItem("TOKEN", token);
    // return validateAuth();

    // Por enquanto vou sempre retornar true pra fazer com que seja possível ir pra Home
    return true;
}