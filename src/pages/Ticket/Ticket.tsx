import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { showError, showSucces } from "@/hooks/useToast";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ArrowLeft, ArrowRight, Paperclip } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "@/index.css";
import useConfirmation from "@/hooks/useConfirmation";
import ActionHistory from "@/components/ActionHistory/ActionHistory";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dropdown, type DropDownValues } from "@/components/Dropdown/Dropdown";
import { Label } from "@/components/ui/label";
import DatePicker from "@/components/DatePicker/DatePicker";
import { Button } from "@/components/ui/button";
import type z from "zod";
import { ticketValidation } from "@/validations/ticket";
import { ticketActionValidation } from "@/validations/ticketAction";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { onError } from "@/hooks/onError";
import { UserInfo } from "@/store/UserInfosStore";
import { api } from "@/lib/axios";
import type { ResponseTeams } from "@/types/ResponseTeams/ResponseTeams";
import { addDays } from "date-fns";
import type { ResponseUser } from "@/types/ResponseUser/ResponseUser";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { ResponseCall } from "@/types/ResponseCall/ResponseCall";
import { TrataDataBackEnd } from "@/utils/utils";
import type { ResponseAction } from "@/types/ResponseAction/ResponseAction";


function handleSelectedChange(event: React.MouseEvent<HTMLLabelElement, MouseEvent>, parentElement: string) {
    // Selecino o elemento anterior e removo a classe de selecionado
    var prevOption = document.querySelector(`#${parentElement} .selected`);
    prevOption?.classList.remove("selected");

    // Seleciono o elemento clicado e adiciono a classe de selecionado
    var actualOption = event.target as HTMLButtonElement;
    actualOption.classList.add("selected");
}

const TicketThenAction = ticketValidation.and(ticketActionValidation);
export type TicketAction = z.infer<typeof TicketThenAction>;

