import { Link, useNavigate } from "react-router";
import loginLogo from "@/assets/loginLogo.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, type ChangeEvent } from "react";
import useAuth from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export interface LoginCredentials {
    email: string,
    password: string
}

const handleInputChange = (event : ChangeEvent<HTMLInputElement>, setInput : React.Dispatch<React.SetStateAction<string>>) => {
    setInput(event.target.value);
}
// Regex que eu peguei na net pra validar email
const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateEmail(email : string){
    return emailRegex.test(email);
}

export default function Login() {
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [password, setPassword] = useState("");
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    function handleLogin() {

        console.log(rememberMe)

        if(!validateEmail(email)){
            setIsValidEmail(false);
            toast.error("Digite um e-mail válido!");
            event?.preventDefault();
            return false;
        }
        
        if(password.trim() == ""){
            setIsValidPassword(false);
            console.log(isValidPassword)
            toast.error("Digite uma senha válida!");
            event?.preventDefault();
            return false;
        }

        let auth = useAuth({email, password}, rememberMe);

        if(auth)
            navigate("/Home");
    }


    return (
        <main className="flex flex-1 bg-(--bg-default)">
            <Toaster position="top-right" richColors={true} />
            <div className="logoContainer hidden xl:flex flex-1 justify-center items-center h-screen bg-gradient-to-r from-[#00ff629f] to-(--bg-default)">
                <img className="w-2/5 lg:w-3/4" src={loginLogo} alt="" />
            </div>
            <div className="loginContainer h-screen flex flex-2 justify-center items-center md:flex-2 lg:flex-1 xl:flex-2">
                <Card className="flex justify-around md:w-2/3 md:py-20 lg:w-2/3 lg:py-16">
                    <CardHeader>
                        <CardTitle className="font-display font-weight-regular text-lg xl:text-2xl md:text-xl flex justify-center">
                            Faça seu login.
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-items-start items-center w-full lg:justify-center">
                        <form className="w-full grid gap-6 lg:w-4/5" >
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label className="font-display font-weight-regular text-lg lg:text-xl" htmlFor="email">E-mail</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Digite aqui o seu e-mail"
                                        className={`text-sm lg:text-base ${!isValidEmail && "border-red-500"}`}
                                        value={email}
                                        onChange={(event) => {
                                            handleInputChange(event, setEmail);
                                            setIsValidEmail(true);
                                        }}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label className="font-display font-weight-regular text-lg lg:text-xl" htmlFor="password">Senha</Label>
                                    </div>
                                    <Input 
                                    className={`text-sm lg:text-base ${!isValidPassword && "border-red-500"}`} 
                                    placeholder="**********" 
                                    id="password" 
                                    type="password"
                                    value={password}
                                    onChange={(event) => {
                                        handleInputChange(event, setPassword);
                                        setIsValidPassword(true);
                                    }}
                                    required />
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 underline hover:text-(--grey)"
                                    >
                                        Esqueceu a senha?
                                    </a>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Button onClick={handleLogin} className="bg-(--btn-default) text-(--text-strongGreen) hover:bg-(--btn-default-strong) cursor-pointer lg:text-base">Entrar</Button>
                                </div>
                                <div className="flex gap-2">
                                    <Checkbox checked={rememberMe} onCheckedChange={() => setRememberMe(!rememberMe)} id="rememberPassword" />
                                    <Label htmlFor="rememberPassword" className="lg:text-sm">Lembrar de mim</Label>
                                </div>
                            </div>
                            <span className="text-xs lg:text-sm text-center">É novo aqui? Cote a melhor opção para a sua empresa <Link className="text-[#23D400]" to={"https://google.com"} >Aqui</Link></span>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}