import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { showError } from "@/hooks/useToast";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ArrowLeft, ArrowRight, Paperclip } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "@/index.css";
import useConfirmation from "@/hooks/useConfirmation";
import ActionHistory from "@/components/ActionHistory/ActionHistory";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dropdown } from "@/components/Dropdown/Dropdown";
import { Label } from "@/components/ui/label";
import DatePicker from "@/components/DatePicker/DatePicker";
import { Button } from "@/components/ui/button";
import type z from "zod";
import { ticketValidation } from "@/validations/ticket";
import { ticketActionValidation } from "@/validations/ticketAction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { onError } from "@/hooks/onError";
import { useTabs } from "@/store/TabsStore";

function handleSelectedChange(event: React.MouseEvent<HTMLLabelElement, MouseEvent>, parentElement: string) {
    // Selecino o elemento anterior e removo a classe de selecionado
    var prevOption = document.querySelector(`#${parentElement} .selected`);
    prevOption?.classList.remove("selected");

    // Seleciono o elemento clicado e adiciono a classe de selecionado
    var actualOption = event.target as HTMLButtonElement;
    actualOption.classList.add("selected");
}

const TicketThenAction = ticketValidation.and(ticketActionValidation);
type TicketAction = z.infer<typeof TicketThenAction>;

const valoresDropdown = [{
    label: "Teste1",
    value: "1"
}, {
    label: "Teste2",
    value: "2"
}, {
    label: "Teste3",
    value: "3"
},]

