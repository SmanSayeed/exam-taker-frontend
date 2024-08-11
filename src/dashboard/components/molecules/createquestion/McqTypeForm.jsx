import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCreateMcqQuestionMutation } from "@/features/questions/mcqQuestionsApi";
import { useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { toast } from "sonner";

export const McqTypeForm = ({ questionId }) => {
    const {
        formState: { errors },
        control,
        setError,
        handleSubmit
    } = useForm();

    const [isCorrect, setIsCorrect] = useState(false);

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

    const [createMcqQuestion, { data, isSuccess, isLoading, error }] = useCreateMcqQuestionMutation();

    const handleCreate = (formData) => {
        const payload = {
            mcq_question_text: formData.mcq_question_text,
            description: formData.explanation,
            question_id: questionId,
            is_correct: isCorrect
        }
        createMcqQuestion(payload)
    }

    useEffect(() => {
        if (error?.data) {
            toast.error(error?.data?.message);

            setError("root.random", {
                type: "random",
                message: `Something went wrong: ${error?.data?.message}`
            });
        }

        if (isSuccess && data?.data) {
            toast.success(data?.message);
        }
    }, [error, setError, isSuccess, data]);

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
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="is_Correct"
                        checked={isCorrect}
                        onCheckedChange={(checked) => setIsCorrect(checked)}
                    />
                    <label
                        htmlFor="is_Correct"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Is Correct
                    </label>
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

                <div className="flex gap-4">
                    <div className="text-right">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving" : "Save"}
                        </Button>
                    </div>
                    <div className="text-right">
                        <Button type="button">
                            New Option
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}
