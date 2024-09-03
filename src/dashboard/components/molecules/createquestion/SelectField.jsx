import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

const SelectField = ({
    label,
    name,
    control,
    options = [],
    placeholder,
    onChange,
    rules = {},
    defaultValue,
    disabled = false,
}) => {
    // console.log("select options", options)
    return (
        <div className="grid gap-2">
            <Label className="text-md font-bold">{label}</Label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field, formState: { errors } }) => (
                    <>
                        <Select
                            onValueChange={(val) => {
                                field.onChange(val)
                                if (onChange) onChange(val)
                            }}
                            value={defaultValue || ""}
                            disabled={disabled}
                        >
                            <SelectTrigger className="w-[300px]">
                                <SelectValue placeholder={placeholder} aria-label={`${label} select`} />
                            </SelectTrigger>
                            <SelectContent>
                                {options && options.map((item) => (
                                    <SelectItem key={item?.id.toString()} value={item?.id.toString()}>
                                        {item?.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors[name] && <span className="text-red-600">{errors[name]?.message}</span>}
                    </>
                )}
            />
        </div>
    );
}

export default SelectField;
