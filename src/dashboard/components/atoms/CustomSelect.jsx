import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller } from "react-hook-form";

const CustomSelect = ({ label, categoryData, control }) => {

    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            <Controller
                name={label}
                control={control}
                rules={{ required: `${label} is required` }}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder={label} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                categoryData && categoryData.map(item => (
                                    <SelectItem key={item.id.toString()} value={item?.id.toString()}>
                                        {item?.title}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                )}
            />
        </div>
    )
}

export default CustomSelect