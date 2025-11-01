import type { DropDownValues } from "../Dropdown/Dropdown";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type DropdownProps = {
    dados: DadosProps,
    value: any,
    onChange: (value: any) => void
}

type DadosProps =
    {
        classes?: string,
        defaultValue?: any,
        keyDropdown: string,
        label: string,
        values: Array<DropDownValues> | undefined,
    }

export function DropdownStandalone({ dados, value, onChange }: DropdownProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <Label className="font-semibold" htmlFor={dados.keyDropdown}>
                {dados.label}
            </Label>
            <Select
                value={value}
                onValueChange={(newValue) => onChange(newValue)}
                defaultValue={dados.defaultValue}
            >
                <SelectTrigger
                    id={dados.keyDropdown}
                    className={`${dados.classes} cursor-pointer bg-white w-full`}
                >
                    <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                    {dados.values?.map((item: any) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}