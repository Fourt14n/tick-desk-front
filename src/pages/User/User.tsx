import { Dropdown, type DropDownValues } from "@/components/Dropdown/Dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { onError } from "@/hooks/onError";
import usePermission, { PermissionsRoles } from "@/hooks/usePermission";
import { showError, showSucces } from "@/hooks/useToast";
import { api } from "@/lib/axios";
import { EAction, type Action } from "@/types/EAction/EAction";
import type { ResponseUser } from "@/types/ResponseUser/ResponseUser";
import { userValidation } from "@/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import type z from "zod";


type UserRegister = z.infer<typeof userValidation>;

export default function User({action} : Action) {
    const [userInfos, setUserInfos] = useState<ResponseUser>();
    const navigate = useNavigate();
    let { id = '' } = useParams();
    const [teams, setTeams] = useState<DropDownValues[]>([]);
    const { register, handleSubmit, control, formState: { isValid } } = useForm<UserRegister>({
        resolver: zodResolver(userValidation),
        defaultValues: {
            teamId: 0,
            role: "CLIENT"
        }
    });
    function RegisterUser(user : UserRegister) {
        api.post("api/user/register", user)
            .then(res => res.data)
            .catch(erro => {
                showError(erro.response.data.error)
            })
    }

    async function SelectUser(){
        api.get(`api/user/get/${id}`)
        .then(res => {
            console.log(res.data)
            setUserInfos(res.data);
        }).catch(erro => {
            showError(erro.response.data.error);
        })
    }

    function OnSubmit(data : UserRegister) {
        if (isValid) {
            console.log(data)
            RegisterUser(data);
            showSucces("Usuário criado com sucesso!");
            setTimeout(() => navigate("/Listagem/Users"), 3000); // Redireciona para a tela de listagem de usuários
        }
    }

    // Aqui precisa ser hardcoded porque os tipos são definidos por nós mesmos
    const tiposUser = [{
        label: "Gerente",
        value: "GERENT"
    }, {
        label: "Suporte",
        value: "SUPORT"
    }, {
        label: "Cliente",
        value: "CLIENT"
    }
    ]

    // Valido permissão para criar um novo usuário ADMIN
    usePermission({ minPermission: PermissionsRoles.ADMIN }) && tiposUser.push({
        label: "Admin",
        value: "ADMIN"
    })

    useEffect(() => {
        if(action === EAction.UPDATE){
            SelectUser();
        }
    }, [])

    return (
        <div className="flex h-full w-full">
            <ScrollArea className="w-full h-full p-4">
                <div className="flex flex-col w-full">
                    <div className="flex flex-col justify-center">
                        <p className="text-(--text-strongGreen) font-bold">Cadastro de usuário</p>
                        <Separator className="bg-[#BAB9B9]" orientation="horizontal" />
                    </div>
                </div>
                <form onSubmit={handleSubmit(OnSubmit, onError)} className="flex h-full w-full flex-col justify-evenly lg:justify-between pt-4 lg:py-10">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4 lg:flex-row">
                            <div className="flex flex-col lg:w-1/2 gap-2">
                                <Label htmlFor="txtName">Nome</Label>
                                <Input {...register("name")} maxLength={255} className="text-sm" placeholder="Nome completo" type="text" id="txtName" value={userInfos?.name} />
                            </div>
                            <div className="flex flex-col lg:w-1/2 gap-2">
                                <Label htmlFor="txtUsername">Apelido</Label>
                                <Input {...register("username")} maxLength={255} className="text-sm" placeholder="Digite um apelido para o usuário" type="mail" id="txtUsername" value={userInfos?.username} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 lg:flex-row">
                            <div className="flex flex-col w-full lg:w-1/2 gap-2">
                                <Label htmlFor="txtEmail">E-mail</Label>
                                <Input {...register("email")} maxLength={255} className="text-sm" placeholder="Digite seu email" type="mail" id="txtEmail" value={userInfos?.email}/>
                            </div>
                            <div className="flex flex-col w-full gap-2 lg:w-1/2">
                                <Label htmlFor="txtPassword">Senha</Label>
                                <Input {...register("password")} maxLength={255} className="text-sm" placeholder="Digite sua senha" type="password" id="txtPassword" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 lg:flex-row">
                            <div className="flex flex-col lg:w-1/2 gap-2">
                                <Dropdown dados={{ keyDropdown: "cmbTipoUsuario", values: tiposUser, label: "Tipo de usuário", control: control, name: "role", defaultValue:userInfos?.role }} />
                            </div>
                            <div className="flex flex-col lg:w-1/2 gap-2">
                                <Dropdown dados={{ keyDropdown: "cmbEquipe", values: teams, label: "Equipe", control: control, name: "teamId", defaultValue: userInfos?.team.id }} />
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full justify-end gap-2 flex-col py-2 lg:flex-row">
                        <Button type="submit" className="bg-(--weakGreen) w-full lg:w-42 text-[#135C04] hover:bg-[#3eff0090] cursor-pointer">Cadastrar</Button>
                        <Link to="/Listagem/Users">
                            <Button variant={"destructive"} type="submit" className="w-full lg:w-42 cursor-pointer">Voltar</Button>
                        </Link>
                    </div>

                </form>
            </ScrollArea>
        </div>
    )
}