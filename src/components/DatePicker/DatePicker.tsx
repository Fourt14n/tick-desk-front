import { ChevronDownIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import React from "react"
import { Label } from "../ui/label"
import { ptBR } from "date-fns/locale"
import { Controller, type Control } from "react-hook-form"

interface Data {
    dados: DatePickerProperties
}

interface DatePickerProperties {
    label: string,
    disabledPastDays?: boolean,
    disabledButton?: boolean
    noPlaceholder?: boolean
    control: Control<any>, // Passa o control ao invés do register
    name: string, // Nome do campo no formulário
    date: Date,
    defaultValue?: any
}
export default function DatePicker({ dados }: Data) {
    const [open, setOpen] = React.useState(false)

    return (
        <div className="flex flex-col gap-1.5">
            <Label className="font-semibold">{dados.label}</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        disabled={dados.disabledButton}
                        className="w-full justify-between cursor-pointer font-normal text-muted-foreground hover:text-muted-foreground hover:bg-white"
                    >
                        {dados.date ? dados.date.toLocaleDateString() : dados.noPlaceholder ? "" : "Selecione"}
                        {!dados.noPlaceholder && <ChevronDownIcon color="#A6B0BF" />}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Controller
                    control={dados.control}
                    name={dados.name}
                    render={({field}) => (
                        <Calendar
                        mode="single"
                        selected={dados.date}
                        captionLayout="dropdown"
                        locale={ptBR}
                        disabled={
                            dados.disabledPastDays
                            && ((date) => date < new Date())
                        }
                        onSelect={(date) => {
                            field.onChange(date);
                            setOpen(false)
                        }}                        
                    />
                    )}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

