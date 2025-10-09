import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RecoveryPassword() {
    return (
        <div className="flex bg-(--bg-default) w-full h-dvh justify-center items-center">
            <div className="w-3/4 md:w-1/3" >
                <Card>
                    <CardHeader className="flex justify-center items-center">
                        <CardTitle>Recuperar Senha</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center items-center">
                        <form className="w-full">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <Label>E-mail</Label>
                                    <Input />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Button type="submit" className="bg-(--btn-default) text-(--text-strongGreen) hover:bg-(--btn-default-strong) cursor-pointer lg:text-base">Entrar</Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}