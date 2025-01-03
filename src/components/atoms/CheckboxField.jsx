import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export default function CheckboxField({ id, label, checked, onCheckedChange }) {
    return (
        <div className="flex items-center">
            <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={onCheckedChange}
            />
            <Label htmlFor={id} className="ml-2">
                {label}
            </Label>
        </div>
    );
}




