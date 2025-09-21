import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router";


export default function Listagem() {
    let { tipo = '' } = useParams();

    return (
        <div className="flex w-full h-full">
            <ScrollArea className="w-full h-full">
            <div className="flex flex-col min-h-full p-3 w-full space-y-3">
                <div className="flex flex-col justify-center">
                    <p className="text-(--text-strongGreen) font-bold">{tipo}</p>
                    <Separator className="bg-[#BAB9B9]" orientation="horizontal" />
                </div>
            </div>
        </ScrollArea>
        </div>
    )
}