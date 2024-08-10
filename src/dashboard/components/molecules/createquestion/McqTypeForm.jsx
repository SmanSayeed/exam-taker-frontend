import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export const McqTypeForm = () => {
    const {
        formState: { errors },
        control,
        handleSubmit
    } = useForm();

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
    }

    const handleCreate = (formData) => {
        console.log(formData)
    }

    return (
        <form onSubmit={handleSubmit(handleCreate)}>
            <div className="space-y-6 mt-4">
                {/* mcq_question_text */}
                <div className="space-y-2">
                    <Label htmlFor="title">MCQ Question Text</Label>
                    <Controller
                        name="mcq_question_text"
                        control={control}
                        rules={{ required: "MCQ Question Text is required" }}
                        render={({ field }) => (
                            <ReactQuill
                                theme="snow"
                                value={field.value}
                                onChange={field.onChange}
                                modules={module}
                            />
                        )}
                    />
                    {errors.mcq_question_text && <span className="text-red-600">{errors.mcq_question_text.message}</span>}
                </div>

                {/* is correct */}
                <div className="flex gap-4 items-center space-y-2">
                    <div>
                        <Label>Is Correct: </Label>
                    </div>
                    <div>
                        <Controller
                            name="is_correct"
                            control={control}
                            rules={{ required: "Is Corresct is required" }}
                            render={({ field }) => (
                                <RadioGroup
                                    className="flex gap-2"
                                    value={field.value}
                                    onValueChange={(value) => field.onChange(value)}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="true" id="true" />
                                        <Label htmlFor="true">true</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="false" id="false" />
                                        <Label htmlFor="false">false</Label>
                                    </div>
                                </RadioGroup>
                            )}
                        />
                        {errors.is_correct && <span className="text-red-600">{errors.is_correct.message}</span>}
                    </div>
                </div>

                {/* Explanation */}
                <div className="space-y-2">
                    <Label htmlFor="details">Explanation</Label>
                    <Controller
                        name="explanation"
                        control={control}
                        rules={{ required: "Explanation is required" }}
                        render={({ field }) => (
                            <ReactQuill
                                theme="snow"
                                value={field.value}
                                onChange={field.onChange}
                                modules={module}
                            />
                        )}
                    />
                    {errors.explanation && <span className="text-red-600">{errors.explanation.message}</span>}
                </div>

                <Button type="submit" className="w-full">
                    Create Question
                </Button>
            </div>
        </form>
    )
}
