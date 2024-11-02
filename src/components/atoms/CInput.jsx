import React, { useState } from 'react';
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Keyboard } from 'lucide-react';
import { KeyboardOff } from 'lucide-react';

export default function CInput({ name, label, control, rules, errors }) {
    const [isRichText, setIsRichText] = useState(false);

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
    ];
    const modules = { toolbar: toolbarOptions };
    const iconStyle= `text-md rounded-lg hover:text-slate-600 cursor-pointer ${isRichText ? 'text-slate-500' : 'text-slate-300'}`;
    return (
        <div className="space-y-1">
            <div className="flex items-center justify-start gap-3">
                <Label htmlFor={name} className="text-md font-bold">{label}</Label>
                <span
                    onClick={() => setIsRichText(!isRichText)}
                  
                >
                    {isRichText ? <KeyboardOff className={iconStyle}/>:<Keyboard className={iconStyle} />}
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
                        />
                    ) : (
                        <Input
                            id={name}
                            {...field}
                            placeholder={`Enter ${label.toLowerCase()}`}
                        />
                    )
                )}
            />
            {errors?.[name] && <span className="text-red-600">{errors[name].message}</span>}
        </div>
    );
}
