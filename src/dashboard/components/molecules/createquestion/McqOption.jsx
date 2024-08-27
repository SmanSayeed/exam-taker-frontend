import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import {
    useCreateMcqOptionMutation,
    useDeleteMcqOptionMutation,
    useEditMcqOptionMutation
} from "@/features/questions/mcqQuestionsApi";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const McqOption = ({ questionId, optionIndex }) => {
    const {
        formState: { errors },
        control,
        setError,
        handleSubmit,
        reset
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
    const module = { toolbar: toolbarOptions };

    const [isCorrect, setIsCorrect] = useState(false);

    const [createMcqOption, { data: optionData, isSuccess, isLoading, error }] = useCreateMcqOptionMutation();
    const [deleteMcqOption, { isLoading: isdDeleting }] = useDeleteMcqOptionMutation();
    const [editMcqOption, { isLoading: isEditing }] = useEditMcqOptionMutation();

    const handleCreate = (formData) => {
        const payload = {
            mcq_question_text: formData.mcq_question_text,
            description: formData.explanation,
            question_id: questionId,
            is_correct: isCorrect
        };
        createMcqOption(payload);
    };

    const handleEdit = async (formData) => {
        const payload = {
            mcq_question_text: formData.mcq_question_text,
            description: formData.explanation,
            question_id: questionId,
            is_correct: isCorrect
        };

        try {
            const response = await editMcqOption({ id: optionData?.data?.id, data: payload }).unwrap();
            toast.success(response?.message);
        } catch (err) {
            toast.error(err?.data?.message || "An error occurred");
        }
    }

    const handleDelete = async (event) => {
        event.preventDefault()

        try {
            const response = await deleteMcqOption(optionData?.data?.id).unwrap();
            toast.success(response?.message);

            // Clear the form and reset the isCorrect state
            reset();
            setIsCorrect(false);
        } catch (err) {
            toast.error(err?.data?.message || "An error occurred");
        }
    }

    useEffect(() => {
        if (error?.data) {
            toast.error(`Option ${optionIndex + 1}: ${error?.data?.message}`);
            setError("root.random", {
                type: "random",
                message: `Something went wrong: ${error?.data?.message}`
            });
        }

        if (isSuccess && optionData?.data) {
            toast.success(`Option ${optionIndex + 1}: ${optionData?.message}`);
        }
    }, [error, setError, isSuccess, optionData, optionIndex]);

    return (
        <form onSubmit={handleSubmit(handleCreate)} className="space-y-6 mt-4">
            {/* mcq_option_text */}
            <div className="space-y-2">
                <Label htmlFor={`mcq_question_text_${optionIndex}`}>MCQ Option Text</Label>
                <Controller
                    name={`mcq_question_text`}
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
                    id={`is_Correct_${optionIndex}`}
                    checked={isCorrect}
                    onCheckedChange={(checked) => setIsCorrect(checked)}
                />
                <label
                    htmlFor={`is_Correct_${optionIndex}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Is Correct
                </label>
            </div>

            {/* Explanation */}
            <div className="space-y-2">
                <Label htmlFor={`explanation_${optionIndex}`}>Explanation</Label>
                <Controller
                    name={`explanation`}
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

            <div>
                {
                    isSuccess && optionData?.data ? (
                        <Button
                            type="button"
                            onClick={handleSubmit(handleEdit)}
                            disabled={isEditing}
                        >
                            {`Edit Option ${optionIndex + 1}`}
                        </Button>
                    ) : (
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving" : `Save Option ${optionIndex + 1}`}
                        </Button>
                    )
                }
                <Button
                    type="button"
                    className="ml-4"
                    onClick={handleDelete}
                    disabled={isdDeleting}
                >
                    {isdDeleting ? "Deleting..." : "Delete"}
                </Button>
            </div>
        </form >
    );
};

export default McqOption;
