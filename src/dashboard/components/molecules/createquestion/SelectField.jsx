import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { XIcon } from "lucide-react";
import { Controller } from "react-hook-form";

const SelectField = ({
    label,
    name,
    control,
    options = [],
    placeholder,
    onChange,
    rules = {},
    onRemove,
    defaultValue,
    disabled = false,
}) => {
    // const [isVisible, setIsVisible] = useState(true);

    // const handleRemoveField = () => {
    //     // setIsVisible(false);
    //     if (onRemove) onRemove();
    // };

    // if (!isVisible) return null;

    return (
        <div className="border py-1.5 px-3 rounded-md ">
            <div className="w-full flex flex-col space-y-1 ">
                <Label className="text-md font-semibold ">{label}</Label>
                
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    defaultValue={defaultValue}
                    className="border-4 flex"
                    render={({ field, formState: { errors } }) => (
                        <div className="flex items-center justify-between gap-2">
                            <div>
                                <Select
                                    onValueChange={(val) => {
                                        field.onChange(val)
                                        if (onChange) onChange(val)
                                    }}
                                    value={field.value || ""}
                                    disabled={disabled}
                                    className="w-[100%] "
                                >
                                    <SelectTrigger className="w-[100%] ">
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
                            </div>
                            {field.value && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (onRemove) onRemove();
                                    }}
                                    className="p-2 rounded-full bg-gray-200 hover:bg-red-200 text-gray-500 hover:text-red-500"
                                    aria-label={`Clear ${label}`}
                                >
                                    <XIcon className="w-5 h-5" aria-hidden="true" />
                                </button>
                            )}


                        </div>
                    )}
                />
            </div>
        </div>
    );
}
export default SelectField;