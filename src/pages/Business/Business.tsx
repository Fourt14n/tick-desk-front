import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { Action } from "@/types/EAction/EAction";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { useRef, useState } from "react";


export default function Business({ action }: Action) {
    const [step, setStep] = useState(0);

    function ConsultaCNPJ(cnpj : string){
        
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
                        <Stepper activeStep={step} className="w-4/5" linear>
                            <StepperPanel key={"BusinessCreating"} header="Cadastro da empresa">
                                <div className="flex flex-col lg:w-1/2 gap-2">
                                    <Label htmlFor="">E-mail</Label>
                                    <Input type="email" />
                                </div>
                                <div className="flex py-4 gap-2 justify-end w-full">
                                    <Button className="bg-(--weakGreen) w-full lg:w-42 text-[#135C04] hover:bg-[#3eff0090] cursor-pointer" type="button" onClick={() => setStep(step + 1)}>Avançar</Button>
                                </div>
                            </StepperPanel>
                            <StepperPanel key={"TeamCreating"} header="Cadastro de equipes">
                                <div className="flex gap-3 justify-end w-full">
                                    <Button variant={"secondary"} className="w-full lg:w-42 cursor-pointer" type="button" onClick={() => setStep(step - 1)}>Voltar</Button>
                                    <Button className="bg-(--weakGreen) w-full lg:w-42 text-[#135C04] hover:bg-[#3eff0090] cursor-pointer" type="button" onClick={() => setStep(step + 1)}>Avançar</Button>
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