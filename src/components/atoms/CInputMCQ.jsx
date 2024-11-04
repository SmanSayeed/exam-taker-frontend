import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Keyboard, KeyboardOff } from 'lucide-react';
import { useState } from 'react';
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function CInputMcq({ name, label, control, rules, errors, isCorrect, setIsCorrect, optionIndex }) {
    const [isRichText, setIsRichText] = useState(false);

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
    ];
    const modules = { toolbar: toolbarOptions };

    const iconStyle = `text-lg rounded-full hover:text-gray-700 cursor-pointer ${isRichText ? 'text-gray-600' : 'text-gray-400'}`;

    return (
        <div className="w-full">
            <div className="flex items-center justify-between my-1 py-1">
                <div className="flex items-center gap-2">
                    <Label htmlFor={name} className="font-bold mb-1.5">{label}</Label>
                    <span onClick={() => setIsRichText(!isRichText)}>
                        {isRichText ? <KeyboardOff className={iconStyle} /> : <Keyboard className={iconStyle} />}
                    </span>
                </div>

                {/* Is Correct Checkbox */}
                {
                    label !== "Explanation" && (
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id={`is_Correct_${optionIndex}`}
                                checked={isCorrect}
                                onCheckedChange={setIsCorrect}
                            />
                            <label
                                htmlFor={`is_Correct_${optionIndex}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Is Correct
                            </label>
                        </div>
                    )
                }
            </div>

            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    isRichText ? (
                        <ReactQuill
                            theme="snow"
                            value={field.value || ""}
                            onChange={field.onChange}
                            modules={modules}
                            placeholder={`Enter ${label.toLowerCase()}`}
                        />
                    ) : (
                        <Input
                            id={name}
                            {...field}
                            placeholder={`Enter ${label.toLowerCase()}`}
                            className="border rounded-lg px-3 py-2 w-full"
                        />
                    )
                )}
            />
            {errors?.[name] && <span className="text-red-600">{errors[name].message}</span>}
        </div>
    );
}
