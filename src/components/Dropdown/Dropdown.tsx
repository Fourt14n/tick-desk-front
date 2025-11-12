import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "../ui/label"
import { Controller, type Control } from "react-hook-form"

interface Data {
  dados: DropdownProperties
}

export interface DropdownProperties {
  classes?: string,
  keyDropdown: string,
  autoSaveFunc?: (campo : string, value : string) => void,
  label: string,
  values: Array<DropDownValues> | undefined,
  control: Control<any>, // Passa o control ao invés do register
  name: string, // Nome do campo no formulário
  defaultValue?: any
  disabled?: boolean
}

export interface DropDownValues {
  label: string,
  value: string
}

export function Dropdown({ dados }: Data) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="font-semibold" htmlFor={dados.keyDropdown}>{dados.label}</Label>
      <Controller
        name={dados.name}
        control={dados.control}
        render={({ field }) => (
          <Select {...dados.control.register(dados.name)}
          disabled={dados.disabled}
            key={field.value}
            onValueChange={(value) => {
              field.onChange(value)
              if(dados.autoSaveFunc)
                dados.autoSaveFunc(dados.name, value);
            }}
            value={ field.value }
            defaultValue={dados.defaultValue}>
            <SelectTrigger
              id={dados.keyDropdown}
              className={`${dados.classes} cursor-pointer bg-white w-full`}
            >
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {dados.values?.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  )
}
