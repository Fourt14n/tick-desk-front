import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "../ui/label"

interface Data{
    dados: DropdownProperties
}

export interface DropdownProperties{
    classes?: string,
    keyDropdown: string,
    label: string,
    values: Array<DropDownValues>
}

export interface DropDownValues{
    label: string,
    value: string
}

export function Dropdown({dados} : Data) {
  return (
    <div className="flex flex-col gap-1.5 p-2">
      <Label className="font-semibold" htmlFor={dados.keyDropdown}>{dados.label}</Label>
      <Select>
        <SelectTrigger id={dados.keyDropdown} className={`${dados.classes} cursor-pointer bg-white w-full`}>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
              {dados.values.map(item => {
                  return (
                      <SelectItem value={item.value}>{item.label}</SelectItem>
                  )
              })}
        </SelectContent>
      </Select>
    </div>
  )
}
