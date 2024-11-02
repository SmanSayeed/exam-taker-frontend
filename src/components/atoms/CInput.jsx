import React, { useState } from 'react';
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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

    return (
        <div className="space-y-1">
            <div className="flex items-center justify-between">
                <Label htmlFor={name} className="text-md font-bold">{label}</Label>
                <Button
                    type="button"
                    onClick={() => setIsRichText(!isRichText)}
                    className="text-sm"
                >
                    {isRichText ? "Switch to Text" : "Switch to Rich Text"}
                </Button>
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
