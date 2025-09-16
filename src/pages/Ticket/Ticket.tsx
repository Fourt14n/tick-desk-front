import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { showError } from "@/hooks/useToast";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ArrowLeft, ArrowRight, Paperclip } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "@/index.css";
import useConfirmation from "@/hooks/useConfirmation";
import ActionHistory from "@/components/ActionHistory/ActionHistory";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dropdown } from "@/components/Dropdown/Dropdown";
import { Label } from "@/components/ui/label";
import DatePicker from "@/components/DatePicker/DatePicker";

function handlePrivacyChange(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // Selecino o elemento anterior e removo a classe de selecionado
    var prevOption = document.querySelector(".selected");
    prevOption?.classList.remove("selected");

    // Seleciono o elemento clicado e adiciono a classe de selecionado
    var actualOption = event.target as HTMLButtonElement;
    actualOption.classList.add("selected");
}

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
    const [actionValue, setActionValue] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const confirmDialog = useConfirmation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    if (!id) {
        showError("Caminho inválido de ticket!");
        navigate("/Home");
    }

    function handleIconClick() {
        fileInputRef.current?.click();
    }

    function handleSendAction() {
        console.log(actionValue.trim())
        console.log(actionValue.trim() === "");
        if (actionValue.trim() === "") {
            showError("Não é possível enviar uma ação sem interação!");
            return;
        }

        if (actionValue.toUpperCase().includes("ANEXO") && fileInputRef.current?.files?.length === 0) {
            confirmDialog.open({
                title: "Confirma envio sem anexo?",
                description: "Você escreveu anexo na ação, mas não anexou nenhum arquivo, deseja enviar a ação assim mesmo?",
                onConfirm: () => console.log("Confirmado"),
                cancelText: "Não",
                confirmText: "Sim",
            });
        };
    }

    const ticket = Number.isInteger(parseInt(id)) ? parseInt(id) : 0;

    return (
        <div className="grid grid-rows-7 w-full bg-(--bg-default) grid-cols-[1fr_25px] md:grid-cols-[1fr_2rem]">
            <div className="row-span-7 h-full p-3 w-full">
                <ScrollArea className="w-full h-full">
                    <div className="flex flex-col min-h-full p-3 w-full space-y-3">
                        {/* Header */}
                        <div className="flex flex-col justify-center">
                            <p className="text-(--text-strongGreen) font-bold">{ticket > 0 ? `Editar Ticket` : `Criar um Ticket`}</p>
                            <Separator className="bg-[#BAB9B9]" orientation="horizontal" />
                        </div>

                        {/* Textarea container */}
                        <div className="flex min-h-[300px] w-full border border-gray-300 rounded-lg bg-white">
                            {/* Textarea com scroll */}
                            <div className="relative w-full">
                                <textarea
                                    value={actionValue}
                                    onChange={(event) => {
                                        setActionValue(event.target.value);
                                    }}
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
                                        <div className="flex items-center space-x-2 max-[360px]:space-x-1">
                                            <button onClick={(event) => handlePrivacyChange(event)} className="px-3 py-1.5 text-xs md:text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors cursor-pointer selected">
                                                Público
                                            </button>
                                            <button onClick={(event) => handlePrivacyChange(event)} className="px-3 py-1.5 text-xs md:text-sm text-[#135C04] bg-(--weakGreen) border border-gray-300 rounded-md hover:bg-(--mediumGreen) transition-colors cursor-pointer">
                                                Interno
                                            </button>
                                        </div>
                                        <div>
                                            <Input ref={fileInputRef} type="file" multiple accept=".jpg, .png, .zip, .rar, .pdf, .docx, .xls, .xlxs" style={{ display: "none" }} />
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
                                    <button
                                        className="px-4 py-1.5 text-xs md:text-sm text-[#135C04] bg-(--weakGreen) rounded-md hover:bg-(--mediumGreen) transition-colors cursor-pointer" onClick={handleSendAction}>
                                        Enviar
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="w-full">
                            {ticket > 0 ? <ActionHistory /> : <div></div>}
                        </div>
                    </div>
                </ScrollArea>
            </div>

            <div className="flex row-span-7 h-full">
                <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen} modal={false}>
                    <SheetTrigger className="flex justify-end items-end h-(--height-mobile) bg-(--bg-divs)">
                        <div className="flex h-full w-full justify-center cursor-pointer pt-4">
                            <ArrowLeft />
                        </div>
                    </SheetTrigger>
                    <SheetContent className="h-(--height-default) mt-[3rem] [&>button]:hidden">
                        <div className="bg-(--bg-divs) h-(--height-mobile)">
                            <div className="p-4">
                                <ArrowRight cursor={"pointer"} onClick={() => setIsDialogOpen(false)} />
                            </div>

                            <div className="flex flex-col w-full p-2 gap-4">
                                <Dropdown dados={{ keyDropdown: "exemplo", values: valoresDropdown, label: "Usuário Responsável" }} />
                                <Dropdown dados={{ keyDropdown: "exemplo2", values: valoresDropdown, label: "Equipe Responsável" }} />
                                <Dropdown dados={{ keyDropdown: "exemplo3", values: valoresDropdown, label: "Requisitante" }} />
                                <DatePicker dados={{ label: "Previsão de Solução", disabledPastDays: true }} />
                                <div className="flex justify-between">
                                    <button onClick={(event) => handleUrgencyChange(event)} className="px-3 py-1.5 text-xs md:text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors cursor-pointer">
                                        Baixa
                                    </button>
                                    <button onClick={(event) => handleUrgencyChange(event)} className="px-3 py-1.5 text-xs md:text-sm text-[#135C04] bg-(--weakGreen) border border-gray-300 rounded-md hover:bg-(--mediumGreen) transition-colors cursor-pointer selected">
                                        Média
                                    </button>
                                    <button onClick={(event) => handleUrgencyChange(event)} className="px-3 py-1.5 text-xs md:text-sm text-[#135C04] bg-(--weakGreen) border border-gray-300 rounded-md hover:bg-(--mediumGreen) transition-colors cursor-pointer">
                                        Alta
                                    </button>
                                </div>
                            </div>

                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            {confirmDialog.DialogComponent}
        </div>
    )
}