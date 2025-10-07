import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { onError } from "@/hooks/onError";
import { team } from "@/validations/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import type z from "zod";

type Team = z.infer<typeof team>;

export default function Team() {
    const { handleSubmit, register } = useForm({
        resolver: zodResolver(team)
    });

    function OnSubmit() {

    }

    return (
        <div className="flex h-full w-full">
            <ScrollArea className="w-full h-full p-4">
                <div className="flex flex-col w-full">
                    <div className="flex flex-col justify-center">
                        <p className="text-(--text-strongGreen) font-bold">Cadastro de equipe</p>
                        <Separator className="bg-[#BAB9B9]" orientation="horizontal" />
                    </div>
                </div>
                <form onSubmit={handleSubmit(OnSubmit, onError)} className="flex h-full w-full flex-col justify-evenly lg:justify-between pt-4 lg:py-10">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex flex-col w-full gap-2">
                                <Label htmlFor="txtName">Nome da equipe</Label>
                                <Input {...register("name")} maxLength={255} className="text-sm" placeholder="Nome da equipe" type="text" id="txtName" />
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full justify-end gap-2 flex-col py-2 lg:flex-row">
                        <Button type="submit" className="bg-(--weakGreen) w-full lg:w-42 text-[#135C04] hover:bg-[#3eff0090] cursor-pointer">Cadastrar</Button>
                        <Link to="/Listagem/Teams">
                            <Button variant={"destructive"} type="submit" className="w-full lg:w-42 cursor-pointer">Voltar</Button>
                        </Link>
                    </div>

                </form>
            </ScrollArea>
        </div>
    )
}