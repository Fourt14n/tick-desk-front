import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { onError } from "@/hooks/onError";
import { showError, showSucces } from "@/hooks/useToast";
import { api } from "@/lib/axios";
import { cnpjMask } from "@/utils/cnpjMask";
import { phoneMask } from "@/utils/phoneMask";
import { businessEditValidation, businessValidation } from "@/validations/business";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import type z from "zod";

type BusinessEdit = z.infer<typeof businessEditValidation>;
type Business = z.infer<typeof businessValidation>;

export default function Business() {
    const { id = "" } = useParams();
    const { register, reset, watch, handleSubmit, formState: { isSubmitting } } = useForm({
        resolver: zodResolver(businessEditValidation)
    })
    const navigate = useNavigate();

    const { data: business } = useQuery({
        queryKey: ["business", id],
        refetchOnWindowFocus: false,
        queryFn: () => SelectBusinessById()
    })

    function EditBusiness(data: BusinessEdit) {
        return api.post(`api/enterprise/update/${id}`, data)
            .then(() => {
                showSucces("Empresa atualizada com sucesso!");
                navigate("/Listagem/Business");
            })
            .catch(erro => showError(erro.response.data.error))
    }

    function SelectBusinessById() : Promise<Business>{
        return api.get(`api/enterprise/get/${id}`)
        .then(res => {
            // Faço o reset pra conseguir pegar sempre o value do formState
            reset({
                email: res.data.email,
                fantasyName: res.data.fantasyName,
                phone: res.data.phone
            })
            return res.data;
        })
        .catch(erro => showError(erro.response.data.error))
    }

    return (
        <form onSubmit={handleSubmit(EditBusiness, onError)} className="flex h-full w-full p-5">
            <ScrollArea className="flex w-full h-full flex-col">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col justify-center">
                            <p className="text-(--text-strongGreen) font-bold">Cadastro de empresa</p>
                            <Separator className="bg-[#BAB9B9]" orientation="horizontal" />
                        </div>
                    </div>
                    <div className="flex w-full h-full justify-center">
                        <div className="flex flex-col gap-4 w-full p-5">
                            <div className="flex flex-col gap-2">
                                <Label className="font-bold" htmlFor="">CNPJ</Label>
                                <Input
                                    disabled
                                    value={cnpjMask(business?.cnpj || '')}
                                    className="bg-white"
                                    type="text"
                                    maxLength={18} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label className="font-bold" htmlFor="">Razão social</Label>
                                <Input value={business?.corporateName} disabled className="bg-white" type="text" maxLength={200} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label className="font-bold" htmlFor="">Nome fantasia</Label>
                                <Input {...register("fantasyName")} className="bg-white" type="text" maxLength={200} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label className="font-bold" htmlFor="">E-mail</Label>
                                <Input {...register("email")} className="bg-white" type="email" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label className="font-bold" htmlFor="">Telefone</Label>
                                <Input value={phoneMask(watch("phone"))} {...register("phone")} className="bg-white" maxLength={15} type="text" />
                            </div>
                            <div className="flex py-4 gap-2 justify-end w-full">
                                <Link to="/Listagem/Business">
                                    <Button variant={"destructive"} type="submit" className="w-32 lg:w-42 cursor-pointer">Voltar</Button>
                                </Link>
                                <Button className="bg-(--weakGreen) w-32 lg:w-42 text-[#135C04] hover:bg-[#3eff0090] cursor-pointer" type="submit">Atualizar</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </form>
    )

}