import { ChevronDownIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import React from "react"
import { Label } from "../ui/label"
import { ptBR } from "date-fns/locale"

interface Data{
    dados: DatePickerProperties
}

interface DatePickerProperties{
    label: string,
    disabledPastDays?: boolean,
    disabledButton?: boolean
    noPlaceholder?: boolean
}
export default function DatePicker({dados} : Data) {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)

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
                    {date ? date.toLocaleDateString() : dados.noPlaceholder ? "" : "Selecione"}
                    {!dados.noPlaceholder && <ChevronDownIcon color="#A6B0BF"/>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    locale={ptBR}
                    disabled = {
                        dados.disabledPastDays 
                        && ((date) => date < new Date())
                    }
                    onSelect={(date) => {
                        setDate(date)
                        setOpen(false)
                    }}
                />
            </PopoverContent>
        </Popover>
        </div>
    )
}

