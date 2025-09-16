import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SelectGroup, SelectLabel } from "@radix-ui/react-select"

interface Data{
    dados: DropdownProperties
}

export interface DropdownProperties{
    classes: string,
    placeholder: string,
    values: Array<DropDownValues>
}

export interface DropDownValues{
    label: string,
    value: string
}

export function Dropdown({dados} : Data) {
  return (
    <Select>
      <SelectTrigger className={`${dados.classes} cursor-pointer`}>
        <SelectValue placeholder={dados.placeholder} />
      </SelectTrigger>
      <SelectContent>
            {dados.values.map(item => {
                return (
                    <SelectItem value={item.value}>{item.label}</SelectItem>
                )
            })}
      </SelectContent>
    </Select>
  )
}
