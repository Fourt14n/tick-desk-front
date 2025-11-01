import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { onError } from "@/hooks/onError";
import { showAlert, showError } from "@/hooks/useToast";
import { consultaCNPJ } from "@/lib/axios";
import { EAction, type Action } from "@/types/EAction/EAction";
import type { ResponseCNPJA } from "@/types/ResponseCNPJA/ResponseCNPJA";
import { cnpjMask } from "@/utils/cnpjMask";
import { phoneMask } from "@/utils/phoneMask";
import { businessValidation } from "@/validations/business";
import { Info } from "lucide-react";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { useState } from "react";


export default function Business({ action }: Action) {
    const [step, setStep] = useState(0);

    const [dadosEmpresa, setDadosEmpresa] = useState({
        corporateName: '',
        fantasyName: '',
        cnpj: '',
        email: '',
        phone: ''
    });

    const handleChange = (campo: string, valor: string) => {
        setDadosEmpresa(prev => ({ ...prev, [campo]: valor }));
    };

    async function ConsultaCNPJ() {
        console.log("Veio consultar o CNPJ");
        try {
            var cnpjConsulta = await consultaCNPJ.get<ResponseCNPJA>(`office/${dadosEmpresa.cnpj}`);
            let consulta = cnpjConsulta.data;
            console.log("Consulta", consulta)
            handleChange("email", consulta?.emails.at(0)?.address || '')
            handleChange("corporateName", consulta?.company.name || '')
            handleChange("fantasyName", consulta?.alias || '')
            handleChange("phone", `${consulta?.phones.at(0)?.area}${consulta?.phones.at(0)?.number}` || '')
        } catch (erro : any) {
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
        else if(dadosEmpresa.cnpj.trim().length > 0)
            showAlert("Para a pesquisa o CNPJ deve estar completo!");
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
                        <Stepper activeStep={step} className="w-11/12" linear={action === EAction.CREATE} >
                            <StepperPanel key={"BusinessCreating"} header="Cadastro da empresa">
                                <div className="flex flex-col gap-4 w-full p-5 bg-black/3 backdrop-blur-lg rounded-xl">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="">CNPJ
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
                                            onChange={(e) => handleChange("cnpj", e.target.value.replace(/\D/g, ''))}
                                            // Pra caso ele só cole o CNPJ
                                            onBlur={handleCNPJChanging}
                                            value={cnpjMask(dadosEmpresa.cnpj)}
                                            type="text"
                                            maxLength={18} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="">Razão social</Label>
                                        <Input value={dadosEmpresa.corporateName} onChange={(e) => handleChange("corporateName", e.target.value)} type="text" maxLength={200} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="">Nome fantasia</Label>
                                        <Input value={dadosEmpresa.fantasyName} onChange={(e) => handleChange("fantasyName", e.target.value)} type="text" maxLength={200} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="">E-mail</Label>
                                        <Input value={dadosEmpresa.email} onChange={(e) => handleChange("email", e.target.value)} type="email" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="">Telefone</Label>
                                        <Input maxLength={15} value={phoneMask(dadosEmpresa.phone)} onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, ''))} type="text" />
                                    </div>
                                    <div className="flex py-4 gap-2 justify-end w-full">
                                        <Button 
                                        className="bg-(--weakGreen) w-42 text-[#135C04] hover:bg-[#3eff0090] cursor-pointer" type="button" 
                                        onClick={() => {
                                            try{
                                                businessValidation.parse(dadosEmpresa);
                                                setStep(step + 1);
                                            }catch(erro: any){
                                                onError(JSON.parse(erro));
                                            }
                                        }}>Avançar</Button>
                                    </div>
                                </div>
                            </StepperPanel>
                            <StepperPanel key={"TeamCreating"} header="Cadastro de equipes">
                                <div className="flex gap-3 justify-end w-full">
                                    <Button variant={"secondary"} className="w-30 md:w-42 cursor-pointer" type="button" onClick={() => setStep(step - 1)}>Voltar</Button>
                                    <Button className="bg-(--weakGreen) w-30 md:w-42 text-[#135C04] hover:bg-[#3eff0090] cursor-pointer" type="button" onClick={() => setStep(step + 1)}>Avançar</Button>
                                </div>
                            </StepperPanel>
                            <StepperPanel key={"UserCreating"} header="Cadastro de usuários">

                            </StepperPanel>
                        </Stepper>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}