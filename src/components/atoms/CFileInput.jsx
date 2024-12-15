import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";

export default function CFileInput({ name, label, control, rules, errors, onChange }) {
    return (
        <div className="space-y-1">
            <div className="flex items-center justify-start gap-3">
                <Label htmlFor={name} className="text-md font-bold">{label}</Label>
            </div>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <>
                        <Input
                            id={name}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                field.onChange(e.target.files[0]);
                                if (onChange) onChange(e);
                            }}
                        />
                        {errors?.[name] && <span className="text-red-600">{errors[name].message}</span>}
                    </>
                )}
            />
        </div>
    );
}
