import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { showError } from "@/hooks/useToast";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";

export default function Ticket() {
    const navigate = useNavigate();
    let { id = '' } = useParams();

    if (!id) {
        showError("Caminho inválido de ticket!");
        navigate("/Home");
    }

    const ticket = Number.isInteger(parseInt(id)) ? parseInt(id) : 0;

    return (
        <div className="grid grid-cols-15 grid-rows-5 h-full bg-(--bg-default)">
            <div className="grid col-span-14 row-span-10 h-full p-5 w-full">
                <div className="flex flex-col justify-center row-span-1">
                    <p className="text-(--text-strongGreen) font-bold">{ticket > 0 ? `Editar ticket ${ticket}` : `Criar um ticket`}</p>
                    <Separator className="bg-[#BAB9B9]" orientation="horizontal" />
                </div>
                <div className="flex min-h-full w-full row-span-5 relative border border-gray-300 rounded-lg bg-white">
                    {/* Textarea com scroll */}
                    <textarea
                        placeholder="Toca aqui e sua solicitação..."
                        className="w-full p-3 pb-15 border-none outline-none resize-none placeholder-gray-400 rounded-lg overflow-y-auto"
                        style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#cbd5e1 transparent'
                        }}
                    />

                    {/* Container dos botões - fixo na parte inferior */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-3 bg-white border-t border-gray-100 rounded-b-lg">
                        {/* Botões à esquerda */}
                        <div className="flex items-center space-x-2">
                            <button className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                                Público
                            </button>
                            <button className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                                Interno
                            </button>
                        </div>

                        {/* Botão à direita */}
                        <button
                            className="px-4 py-1.5 text-sm text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors"
                        >
                            Enviar
                        </button>
                    </div>
                </div>

                <div className="grid row-span-4">
                    <p>Minecraft</p>
                </div>
            </div>

            <div className="grid col-span-1 row-span-5 h-full">
                <Sheet modal={false}>
                    <SheetTrigger className="flex justify-end items-end h-(--height-mobile) bg-(--bg-divs)">
                        <div className="flex h-full justify-center cursor-pointer">
                            <ArrowLeft />
                        </div>
                    </SheetTrigger>
                    <SheetContent className="h-(--height-default) mt-[3rem]">
                        <div className="bg-(--bg-divs) h-(--height-mobile)">
                            teste
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}