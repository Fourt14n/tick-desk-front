import type { DropDownValues } from "@/components/Dropdown/Dropdown";
import { DropdownStandalone } from "@/components/DropdownNoHookForm/Dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { onError } from "@/hooks/onError";
import { showAlert, showError, showSucces } from "@/hooks/useToast";
import { api, consultaCNPJ } from "@/lib/axios";
import { TeamColumns, type Team } from "@/tableObjects/TeamsTable";
import { UsersColumns, type User } from "@/tableObjects/UsersTable";
import type { ResponseCNPJA } from "@/types/ResponseCNPJA/ResponseCNPJA";
import type { ResponseTeams } from "@/types/ResponseTeams/ResponseTeams";
import { cnpjMask } from "@/utils/cnpjMask";
import { phoneMask } from "@/utils/phoneMask";
import { businessValidation } from "@/validations/business";
import { team } from "@/validations/team";
import type { userValidation } from "@/validations/user";
import { useQuery } from "@tanstack/react-query";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Info, Loader, Plus } from "lucide-react";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { useState } from "react";
import { Link } from "react-router";
import type z from "zod";

type TeamRegister = z.infer<typeof team>;
type UserRegister = z.infer<typeof userValidation>;

enum TipoRegistro {
    EMPRESA,
    TIME,
    USUARIO
}

