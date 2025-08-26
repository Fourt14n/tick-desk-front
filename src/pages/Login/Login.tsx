import { Link, useNavigate } from "react-router";
import loginLogo from "@/assets/loginLogo.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
            <div className="loginContainer flex flex-2 justify-center items-center">
                <Card className="flex w-10/12">
                    <CardHeader>
                        <CardTitle>
                            Faça seu login.
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a
                                            href="#"
                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <Input id="password" type="password" required />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}