import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { showError } from "@/hooks/useToast";
import { useNavigate, useParams } from "react-router";

export default function Ticket() {
    const navigate = useNavigate();
    let { id = '' } = useParams();

    if (!id) {
        showError("Caminho inválido de ticket!");
        navigate("/Home");
    }
    console.log(id);

    const ticket = Number.isInteger(parseInt(id)) ? parseInt(id) : 0;

    return (
        <div className="grid grid-cols-4">
            <div className="grid col-span-3">
                <p>{ticket > 0 ? `Editar ticket ${ticket}` : `Criar um ticket`}</p>

            </div>
            <div className="grid col-span-1">
                <Sheet modal={false}>
                    <SheetTrigger>Open</SheetTrigger>
                    <SheetContent className="h-(--height-default) mt-[3rem]">
                        <div>
                            <p>Teste</p>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}