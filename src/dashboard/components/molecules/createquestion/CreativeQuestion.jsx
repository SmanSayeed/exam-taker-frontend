import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCreateCreativeQuestionMutation, useDeleteCreativeQuestionMutation, useEditCreativeQuestionMutation } from "@/features/questions/creativeQuestionsApi";
import { useEffect } from "react";

import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { toast } from "sonner";

const CreativeQuestion = ({ questionId, questionIndex }) => {
    const {
        formState: { errors },
        control,
        setError,
        reset,
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

    const [createCreativeQuestion, { data, isSuccess, isLoading, error }] = useCreateCreativeQuestionMutation();
    const [deleteCreativeQuestion, { isLoading: isdDeleting }] = useDeleteCreativeQuestionMutation();
    const [editCreativeQuestion, { isLoading: isEditing }] = useEditCreativeQuestionMutation();

    const handleCreate = (formData) => {
        const payload = {
            creative_question_text: formData.creative_question_text,
            description: formData.explanation,
            question_id: questionId,
            creative_question_type: formData.creative_que_type
        };
        createCreativeQuestion(payload);
    };

    const handleDelete = async (event) => {
        event.preventDefault()

        try {
            const response = await deleteCreativeQuestion(data?.data?.id).unwrap();
            toast.success(response?.message);

            reset();
        } catch (err) {
            toast.error(err?.data?.message || "An error occurred");
        }
    }

    const handleEdit = async (formData) => {
        const payload = {
            creative_question_text: formData.creative_question_text,
            description: formData.explanation,
            question_id: questionId,
            creative_question_type: formData.creative_que_type
        };

        try {
            const response = await editCreativeQuestion({ id: data?.data?.id, data: payload }).unwrap();
            toast.success(response?.message);
        } catch (err) {
            toast.error(err?.data?.message || "An error occurred");
        }
    }

    useEffect(() => {
        if (error?.data) {
            toast.error(`Question ${questionIndex + 1}: ${error?.data?.message}`);
            setError("root.random", {
                type: "random",
                message: `Something went wrong: ${error?.data?.message}`
            });
        }

        if (isSuccess && data?.data) {
            toast.success(`Question ${questionIndex + 1}: ${data?.message}`);
        }
    }, [error, setError, isSuccess, data, questionIndex]);

    return (
        <form onSubmit={handleSubmit(handleCreate)}>
            <div className="space-y-6 mt-4">
                {/* creative_question_text */}
                <div className="space-y-2">
                    <Label htmlFor="title">Creative Question Text</Label>
                    <Controller
                        name="creative_question_text"
                        control={control}
                        rules={{ required: "Creative Question Text is required" }}
                        render={({ field }) => (
                            <ReactQuill
                                theme="snow"
                                value={field.value}
                                onChange={field.onChange}
                                modules={module}
                            />
                        )}
                    />
                    {errors.creative_question_text && <span className="text-red-600">{errors.creative_question_text.message}</span>}
                </div>

                {/* creative question type */}
                <div className="flex gap-4 items-center">
                    <Label>Creative Question Type: </Label>
                    <div>
                        <Controller
                            name="creative_que_type"
                            control={control}
                            rules={{ required: "Creative question type is required" }}
                            render={({ field }) => (
                                <RadioGroup
                                    className="flex gap-4"
                                    value={field.value}
                                    onValueChange={(value) => field.onChange(value)}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="a" id="a" />
                                        <Label htmlFor="a">A</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="b" id="b" />
                                        <Label htmlFor="b">B</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="c" id="c" />
                                        <Label htmlFor="c">C</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="d" id="d" />
                                        <Label htmlFor="d">D</Label>
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

                {/* <div>
                    {
                        isSuccess && data?.data ? (
                            <Button
                                type="button"
                                onClick={handleSubmit(handleEdit)}
                                disabled={isEditing}
                            >
                                {`Edit Question ${questionIndex + 1}`}
                            </Button>
                        ) : (
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Saving" : `Save Question ${questionIndex + 1}`}
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
                </div> */}
            </div>
        </form>
    )
}

export default CreativeQuestion