export default function Ticket() {
    const navigate = useNavigate();
    let { id = '' } = useParams();
    const addTab = useTabs(tabs => tabs.addTab);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const confirmDialog = useConfirmation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { register, handleSubmit, watch, control, formState: { isValid } } = useForm<TicketAction>({
        resolver: zodResolver(TicketThenAction)
    });

    if (!id) {
        showError("Caminho inválido de ticket! Redirecionando a home...");
        setTimeout(() => navigate("/Home"), 3000);
    }

    function handleIconClick() {
        fileInputRef.current?.click();
    }

    function handleSendAction() {
        console.log("Teste")
        if (watch("descricaoAcao").toUpperCase().includes("ANEXO") && fileInputRef.current?.files?.length === 0) {
            confirmDialog.open({
                title: "Confirma envio sem anexo?",
                description: "Você escreveu anexo na ação, mas não anexou nenhum arquivo, deseja enviar a ação assim mesmo?",
                onConfirm: () => console.log("Confirmado"),
                cancelText: "Não",
                confirmText: "Sim",
            });
        };
        if (isValid) {

        }
    }

    const ticket = Number.isInteger(parseInt(id)) ? parseInt(id) : 0;

    useEffect(() => {
        if(ticket > 0){
            var caminhoEspecifico = `/Ticket/${ticket}`;
            addTab(caminhoEspecifico);
        }
    }, [])

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
                            <Label htmlFor="tituloTicket">Título do Ticket</Label>
                            <Input {...register("tituloTicket")} type="text" placeholder="Título do ticket" maxLength={255} className="bg-white w-full" />
                        </div>

                        {/* Textarea container */}
                        <div className="flex min-h-[300px] w-full border border-gray-300 rounded-lg bg-white">
                            {/* Textarea com scroll */}
                            <form onSubmit={handleSubmit(handleSendAction, onError)} className="relative w-full">
                                <textarea
                                    {...register("descricaoAcao")}
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
                                        <RadioGroup defaultValue="true" {...register("publica")} id="privacyOptContainer" className="flex items-center space-x-2 max-[360px]:space-x-1">
                                            <RadioGroupItem
                                                value="true"
                                                id="publico"
                                                className="sr-only peer"
                                            />
                                            <Label htmlFor="publico" onClick={(event) => handleSelectedChange(event, "privacyOptContainer")} className="px-3 max-[360px]:px-1 py-1.5 text-xs md:text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors cursor-pointer selected">
                                                Público
                                            </Label>
                                            <RadioGroupItem
                                                value="false"
                                                id="interno"
                                                className="sr-only peer"
                                            />
                                            <Label htmlFor="interno" onClick={(event) => handleSelectedChange(event, "privacyOptContainer")} className="px-3 max-[360px]:px-1 py-1.5 text-xs md:text-sm text-[#135C04] bg-(--weakGreen) border border-gray-300 rounded-md hover:bg-(--mediumGreen) transition-colors cursor-pointer">
                                                Interno
                                            </Label>
                                        </RadioGroup>
                                        <div>
                                            <Input {...register("arquivos")} type="file" multiple accept=".jpg, .png, .zip, .rar, .pdf, .docx, .xls, .xlxs" style={{ display: "none" }} />
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
                                        className="px-4 max-[360px]:px-2 py-1.5 text-xs md:text-sm text-[#135C04] bg-(--weakGreen) rounded-md hover:bg-(--mediumGreen) transition-colors cursor-pointer" onClick={handleSendAction}>
                                        Enviar
                                    </Button>
                                </div>
                            </form>
                        </div>

                        <div className="w-full">
                            {ticket > 0 ? <ActionHistory /> : <div></div>}
                        </div>
                    </div>
                </ScrollArea>
            </div>

            <form className="flex row-span-7 h-full">
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
                                    <Dropdown dados={{ keyDropdown: "exemplo", values: valoresDropdown, label: "Usuário Responsável", control: control, name: "idUsuarioResponsavel" }} />
                                    <Dropdown dados={{ keyDropdown: "exemplo2", values: valoresDropdown, label: "Equipe Responsável", control: control, name: "idEquipe" }} />
                                    <Dropdown dados={{ keyDropdown: "exemplo3", values: valoresDropdown, label: "Requisitante", control: control, name: "idUsuario" }} />
                                    <div id="urgencyOpts" className="flex flex-col gap-2">
                                        <Label htmlFor="urgencies">Urgência</Label>
                                        <RadioGroup defaultValue="1" {...register("urgencia")} id="urgencies" className="flex justify-evenly">
                                            <RadioGroupItem
                                                value="1"
                                                id="baixa"
                                                className="sr-only peer"
                                            />
                                            <Label htmlFor="baixa" onClick={(event) => handleSelectedChange(event, "urgencyOpts")} className="md:px-6 px-5 py-1.5 text-xs md:text-sm text-gray-600 rounded-md bg-(--weakGreen) hover:bg-(--mediumGreen) transition-colors cursor-pointer">
                                                Baixa
                                            </Label>
                                            <RadioGroupItem
                                                value="2"
                                                id="media"
                                                className="sr-only peer"
                                            />
                                            <Label htmlFor="media" onClick={(event) => handleSelectedChange(event, "urgencyOpts")} className="md:px-6 px-5 py-1.5 text-xs md:text-sm text-gray-600 bg-[#f6ff0092] rounded-md hover:bg-[#f6ff00dc] transition-colors cursor-pointer selected">
                                                Média
                                            </Label>
                                            <RadioGroupItem
                                                value="3"
                                                id="alta"
                                                className="sr-only peer"
                                            />
                                            <Label htmlFor="alta" onClick={(event) => handleSelectedChange(event, "urgencyOpts")} className="md:px-6 px-5 py-1.5 text-xs md:text-sm text-gray-600 bg-[#ff080094] rounded-md hover:bg-[#ff0800b1] transition-colors cursor-pointer">
                                                Alta
                                            </Label>
                                        </RadioGroup>
                                    </div>
                                    <DatePicker {...register("previsaoSolucao")} dados={{ label: "Previsão de Solução", disabledPastDays: true }} />
                                    <div className="flex flex-col gap-1.5 cursor-not-allowed">
                                        <Label>Fechamento do Chamado</Label>
                                        <Input className="bg-white" type="text" disabled></Input>
                                    </div>
                                    <div className="flex flex-col gap-1.5 cursor-not-allowed">
                                        <Label>Usuário do Fechamento</Label>
                                        <Input className="bg-white" type="text" disabled></Input>
                                    </div>

                                    {ticket > 0 && <Button className="bg-(--weakGreen) text-[#135C04] hover:bg-[#3eff0090] cursor-pointer">Finalizar Ticket</Button>}
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