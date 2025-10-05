import { Dropdown } from "@/components/Dropdown/Dropdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function CreateTeam() {
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
                                <Input {...register("name")} maxLength={255} className="text-sm" placeholder="Nome completo" type="text" id="txtName" />
                            </div>
                            <div className="flex flex-col lg:w-1/2 gap-2">
                                <Label htmlFor="txtUsername">Apelido</Label>
                                <Input {...register("username")} maxLength={255} className="text-sm" placeholder="Digite um apelido para o usuário" type="mail" id="txtUsername" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 lg:flex-row">
                            <div className="flex flex-col w-full lg:w-1/2 gap-2">
                                <Label htmlFor="txtEmail">E-mail</Label>
                                <Input {...register("email")} maxLength={255} className="text-sm" placeholder="Digite seu email" type="mail" id="txtEmail" />
                            </div>
                            <div className="flex flex-col w-full gap-2 lg:w-1/2">
                                <Label htmlFor="txtPassword">Senha</Label>
                                <Input {...register("password")} maxLength={255} className="text-sm" placeholder="Digite sua senha" type="password" id="txtPassword" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 lg:flex-row">
                            <div className="flex flex-col lg:w-1/2 gap-2">
                                <Dropdown dados={{ keyDropdown: "cmbTipoUsuario", values: tiposUser, label: "Tipo de usuário", control: control, name: "role" }} />
                            </div>
                            <div className="flex flex-col lg:w-1/2 gap-2">
                                <Dropdown dados={{ keyDropdown: "cmbEquipe", values: teams, label: "Equipe", control: control, name: "teamId" }} />
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