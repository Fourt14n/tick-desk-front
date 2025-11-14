import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { onError } from "@/hooks/onError";
import { showError, showSucces } from "@/hooks/useToast";
import { api } from "@/lib/axios";
import { forgotPassword } from "@/validations/updatePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import type z from "zod";

type ResetPassword = z.infer<typeof forgotPassword>;

export default function ChangePassword() {
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();
    const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm({
        resolver: zodResolver(forgotPassword)
    })

    setValue("token", queryParams.get("TKRS") || "");

    async function OnSubmit(data: ResetPassword) {
        await api.post(`api/reset-password/reset`, data)
            .then((res) => {
                showSucces(res.data);
                navigate("/Login");
            })
            .catch(erro => showError(erro.response.data.error))
    }

    return (
        <div className="flex bg-(--bg-default) w-full h-dvh justify-center items-center">
            <div className="w-3/4 md:w-1/3" >
                <Card>
                    <CardHeader className="flex justify-center items-center">
                        <CardTitle>Alteração de Senha</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center items-center">
                        <form onSubmit={handleSubmit(OnSubmit, onError)} className="w-full">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <Label>Nova Senha</Label>
                                    <Input {...register("newPassword")} type="password" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>Confirme sua senha</Label>
                                    <Input {...register("confirmPassword")} type="password" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Button disabled={isSubmitting} type="submit" className="bg-(--btn-default) text-(--text-strongGreen) hover:bg-(--btn-default-strong) cursor-pointer lg:text-base">Alterar Senha</Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}