export default function BusinessCreate() {
    const [step, setStep] = useState(0);
    const [teams, setTeams] = useState<Team[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isSending, setIsSending] = useState(false);

    // Vou deixar fechado já isso pra puxar dados das equipes da empresa e pah
    const { data: teamsDPV } = useQuery<DropDownValues[]>({
        queryKey: ["teamsByEnterprise", teams],
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutos, 1000 milisegundos * 60 pra dar 1 minuto e * 5 pra dar 5 minutos
        queryFn: () => SelectTeams()
    })

    const tableTeams = useReactTable({
        data: teams,
        columns: TeamColumns,
        getCoreRowModel: getCoreRowModel(),
    })
    const tableUsers = useReactTable({
        data: users,
        columns: UsersColumns,
        getCoreRowModel: getCoreRowModel(),
    })


    const [empresaCriada, setEmpresaCriada] = useState(0);
    const [dadosEmpresa, setDadosEmpresa] = useState({
        corporateName: '',
        fantasyName: '',
        cnpj: '',
        email: '',
        phone: ''
    });
    const [dadosEquipe, setDadosEquipe] = useState<TeamRegister>({
        enterpriseId: empresaCriada,
        name: ''
    })
    const [dadosUsuario, setDadosUsuario] = useState<UserRegister>({
        email: '',
        name: '',
        role: "SUPORT",
        teamId: 0,
        username: ''
    })

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

    const handleChange = (campo: string, valor: string, tipo: TipoRegistro) => {
        switch (tipo) {
            case TipoRegistro.EMPRESA: {
                setDadosEmpresa(prev => ({ ...prev, [campo]: valor }));
                break;
            }
            case TipoRegistro.TIME: {
                setDadosEquipe(prev => ({ ...prev, [campo]: valor }));
                break;
            }
            case TipoRegistro.USUARIO: {
                console.log("Veio trocar o valor", campo, valor)
                setDadosUsuario(prev => ({ ...prev, [campo]: valor }));
                break;
            }
        }
    };

    async function ConsultaCNPJ() {
        console.log("Veio consultar o CNPJ");
        try {
            var cnpjConsulta = await consultaCNPJ.get<ResponseCNPJA>(`office/${dadosEmpresa.cnpj}`);
            let consulta = cnpjConsulta.data;
            console.log("Consulta", consulta)
            handleChange("email", consulta?.emails.at(0)?.address || '', TipoRegistro.EMPRESA)
            handleChange("corporateName", consulta?.company.name || '', TipoRegistro.EMPRESA)
            handleChange("fantasyName", consulta?.alias || '', TipoRegistro.EMPRESA)
            handleChange("phone", `${consulta?.phones.at(0)?.area}${consulta?.phones.at(0)?.number}` || '', TipoRegistro.EMPRESA)
        } catch (erro: any) {
            console.log("Erro", erro)
            switch (erro?.response.status) {
                case 404: {
                    showError("Empresa não encontrada");
                    break;
                }
                case 429: {
                    showError("Limite excedido de pesquisas, tente novamente em alguns minutos ou digite os dadosEmpresa!");
                    break;
                }
                default: {
                    showError("Ocorreu um erro interno ao buscar os dadosEmpresa da empresa!");
                    break;
                }
            }
        }
    }

    function handleCNPJChanging() {
        if (dadosEmpresa.cnpj.length === 14)
            ConsultaCNPJ();
        else if (dadosEmpresa.cnpj.trim().length > 0)
            showAlert("Para a pesquisa o CNPJ deve estar completo!");
    }


    async function CreateBusiness() {
        setIsSending(true);
        await api.post(`api/enterprise/create`, dadosEmpresa)
            .then(res => {
                console.log(res.data);
                console.log(res.data.id);

                // Tem que atualizar tanto o valor do estado quanto o da equipe
                setEmpresaCriada(res.data.id);
                setDadosEquipe(prev => ({ ...prev, enterpriseId: res.data.id }));
            })
            .catch(erro => showError(erro.response.data.error))
            .finally(() => setIsSending(false))
    }

    async function CreateTeam() {
        setIsSending(true);
        // Crio a equipe
        await api.post(`api/team/create`, dadosEquipe)
            .then(async () => {
                // Atualizo a tabela de equipes
                await api.get(`api/enterprise/${empresaCriada}/teams`)
                    .then(res => setTeams(res.data))
                    .catch(erro => showError(erro.response.data));

                // Limpo campo
                setDadosEquipe({ enterpriseId: empresaCriada, name: '' });
                showSucces("Equipe criada com sucesso!");
            })
            .catch(erro => showError(erro.response.data.error))
            .finally(() => setIsSending(false))
    }

    async function SelectTeams(): Promise<DropDownValues[]> {
        var equipes: DropDownValues[] = [];
        // Pra evitar requisição com empresa 0 que vai dar erro
        if (empresaCriada > 0) {
            var response = await api.get(`api/enterprise/${empresaCriada}/teams`);
            equipes = response.data.map((item: ResponseTeams) => {
                return { value: item.id.toString(), label: item.name }
            });
        }
        return equipes;
    }

    async function CreateUser() {
        setIsSending(true);
        await api.post(`api/user/register`, dadosUsuario)
            .then(async () => {
                // Atualizo a tabela de usuários
                await api.get(`api/enterprise/${empresaCriada}/users`)
                    .then(res => setUsers(res.data))
                    .catch(erro => showError(erro.response.data));

                // Limpo campos
                setDadosUsuario({ email: "", name: "", role: "SUPORT", teamId: 0, username: "" });
                showSucces("Usuário criado com sucesso!");
            }).catch(erro => showError(erro.response.data.error))
            .finally(() => setIsSending(false))
    }
    return (
        <div className="flex h-full w-full p-5">
            <ScrollArea className="flex w-full h-full flex-col">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col justify-center">
                            <p className="text-(--text-strongGreen) font-bold">Cadastro de empresa</p>
                            <Separator className="bg-[#BAB9B9]" orientation="horizontal" />
                        </div>
                    </div>
                    <div className="flex w-full h-full justify-center">
                        <Stepper activeStep={step} className="w-11/12" linear >


                            {/* ABA DE CADASTRO DA EMPRESA */}
                            <StepperPanel key={"BusinessCreating"} header="Cadastro da empresa">
                                <div className="flex flex-col gap-4 w-full p-5 bg-black/3 backdrop-blur-lg rounded-xl">
                                    <div className="flex flex-col gap-2">
                                        <Label className="font-bold" htmlFor="">CNPJ
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info size={17} color="blue" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Ao digitar seu CNPJ nós fazemos a pesquisa para você!</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </Label>
                                        <Input
                                            className="bg-white"
                                            onChange={(e) => handleChange("cnpj", e.target.value.replace(/\D/g, ''), TipoRegistro.EMPRESA)}
                                            // Pra caso ele só cole o CNPJ
                                            onBlur={handleCNPJChanging}
                                            value={cnpjMask(dadosEmpresa.cnpj)}
                                            type="text"
                                            maxLength={18} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label className="font-bold" htmlFor="">Razão social</Label>
                                        <Input className="bg-white" value={dadosEmpresa.corporateName} onChange={(e) => handleChange("corporateName", e.target.value, TipoRegistro.EMPRESA)} type="text" maxLength={200} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label className="font-bold" htmlFor="">Nome fantasia</Label>
                                        <Input className="bg-white" value={dadosEmpresa.fantasyName} onChange={(e) => handleChange("fantasyName", e.target.value, TipoRegistro.EMPRESA)} type="text" maxLength={200} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label className="font-bold" htmlFor="">E-mail</Label>
                                        <Input className="bg-white" value={dadosEmpresa.email} onChange={(e) => handleChange("email", e.target.value, TipoRegistro.EMPRESA)} type="email" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label className="font-bold" htmlFor="">Telefone</Label>
                                        <Input className="bg-white" maxLength={15} value={phoneMask(dadosEmpresa.phone)} onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, ''), TipoRegistro.EMPRESA)} type="text" />
                                    </div>
                                    <div className="flex py-4 gap-2 justify-end w-full">
                                        <Button
                                            disabled={isSending}
                                            className="bg-(--weakGreen) w-42 text-[#135C04] hover:bg-[#3eff0090] cursor-pointer" type="button"
                                            onClick={() => {
                                                try {
                                                    businessValidation.parse(dadosEmpresa);
                                                    CreateBusiness();
                                                    setStep(step + 1);
                                                } catch (erro: any) {
                                                    onError(JSON.parse(erro));
                                                }
                                            }}>{isSending && <Loader />}Avançar</Button>
                                    </div>
                                </div>
                            </StepperPanel>


                            {/* ABA DE CADASTRO DE EQUIPES */}
                            <StepperPanel key={"TeamCreating"} header="Cadastro de equipes">
                                <div className="flex flex-col gap-4 p-5 bg-black/3 backdrop-blur-lg rounded-xl">
                                    <div className="grid grid-rows-[auto_1fr_auto] h-full w-full gap-4">
                                        <div className="flex flex-col w-full gap-2">
                                            <Label className="font-bold" htmlFor="txtName">Nome da equipe</Label>
                                            <Input value={dadosEquipe.name} onChange={(e) => handleChange("name", e.target.value, TipoRegistro.TIME)} maxLength={30} className="text-sm relative pr-10 bg-white" placeholder="Nome da equipe" type="text" id="txtName" />
                                            {/* Validação pra evitar usuário ficar clicando várias vezes enquanto tá enviando alguma requisição */}
                                            {isSending ?
                                                <Loader className="absolute right-8 top-12" />
                                                : <Plus stroke="green" strokeWidth={3} color="green" onClick={CreateTeam} className="absolute right-8 top-12 cursor-pointer" />
                                            }

                                        </div>
                                        {
                                            <div className="flex overflow-hidden flex-col gap-2">
                                                <Label className="text-base font-bold">Equipes</Label>
                                                <Table className="border-1 border-black-50">
                                                    <TableHeader>
                                                        {tableTeams.getHeaderGroups().map((headerGroup) => (
                                                            <TableRow key={headerGroup.id}>
                                                                {headerGroup.headers.map((header) => {
                                                                    return (
                                                                        <TableHead key={header.id}>
                                                                            {header.isPlaceholder
                                                                                ? null
                                                                                : flexRender(
                                                                                    header.column.columnDef.header,
                                                                                    header.getContext()
                                                                                )}
                                                                        </TableHead>
                                                                    )
                                                                })}
                                                            </TableRow>
                                                        ))}
                                                    </TableHeader>
                                                    <TableBody>
                                                        {tableTeams.getRowModel().rows?.length ? (
                                                            tableTeams.getRowModel().rows.map((row) => (
                                                                <TableRow
                                                                    key={row.id}
                                                                    data-state={row.getIsSelected() && "selected"}
                                                                >
                                                                    {row.getVisibleCells().map((cell) => (
                                                                        <TableCell key={cell.id}>
                                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                                        </TableCell>
                                                                    ))}
                                                                </TableRow>
                                                            ))
                                                        ) : (
                                                            <TableRow>
                                                                <TableCell colSpan={tableTeams.getAllColumns().length} className="h-24 text-center">
                                                                    Sem equipes cadastradas.
                                                                </TableCell>
                                                            </TableRow>
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        }
                                    </div>
                                    <div className="flex gap-3 justify-end w-full">
                                        <Button disabled={isSending} variant={"secondary"} className="w-30 md:w-42 cursor-pointer" type="button" onClick={() => setStep(step - 1)}>Voltar</Button>
                                        <Button disabled={isSending} className="bg-(--weakGreen) w-30 md:w-42 text-[#135C04] hover:bg-[#3eff0090] cursor-pointer" type="button" onClick={() => setStep(step + 1)}>Avançar</Button>
                                    </div>
                                </div>
                            </StepperPanel>


                            {/* ABA DE CADASTRO DE USUÁRIOS */}
                            <StepperPanel key={"UserCreating"} header="Cadastro de usuários">
                                <div className="flex flex-col gap-4 p-5 bg-black/3 backdrop-blur-lg rounded-xl">
                                    <div className="grid grid-rows-[auto_1fr_auto] h-full w-full gap-4">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-col gap-4 lg:flex-row">
                                                <div className="flex flex-col lg:w-1/2 gap-2">
                                                    <Label className="font-bold" htmlFor="txtName">Nome</Label>
                                                    <Input onChange={(e) => handleChange("name", e.target.value, TipoRegistro.USUARIO)} maxLength={255} className="text-sm bg-white" placeholder="Nome completo" type="text" id="txtName" />
                                                </div>
                                                <div className="flex flex-col lg:w-1/2 gap-2">
                                                    <Label className="font-bold" htmlFor="txtUsername">Apelido</Label>
                                                    <Input onChange={(e) => handleChange("username", e.target.value, TipoRegistro.USUARIO)} maxLength={255} className="text-sm bg-white" placeholder="Digite um apelido para o usuário" type="mail" id="txtUsername" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-4 lg:flex-row">
                                                <div className="flex flex-col w-full gap-2">
                                                    <Label className="font-bold" htmlFor="txtEmail">E-mail</Label>
                                                    <Input onChange={(e) => handleChange("email", e.target.value, TipoRegistro.USUARIO)} maxLength={255} className="text-sm bg-white" placeholder="Digite seu email" type="mail" id="txtEmail" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-4 lg:flex-row">
                                                <div className="flex flex-col lg:w-1/2 gap-2">
                                                    <DropdownStandalone
                                                        dados={{
                                                            keyDropdown: "roles",
                                                            label: "Tipo de usuário",
                                                            values: tiposUser,
                                                        }}
                                                        value={dadosUsuario.role}
                                                        onChange={(value) => handleChange("role", value, TipoRegistro.USUARIO)}
                                                    />
                                                </div>
                                                <div className="flex flex-col lg:w-1/2 gap-2">
                                                    <DropdownStandalone
                                                        dados={{
                                                            keyDropdown: "teams",
                                                            label: "Equipe do usuário",
                                                            values: teamsDPV,
                                                        }}
                                                        value={dadosUsuario.teamId}
                                                        onChange={(value) => handleChange("teamId", value, TipoRegistro.USUARIO)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-center items-center">
                                                <Button disabled={isSending} className="bg-(--weakGreen) w-2/3 lg:w-48 text-[#135C04] hover:bg-[#3eff0090] cursor-pointer" type="button" onClick={CreateUser}>{isSending && <Loader />}Adicionar usuário</Button>
                                            </div>
                                        </div>
                                        {
                                            <div className="flex overflow-hidden flex-col gap-2">
                                                <Label className="text-base font-bold">Usuários</Label>
                                                <Table className="border-1 border-black-50">
                                                    <TableHeader>
                                                        {tableUsers.getHeaderGroups().map((headerGroup) => (
                                                            <TableRow key={headerGroup.id}>
                                                                {headerGroup.headers.map((header) => {
                                                                    return (
                                                                        <TableHead key={header.id}>
                                                                            {header.isPlaceholder
                                                                                ? null
                                                                                : flexRender(
                                                                                    header.column.columnDef.header,
                                                                                    header.getContext()
                                                                                )}
                                                                        </TableHead>
                                                                    )
                                                                })}
                                                            </TableRow>
                                                        ))}
                                                    </TableHeader>
                                                    <TableBody>
                                                        {tableUsers.getRowModel().rows?.length ? (
                                                            tableUsers.getRowModel().rows.map((row) => (
                                                                <TableRow
                                                                    key={row.id}
                                                                    data-state={row.getIsSelected() && "selected"}
                                                                >
                                                                    {row.getVisibleCells().map((cell) => (
                                                                        <TableCell key={cell.id}>
                                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                                        </TableCell>
                                                                    ))}
                                                                </TableRow>
                                                            ))
                                                        ) : (
                                                            <TableRow>
                                                                <TableCell colSpan={tableUsers.getAllColumns().length} className="h-24 text-center">
                                                                    Sem usuários cadastrados.
                                                                </TableCell>
                                                            </TableRow>
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        }
                                    </div>
                                    <div className="flex gap-3 justify-end w-full">
                                        <Button variant={"secondary"} className="w-30 md:w-42 cursor-pointer" type="button" onClick={() => setStep(step - 1)}>Voltar</Button>
                                        <Link to={"/Listagem/Business"}><Button className="bg-(--weakGreen) w-30 md:w-42 text-[#135C04] hover:bg-[#3eff0090] cursor-pointer" type="button">Finalizar</Button></Link>
                                    </div>
                                </div>
                            </StepperPanel>
                        </Stepper>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}