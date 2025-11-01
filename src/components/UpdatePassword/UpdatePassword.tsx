import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { updatePasswordValidation } from "@/validations/updatePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { onError } from "@/hooks/onError";
import type z from "zod";
import { useImperativeHandle, useRef } from "react";
import { api } from "@/lib/axios";
import { UserInfo } from "@/store/UserInfosStore";
import { showError, showSucces } from "@/hooks/useToast";

type updatePassword = z.infer<typeof updatePasswordValidation>;

type Props = {
    close: () => void
}

export default function UpdatePassword({close} : Props){
    const {user} = UserInfo();

    const {handleSubmit, register, formState: {isSubmitting}} = useForm({
        resolver: zodResolver(updatePasswordValidation)
    });


    function UpdateFirstPassword(data : updatePassword){
        api.put(`api/user/update-password/${user?.id}`, data)
        .then(() => {
            showSucces("Senha alterada com sucesso!");
            sessionStorage.setItem("FirstAccess_TickDesk", "false");
            close();
        })
        .catch(erro => showError(erro.response.data.error))
    }

    return (
        <form onSubmit={handleSubmit(UpdateFirstPassword, onError)}>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                    <Label htmlFor="txtOldPassword">Senha antiga</Label>
                    <Input type="password" disabled={isSubmitting} {...register("oldPassword")} />
                </div>
                <div className="flex flex-col gap-3">
                    <Label htmlFor="txtNewPassword">Nova senha</Label>
                    <Input type="password" disabled={isSubmitting} {...register("newPassword")}/>
                </div>
            </div>
            <button id="btnEnviarTeste" style={{display: "none"}} type="submit">Teste</button>
        </form>
    )
}