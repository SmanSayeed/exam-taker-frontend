import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller } from "react-hook-form";

const CustomSelect = ({ label, categoryData, control }) => {
    let req = { required: `${label} is required` };
    if(label === "years") req = false
    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            <Controller
                name={label}
                control={control}
                {...(req && { rules: req })}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
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