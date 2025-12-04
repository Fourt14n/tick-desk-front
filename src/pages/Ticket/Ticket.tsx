import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { showError, showSucces } from "@/hooks/useToast";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ArrowLeft, ArrowRight, Loader, Paperclip } from "lucide-react";
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
import { formatarData, TrataDataBackEnd } from "@/utils/utils";
import type { ResponseRequisitante } from "@/types/ResponseRequisitante/ResponseRequisitante";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTabs } from "@/store/TabsStore";
import { Skeleton } from "@/components/ui/skeleton";

const TicketThenAction = ticketValidation.and(ticketActionValidation);
export type TicketAction = z.infer<typeof TicketThenAction>;

export default function Ticket() {
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    let { id = '' } = useParams();
    const ticket = Number.isInteger(parseInt(id)) ? parseInt(id) : 0; // Pra conseguir fazer operações baseada em number eu converto aqui
    const fileInputRef = useRef<HTMLInputElement>(null);
    const confirmDialog = useConfirmation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { user } = UserInfo();
    const tabs = useTabs();

    const { data: call } = useQuery<ResponseCall>({
        queryKey: ["call", id],
        refetchOnWindowFocus: false,
        queryFn: () => SelectCallById(),
        enabled: ticket > 0 // Só faço a chamada se o ticket for maior que 0
    })



    const { data: users } = useQuery<DropDownValues[]>({
        queryKey: ["usersByEnterprise", id],
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutos, 1000 milisegundos * 60 pra dar 1 minuto e * 5 pra dar 5 minutos
        queryFn: () => SelectUsersByEnterprise()
    })

    const { data: requisitante } = useQuery<ResponseRequisitante>({
        queryKey: ["requisitante", call],
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 2, // 2 minutos, 1000 milisegundos * 60 pra dar 1 minuto e * 2 pra dar 2 minutos
        queryFn: () => SelectRequisitanteById()
    })

    const { data: teams } = useQuery<DropDownValues[]>({
        queryKey: ["teamsByEnterprise", id],
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutos, 1000 milisegundos * 60 pra dar 1 minuto e * 5 pra dar 5 minutos
        queryFn: () => SelectTeams()
    })

    // Tô usando esse useMemo porque definindo o value direto ele acaba criando loop infinito
    const formValues = useMemo(() => {
        
        return ({
            title: call?.title || "",
            callId: ticket,
            description: "",
            previsaoSolucao: TrataDataBackEnd(call?.previsaoSolucao) || returnDate("MEDIA"),
            teamId: call?.team.id.toString() || user?.teamId.toString() || "",
            urgency: call?.urgency || "MEDIA",
            userId: user?.id || user?.id || 0,
            userResponsavelId: call?.userResponsavel?.id.toString() || user?.id.toString() || "",
            status: call?.status ?? true,
            statusAction: "PUBLIC",
            requisitanteId: call?.requisitanteId.toString() || user?.id.toString() || "",
        })
    }, [call?.requisitanteId, call?.urgency, call?.userResponsavel, call?.status, call?.id, call?.title]);

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
        const response = await api.get(`api/calls/${ticket}`);
        setIsLoading(false);
        return response.data;
    }

    async function SelectRequisitanteById(): Promise<ResponseRequisitante> {
        const response = await api.get(`api/requisitante/${call?.requisitanteId}`);
        return response.data;
    }

    // Por eu juntar as duas entidades dentro da mesma validação nessa tela
    // Eu preciso montar seus objetos manualmente
    function InsertTicket(data: TicketAction) {
        return api.post(`api/calls`, {
            title: data.title,
            userResponsavelId: data.userResponsavelId,
            teamId: data.teamId,
            urgency: data.urgency,
            requisitanteId: data.requisitanteId,
            status: true,
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

    // A ideia aqui é fazer o envio de uma lista de arquivos
    // Um a um de forma assíncrona e mesmo caso um dos arquivos falhe, ele continua o restante
    async function InsertFilesAsync(data: TicketAction, actionId: number) {
        if (data.arquivos?.length) {
            for (let i = 0; i < data.arquivos.length; i++) {
                try {
                    let arquivo = data.arquivos.item(i);
                    if (arquivo) {
                        let formData = new FormData();
                        formData.append("file", arquivo);
                        api.post(`api/files/upload`, formData, {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            },
                            params: {
                                actionId: actionId
                            }
                        })
                            .then(res => res.data)
                            .catch((erro) => showError(`Erro ao enviar o arquivo ${arquivo?.name}: ${erro}`))
                    }
                } catch (error) {
                    
                    continue;
                }
            }
        }
    }

    const UpdateTicket = async (field: string, value?: any) => {
        if (!call) return; // Só atualiza se já tiver carregado

        value = field === "previsaoSolucao" ? value.toLocaleString() : value;
        if (value && call.status) {
            try {
                await api.put(`api/calls/${ticket}`, {
                    [field]: value.toString()
                });
                queryClient.invalidateQueries({ queryKey: ["call"] }) // Pra refazer a chamada do chamado
            } catch (erro) {
                showError(`Erro ao atualizar: ${erro}`);
            }
        }
    };

    async function CloseTicket() {
        const response = await api.delete(`api/calls/${ticket}`);
        if (response.status === 204) {
            showSucces("Chamado finalizado com sucesso!");
            queryClient.invalidateQueries({ queryKey: ["call"] });
        }
        else
            showError(response.data.error);
    }
    async function ReOpenTicket() {
        const response = await api.put(`api/calls/reopen/${ticket}`);
        if (response.status === 200) {
            showSucces("Chamado reaberto com sucesso!");
            // Invalido a query pra ele puxar os valores de novo porque tem mais alteraçãos além do status
            queryClient.invalidateQueries({ queryKey: ["call"] });
        }
        else
            showError(response.data.error);
    }

    function handleIconClick() {
        if (Boolean(call?.status) || ticket === 0)
            fileInputRef.current?.click();
    }

    function handleSelectedChange(event: React.MouseEvent<HTMLLabelElement, MouseEvent>, parentElement: string) {
        if (Boolean(call?.status) || ticket === 0) {
            // Selecino o elemento anterior e removo a classe de selecionado
            var prevOption = document.querySelector(`#${parentElement} .selected`);
            
            prevOption?.classList.remove("selected");

            // Seleciono o elemento clicado e adiciono a classe de selecionado
            var actualOption = event.target as HTMLButtonElement;
            
            actualOption.classList.add("selected");
        }
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
            const actionCreated = await InsertAction(data, data.callId); // Caso já exista o chamado eu vou adicionar só a ação
            await InsertFilesAsync(data, actionCreated.id)
            showSucces("Ação criada com sucesso!");
        }
        else {
            const ticketCreated = await InsertTicket(data); // Primeiramente eu crio o ticket
            const actionCreated = await InsertAction(data, ticketCreated.id); // Pra então conseguir adicionar a ação no ticket
            await InsertFilesAsync(data, actionCreated.id)
            showSucces("Ticket criado com sucesso!")
            navigate(`/Ticket/${ticketCreated.id}`);
        }

        // Invalida a query das ações para refazer automaticamente
        queryClient.invalidateQueries({ queryKey: ["acoesChamado"] });

        setValue("description", "");
        setValue("arquivos", undefined);
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

    const { ref, ...registerProps } = register("arquivos")

    useEffect(function () {
        tabs.addTab(`/Ticket/${id}`);
    }, [id])

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
                            {
                                isLoading && ticket > 0 ?
                                    (
                                        <div className="flex gap-1 flex-row w-full">
                                            <Skeleton className="h-10 w-full bg-[#c1cac1]"></Skeleton>
                                        </div>
                                    )
                                    :
                                    <Input disabled={!(Boolean(call?.status) || ticket === 0)} {...register("title")} onBlur={(e) => UpdateTicket("title", e.target.value)} type="text" placeholder="Título do ticket" maxLength={255} className="bg-white w-full" />
                            }

                        </div>

                        {/* Textarea container */}
                        <div className="flex min-h-[300px] w-full border border-gray-300 rounded-lg bg-white">
                            {/* Textarea com scroll */}
                            <form onSubmit={handleSubmit(handleSendAction, onError)} className="relative w-full">
                                <textarea
                                    {...register("description")}
                                    placeholder="Faça aqui e sua solicitação..."
                                    maxLength={2500}
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
                                                        if (Boolean(call?.status) || ticket === 0) {
                                                            field.onChange(value)
                                                            setValue("statusAction", value)
                                                        }
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
                                            <Input ref={(e) => { ref(e); fileInputRef.current = e }} {...registerProps} type="file" multiple accept=".jpg, .png, .zip, .rar, .pdf, .docx, .xls, .xlxs" style={{ display: "none" }} />
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
                                    {watch("status") === true && (
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            onClick={() => handleSubmit(handleSendAction, onError)}
                                            className="px-4 max-[360px]:px-2 py-1.5 text-xs md:text-sm text-[#135C04] bg-(--weakGreen) rounded-md hover:bg-(--mediumGreen) transition-colors cursor-pointer">
                                            {
                                                isSubmitting ? <Loader /> : "Enviar"
                                            }
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </div>

                        <div className="w-full">
                            {ticket > 0 ? <ActionHistory ticket={ticket} /> : <div></div>}
                        </div>
                    </div>
                </ScrollArea>
            </div>

            <form key={call?.id} className="flex row-span-7 h-full" onSubmit={() => handleSubmit(handleSendAction, onError)}>
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
                                    <Dropdown dados={{ keyDropdown: "userResponsavel", values: users, label: "Usuário Responsável", control: control, name: "userResponsavelId", autoSaveFunc: Boolean(call?.status) ? UpdateTicket : undefined, disabled: !(Boolean(call?.status) || ticket === 0) }} />
                                    {
                                        call?.isExterno ?
                                            (
                                                <div>
                                                    <Label htmlFor="requisitante">Requisitante</Label>
                                                    <Select {...register("requisitanteId")} value={requisitante?.id.toString()} disabled>
                                                        <SelectTrigger
                                                            className={`cursor-pointer bg-white w-full`}
                                                        >
                                                            <SelectValue placeholder="Selecione" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value={requisitante?.id.toString()!}>
                                                                {requisitante?.nome}
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            )
                                            :
                                            <Dropdown dados={{ keyDropdown: "requisitante", values: users, label: "Requisitante", control: control, name: "requisitanteId", autoSaveFunc: Boolean(call?.status) ? UpdateTicket : undefined, disabled: !(Boolean(call?.status) || ticket === 0) }} />

                                    }
                                    <Dropdown dados={{ keyDropdown: "equipeResponsavel", values: teams, label: "Equipe Responsável", control: control, name: "teamId", autoSaveFunc: Boolean(call?.status) ? UpdateTicket : undefined, disabled: !(Boolean(call?.status) || ticket === 0) }} />
                                    <div id="urgencyOpts" className="flex flex-col gap-2">
                                        <Label htmlFor="urgencies">Urgência</Label>
                                        <Controller
                                            control={control}
                                            name="urgency"
                                            render={({ field }) => (
                                                <RadioGroup value={field.value} onValueChange={(value) => {
                                                    if (Boolean(call?.status) || ticket === 0) {
                                                        field.onChange(value);
                                                        setValue("urgency", value)
                                                        setValue("previsaoSolucao", returnDate(value))
                                                        UpdateTicket("urgency", value);
                                                    }
                                                }} id="urgencies" className="flex justify-evenly">
                                                    <Label htmlFor="baixa" className={`md:px-6 px-5 py-1.5 text-xs md:text-sm text-gray-600 rounded-md bg-(--weakGreen) hover:bg-(--mediumGreen) transition-colors ${Boolean(call?.status) || ticket === 0 ? "cursor-pointer" : ""} ${watch("urgency") === "BAIXA" && "selected"}`}>
                                                        Baixa
                                                    </Label>
                                                    <RadioGroupItem
                                                        value="BAIXA"
                                                        id="baixa"
                                                        className="sr-only peer"
                                                    />
                                                    <Label htmlFor="media" className={`md:px-6 px-5 py-1.5 text-xs md:text-sm text-gray-600 bg-[#f6ff0092] rounded-md hover:bg-[#f6ff00dc] transition-colors ${Boolean(call?.status) || ticket === 0 ? "cursor-pointer" : ""} ${watch("urgency") === "MEDIA" && "selected"}`}>
                                                        Média
                                                    </Label>
                                                    <RadioGroupItem
                                                        value="MEDIA"
                                                        id="media"
                                                        className="sr-only peer"
                                                    />
                                                    <Label htmlFor="alta" className={`md:px-6 px-5 py-1.5 text-xs md:text-sm text-gray-600 bg-[#ff080094] rounded-md hover:bg-[#ff0800b1] transition-colors ${Boolean(call?.status) || ticket === 0 ? "cursor-pointer" : ""} ${watch("urgency") === "ALTA" && "selected"}`}>
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
                                    <DatePicker dados={{ label: "Previsão de Solução", disabledPastDays: true, control: control, name: "previsaoSolucao", date: formValues.previsaoSolucao, autoSaveFunc: call?.status ? UpdateTicket : undefined, disabledButton: !(Boolean(call?.status) || ticket === 0) }} />
                                    <div className="flex flex-col gap-1.5 cursor-not-allowed">
                                        <Label>Fechamento do Chamado</Label>
                                        <Input value={call?.dataHoraFechamento ? formatarData(call?.dataHoraFechamento!, true) : ""} className="bg-white" type="text" disabled />
                                    </div>
                                    <div className="flex flex-col gap-1.5 cursor-not-allowed">
                                        <Label>Usuário do Fechamento</Label>
                                        <Input className="bg-white" type="text" disabled value={call?.usuarioFechamento?.name || ""} />
                                    </div>

                                    {(ticket > 0 && watch("status") === true) && <Button onClick={CloseTicket} disabled={isSubmitting} className="bg-(--weakGreen) text-[#135C04] hover:bg-[#3eff0090] cursor-pointer">{isSubmitting ? <Loader /> : "Finalizar Ticket"}</Button>}
                                    {(ticket > 0 && watch("status") === false) && <Button onClick={ReOpenTicket} disabled={isSubmitting} className="bg-(--weakGreen) text-[#135C04] hover:bg-[#3eff0090] cursor-pointer">{isSubmitting ? <Loader /> : "Reabrir Ticket"}</Button>}
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