export default function Ticket() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    let { id = '' } = useParams();
    const ticket = Number.isInteger(parseInt(id)) ? parseInt(id) : 0; // Pra conseguir fazer operações baseada em number eu converto aqui
    const fileInputRef = useRef<HTMLInputElement>(null);
    const confirmDialog = useConfirmation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { user } = UserInfo();

    const { data: call, refetch } = useQuery<ResponseCall>({
        queryKey: ["call", id],
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 4,
        queryFn: () => SelectCallById(),
        enabled: ticket > 0 // Só faço a chamada se o ticket for maior que 0
    })


    const { data: users } = useQuery<DropDownValues[]>({
        queryKey: ["usersByEnterprise", id],
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutos, 1000 milisegundos * 60 pra dar 1 minuto e * 5 pra dar 5 minutos
        queryFn: () => SelectUsersByEnterprise()
    })

    const { data: teams } = useQuery<DropDownValues[]>({
        queryKey: ["teamsByEnterprise", id],
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutos, 1000 milisegundos * 60 pra dar 1 minuto e * 5 pra dar 5 minutos
        queryFn: () => SelectTeams()
    })

    // Tô usando esse useMemo porque definindo o value direto ele acaba criando loop infinito
    const formValues = useMemo(() => {
        console.log(call)
        return ({
        title: call?.title || "",
        callId: ticket,
        description: "",
        previsaoSolucao: TrataDataBackEnd(call?.previsaoSolucao) || returnDate("MEDIA"),
        teamId: call?.team.id.toString() || user?.teamId.toString() || "",
        urgency: call?.urgency || "MEDIA",
        userId: user?.id || user?.id || 0,
        userResponsavelId: call?.userResponsavel.id.toString() || user?.id.toString() || "",
        status: call?.status ?? true,
        statusAction: "PUBLIC",
    })
    }, [call]);

    const { register, handleSubmit, watch, setValue, control, formState: { isSubmitting } } = useForm<TicketAction>({
        resolver: zodResolver(TicketThenAction),
        values: formValues,
    });

    async function SelectTeams(): Promise<DropDownValues[]> {
        var response = await api.get(`api/enterprise/${user?.enterpriseId}/teams`);
        var equipes: DropDownValues[] = response.data.map((item: ResponseTeams) => {
            return { value: item.id.toString(), label: item.name }
        });
        return equipes;
    }

    async function SelectUsersByEnterprise(): Promise<DropDownValues[]> {
        var response = await api.get(`api/enterprise/${user?.enterpriseId}/users`);
        var usuarios: DropDownValues[] = response.data.map((item: ResponseUser) => {
            return { value: item.id.toString(), label: item.name };
        })
        return usuarios;
    }

    async function SelectCallById(): Promise<ResponseCall> {
        const response = await api.get(`api/calls/${ticket}`)
        return response.data
    }

    // Por eu juntar as duas entidades dentro da mesma validação nessa tela
    // Eu preciso montar seus objetos manualmente
    function InsertTicket(data: TicketAction) {
        return api.post(`api/calls`, {
            title: data.title,
            userResponsavelId: data.userResponsavelId,
            teamId: data.teamId,
            urgency: data.urgency,
            status: true,
            userExternoId: 1
        }).then(res => res.data)
            .catch(erro => showError(erro.response.data.error))
    }

    function InsertAction(data: TicketAction, callId: number) {
        return api.post("api/actions/", {
            description: data.description,
            userId: data.userId,
            callId: callId,
            statusAction: data.statusAction
        }).then(res => res.data)
            .catch(erro => showError(erro.response.data.error))
    }

    const UpdateTicket = async (field: string, value?: any) => {
        if (!call) return; // Só atualiza se já tiver carregado
        if(value){
            try {
                await api.put(`api/calls/${ticket}`, {
                    [field]: value
                });
                await refetch();
            } catch (erro) {
                showError(`Erro ao atualizar: ${erro}`);
            }
        }
    };

    function handleIconClick() {
        fileInputRef.current?.click();
    }

    function returnDate(urgencia: string) {
        switch (urgencia) {
            case "BAIXA": return addDays(new Date(), 4);
            case "MEDIA": return addDays(new Date(), 3);
            case "ALTA": return addDays(new Date(), 1);
            default: return addDays(new Date(), 3);
        }
    }


    async function handleInserting(data: TicketAction) {
        if (data.callId > 0) {
            await InsertAction(data, data.callId); // Caso já exista o chamado eu vou adicionar só a ação
            showSucces("Ação criada com sucesso!");
        }
        else {
            const ticketCreated = await InsertTicket(data); // Primeiramente eu crio o ticket
            await InsertAction(data, ticketCreated.id); // Pra então conseguir adicionar a ação no ticket
            showSucces("Ticket criado com sucesso!")
            navigate(`/Ticket/${ticketCreated.id}`);
        }
        
        // Invalida a query das ações para refazer automaticamente
        queryClient.invalidateQueries({ queryKey: ["acoesChamado"] });

        setValue("description", "");
    }

    function handleSendAction(data: TicketAction) {
        if (watch("description").toUpperCase().includes("ANEXO") && fileInputRef.current?.files?.length === 0) {
            confirmDialog.open({
                title: "Confirma envio sem anexo?",
                description: "Você escreveu anexo na ação, mas não anexou nenhum arquivo, deseja enviar a ação assim mesmo?",
                onConfirm: () => handleInserting(data),
                cancelText: "Não",
                confirmText: "Sim",
            });
        } else
            handleInserting(data);
    }
    
    // Lógica de arquivos que vamos precisar dar uma olhada depois
    // const {ref, ...registerProps} = register("arquivos")

    return (
        <div className="grid grid-rows-7 w-full bg-(--bg-default) grid-cols-[1fr_25px] md:grid-cols-[1fr_2rem]">
            <div className="row-span-7 h-full p-3 w-full">
                <ScrollArea className="w-full h-full">
                    <div className="flex flex-col min-h-full p-3 w-full space-y-6">
                        {/* Header */}
                        <div className="flex flex-col justify-center">
                            <p className="text-(--text-strongGreen) font-bold">{ticket > 0 ? `Editar Ticket` : `Criar um Ticket`}</p>
                            <Separator className="bg-[#BAB9B9]" orientation="horizontal" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title">Título do Ticket</Label>
                            <Input {...register("title")} onBlur={(e) => UpdateTicket("title", e.target.value)} type="text" placeholder="Título do ticket" maxLength={255} className="bg-white w-full" />
                        </div>

                        {/* Textarea container */}
                        <div className="flex min-h-[300px] w-full border border-gray-300 rounded-lg bg-white">
                            {/* Textarea com scroll */}
                            <form onSubmit={handleSubmit(handleSendAction, onError)} className="relative w-full">
                                <textarea
                                    {...register("description")}
                                    placeholder="Faça aqui e sua solicitação..."
                                    className="w-full p-3 pb-15 border-none outline-none resize-none placeholder-gray-400 rounded-lg overflow-y-auto"
                                    style={{
                                        scrollbarWidth: 'thin',
                                        scrollbarColor: '#cbd5e1 transparent'
                                    }} />
                                {/* Container dos botões - fixo na parte inferior */}
                                <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-1 md:p-3 bg-white border-t border-gray-100 rounded-b-lg">
                                    {/* Botões à esquerda */}
                                    <div className="flex min-[380px]:gap-3 items-center">
                                        <Controller
                                            control={control}
                                            name="statusAction"
                                            render={({ field }) => (
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value)
                                                        setValue("statusAction", value)
                                                    }}
                                                    defaultValue="PUBLIC"
                                                    id="privacyOptContainer"
                                                    className="flex items-center space-x-2 max-[360px]:space-x-1">
                                                    <RadioGroupItem
                                                        value="PUBLIC"
                                                        id="publico"
                                                        className="sr-only peer"
                                                    />
                                                    <Label htmlFor="publico" onClick={(event) => handleSelectedChange(event, "privacyOptContainer")} className="px-3 max-[360px]:px-1 py-1.5 text-xs md:text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors cursor-pointer selected">
                                                        Público
                                                    </Label>
                                                    <RadioGroupItem
                                                        value="PRIVAT"
                                                        id="interno"
                                                        className="sr-only peer"
                                                    />
                                                    <Label htmlFor="interno" onClick={(event) => handleSelectedChange(event, "privacyOptContainer")} className="px-3 max-[360px]:px-1 py-1.5 text-xs md:text-sm text-[#135C04] bg-(--weakGreen) border border-gray-300 rounded-md hover:bg-(--mediumGreen) transition-colors cursor-pointer">
                                                        Interno
                                                    </Label>
                                                </RadioGroup>
                                            )}
                                        />
                                        <div>
                                            {/* <Input ref={(e) => {ref(e); fileInputRef.current = e}} {...registerProps} type="file" multiple accept=".jpg, .png, .zip, .rar, .pdf, .docx, .xls, .xlxs" style={{ display: "none" }} /> */}
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Paperclip size={20} color={"var(--grey)"} className="cursor-pointer" onClick={handleIconClick} />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Anexar arquivos</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </div>

                                    {/* Botão à direita */}
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        onClick={() => handleSubmit(handleSendAction, onError)}
                                        className="px-4 max-[360px]:px-2 py-1.5 text-xs md:text-sm text-[#135C04] bg-(--weakGreen) rounded-md hover:bg-(--mediumGreen) transition-colors cursor-pointer">
                                        Enviar
                                    </Button>
                                </div>
                            </form>
                        </div>

                        <div className="w-full">
                            {ticket > 0 ? <ActionHistory ticket={ticket} /> : <div></div>}
                        </div>
                    </div>
                </ScrollArea>
            </div>

            <form className="flex row-span-7 h-full" onSubmit={() => handleSubmit(handleSendAction, onError)}>
                <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen} modal={false}>
                    <SheetTrigger className="flex justify-end items-end h-(--height-mobile) bg-(--bg-divs)">
                        <div className="flex h-full w-full justify-center cursor-pointer pt-4">
                            <ArrowLeft />
                        </div>
                    </SheetTrigger>
                    <SheetContent className="h-(--height-default) mt-[3rem] [&>button]:hidden flex flex-col overflow-scroll">
                        <div className="bg-(--bg-divs) h-(--height-mobile)">
                            <div className="p-4">
                                <ArrowRight cursor={"pointer"} onClick={() => setIsDialogOpen(false)} />
                            </div>

                            <ScrollArea className="bg-(--bg-divs) pb-3">
                                <div className="flex flex-col w-full p-2 gap-4">
                                    <Dropdown dados={{ keyDropdown: "exemplo", values: users, label: "Usuário Responsável", control: control, name: "userResponsavelId", autoSaveFunc: UpdateTicket }} />
                                    <Dropdown dados={{ keyDropdown: "exemplo2", values: teams, label: "Equipe Responsável", control: control, name: "teamId", autoSaveFunc: UpdateTicket }} />
                                    <div id="urgencyOpts" className="flex flex-col gap-2">
                                        <Label htmlFor="urgencies">Urgência</Label>
                                        <Controller
                                            control={control}
                                            name="urgency"
                                            render={({ field }) => (
                                                <RadioGroup value={field.value} onValueChange={(value) => {
                                                    field.onChange(value);
                                                    setValue("urgency", value)
                                                    UpdateTicket("urgency", value);
                                                }} id="urgencies" className="flex justify-evenly">
                                                    <Label htmlFor="baixa" className={`md:px-6 px-5 py-1.5 text-xs md:text-sm text-gray-600 rounded-md bg-(--weakGreen) hover:bg-(--mediumGreen) transition-colors cursor-pointer ${watch("urgency") === "BAIXA" && "selected"}`}>
                                                        Baixa
                                                    </Label>
                                                    <RadioGroupItem
                                                        value="BAIXA"
                                                        id="baixa"
                                                        className="sr-only peer"
                                                    />
                                                    <Label htmlFor="media" className={`md:px-6 px-5 py-1.5 text-xs md:text-sm text-gray-600 bg-[#f6ff0092] rounded-md hover:bg-[#f6ff00dc] transition-colors cursor-pointer ${watch("urgency") === "MEDIA" && "selected"}`}>
                                                        Média
                                                    </Label>
                                                    <RadioGroupItem
                                                        value="MEDIA"
                                                        id="media"
                                                        className="sr-only peer"
                                                    />
                                                    <Label htmlFor="alta" className={`md:px-6 px-5 py-1.5 text-xs md:text-sm text-gray-600 bg-[#ff080094] rounded-md hover:bg-[#ff0800b1] transition-colors cursor-pointer ${watch("urgency") === "ALTA" && "selected"}`}>
                                                        Alta
                                                    </Label>
                                                    <RadioGroupItem
                                                        value="ALTA"
                                                        id="alta"
                                                        className="sr-only peer"
                                                    />
                                                </RadioGroup>
                                            )}
                                        />


                                    </div>
                                    <DatePicker dados={{ label: "Previsão de Solução", disabledPastDays: true, control: control, name: "previsaoSolucao", date: formValues.previsaoSolucao, autoSaveFunc: UpdateTicket }} />
                                    <div className="flex flex-col gap-1.5 cursor-not-allowed">
                                        <Label>Fechamento do Chamado</Label>
                                        <Input className="bg-white" type="text" disabled></Input>
                                    </div>
                                    <div className="flex flex-col gap-1.5 cursor-not-allowed">
                                        <Label>Usuário do Fechamento</Label>
                                        <Input className="bg-white" type="text" disabled></Input>
                                    </div>

                                    {ticket > 0 && <Button disabled={isSubmitting} className="bg-(--weakGreen) text-[#135C04] hover:bg-[#3eff0090] cursor-pointer">Finalizar Ticket</Button>}
                                </div>
                            </ScrollArea>
                        </div>

                    </SheetContent>
                </Sheet>
            </form>
            {confirmDialog.DialogComponent}
        </div>
    )
}