import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export const AddOption = () => {
    const {
        formState: { errors },
        control,
        handleSubmit
    } = useForm();

    const [options, setOptions] = useState([{ text: "", is_correct: "false", explanation: "" }]);

    const handleAddOption = () => {
        setOptions([...options, { text: "", is_correct: "false", explanation: "" }]);
    };

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['link', 'formula'],
        [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
    ];
    const module = {
        toolbar: toolbarOptions
    };

    const handleCreate = (formData) => {
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit(handleCreate)}>
            <div className="space-y-6 mt-4">
                {/* Dynamic Options */}
                {options.map((option, index) => (
                    <div key={index} className="space-y-4 border p-4">
                        <div className="space-y-2">
                            <Label htmlFor={`option-${index}`}>MCQ Question Text</Label>
                            <Controller
                                name={`options[${index}].text`}
                                control={control}
                                render={({ field }) => (
                                    <ReactQuill
                                        theme="snow"
                                        value={field.value}
                                        onChange={field.onChange}
                                        modules={module}
                                    />
                                )}
                            />
                            {errors.options?.[index]?.text && (
                                <span className="text-red-600">{errors.options[index].text.message}</span>
                            )}
                        </div>

                        <div className="flex gap-4 items-center">
                            <Label>Is Correct: </Label>
                            <Controller
                                name={`options[${index}].is_correct`}
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        className="flex gap-2"
                                        value={field.value}
                                        onValueChange={(value) => field.onChange(value)}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="true" id={`true-${index}`} />
                                            <Label htmlFor={`true-${index}`}>true</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="false" id={`false-${index}`} />
                                            <Label htmlFor={`false-${index}`}>false</Label>
                                        </div>
                                    </RadioGroup>
                                )}
                            />
                            {errors.options?.[index]?.is_correct && (
                                <span className="text-red-600">{errors.options[index].is_correct.message}</span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor={`explanation-${index}`}>Explanation</Label>
                            <Controller
                                name={`options[${index}].explanation`}
                                control={control}
                                render={({ field }) => (
                                    <ReactQuill
                                        theme="snow"
                                        value={field.value}
                                        onChange={field.onChange}
                                        modules={module}
                                    />
                                )}
                            />
                            {errors.options?.[index]?.explanation && (
                                <span className="text-red-600">{errors.options[index].explanation.message}</span>
                            )}
                        </div>
                    </div>
                ))}

                <div className="flex gap-4">
                    <div className="text-right">
                        <Button type="button">
                            Save
                        </Button>
                    </div>
                    <div className="text-right">
                        <Button type="button" onClick={handleAddOption}>
                            New Option
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
};
