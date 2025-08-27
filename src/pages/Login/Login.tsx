import { Link, useNavigate } from "react-router";
import loginLogo from "@/assets/loginLogo.png";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function Login() {
    const navigate = useNavigate();

    function handleLogin() {
        navigate("/Home");
    }

    return (
        <main className="flex flex-1">
            <div className="logoContainer hidden md:flex flex-1 justify-center items-center h-screen">
                <img src={loginLogo} alt="" />
            </div>
            <div className="loginContainer h-screen flex flex-2 justify-center items-center">
                <Card className="flex w-11/12 justify-around">
                    <CardHeader>
                        <CardTitle className="font-display font-weight-regular text-lg flex justify-center">
                            Faça seu login.
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-items-start items-center w-full">
                        <form className="w-full grid gap-6">
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label className="font-display font-weight-regular text-lg" htmlFor="email">E-mail</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Digite aqui o seu e-mail"
                                        className="text-sm"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label className="font-display font-weight-regular text-lg" htmlFor="password">Senha</Label>
                                    </div>
                                    <Input className="text-sm" placeholder="**********" id="password" type="password" required />
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 underline hover:text-(--text-grey)"
                                    >
                                        Esqueceu a senha?
                                    </a>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Button className="bg-(--btn-default) text-(--text-strongGreen) hover:bg-(--btn-default-strong) cursor-pointer">Entrar</Button>
                                </div>
                                <div className="flex gap-2">
                                    <Checkbox id="rememberPassword" />
                                    <Label htmlFor="rememberPassword">Lembrar de mim</Label>
                                </div>
                            </div>
                            <span className="text-xs text-center">É novo aqui? Cote a melhor opção para a sua empresa <Link className="text-[#23D400]" to={"https://google.com"} >Aqui</Link></span>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}