import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { onError } from "@/hooks/onError";
import { showError, showSucces } from "@/hooks/useToast";
import { api } from "@/lib/axios";
import { sendMailRecoveryPassword } from "@/validations/sendMailRecoveryPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type z from "zod";

type SendMailRecoveryPassword = z.infer<typeof sendMailRecoveryPassword>

export default function RecoveryPassword() {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {isValid, isSubmitting}} = useForm({
        resolver: zodResolver(sendMailRecoveryPassword)
    })

    function SendMailRecovery(data : SendMailRecoveryPassword){
        api.post("api/reset-password/forgot", data)
        .then(res => {
            showSucces(res.data)
            setTimeout(() => navigate("/Login"), 3000);
        })
        .catch(erro => showError(erro.response.data.error));
    }

    function OnSubmit(data : SendMailRecoveryPassword){
        if(isValid){
            SendMailRecovery(data);
        }
    }

    return (
        <div className="flex bg-(--bg-default) w-full h-dvh justify-center items-center">
            <div className="w-3/4 md:w-1/3" >
                <Card>
                    <CardHeader className="flex justify-center items-center">
                        <CardTitle>Recuperar Senha</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center items-center">
                        <form onSubmit={handleSubmit(OnSubmit, onError)} className="w-full">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <Label>E-mail</Label>
                                    <Input {...register("email")} type="mail" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Button disabled={isSubmitting} type="submit" className="bg-(--btn-default) text-(--text-strongGreen) hover:bg-(--btn-default-strong) cursor-pointer lg:text-base">Recuperar Senha</Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}