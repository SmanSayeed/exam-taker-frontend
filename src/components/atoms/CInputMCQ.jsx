import React, { useState } from 'react';
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Keyboard } from 'lucide-react';
import { KeyboardOff } from 'lucide-react';

export default function CInputMcq({ name, label, control, rules, errors }) {
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
        <div className="space-y-2 mb-4  ">
            <div className="flex items-center gap-2">
                <Label htmlFor={name} className="text-lg font-semibold">{label}</Label>
                <span onClick={() => setIsRichText(!isRichText)}>
                    {isRichText ? (
                        <KeyboardOff className={iconStyle} />
                    ) : (
                        <Keyboard className={iconStyle} />
                    )}
                </span>
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
                            className="border rounded-lg px-3 py-2"
                        />
                    )
                )}
            />
            {errors?.[name] && <span className="text-red-600">{errors[name].message}</span>}
        </div>
    );
}
