import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { useCreateQuestionMutation, useEditQuestionMutation } from "@/features/questions/questionsApi";
import { useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux";
import { CreativeQuestionForm } from "./CreativeQuestionForm";
import { McqOptions } from "./McqOptions";
import SelectCategory from "./SelectCategory";

const QuestionCreateForm = () => {
    const [statusCheck, setStatusCheck] = useState(true);
    const [isPaid, setIsPaid] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);

    const question = useSelector(state => state.question);
    const { question_id, title, description, mark } = question;

    const [selectedType, setSelectedType] = useState("");

    const {
        register,
        formState: { errors },
        control,
        setError,
        setValue,
        handleSubmit
    } = useForm({
        defaultValues: {
            title: title || "",
            description: description || "",
            type: selectedType || "",
            mark: mark || ""
        }
    });

    const handleTypeChange = (val) => {
        setSelectedType(val);
        localStorage.setItem('questionType', val);
        setValue("type", val);
    };

    useEffect(() => {
        const storedType = localStorage.getItem('questionType');
        if (storedType) {
            setSelectedType(storedType);
            setValue("type", storedType);
        }
    }, [setValue]);

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

    const [createQuestion, { data, isSuccess, isLoading, error }] = useCreateQuestionMutation();
    const [editQuestion, { isLoading: isUpdating }] = useEditQuestionMutation();

    const [options, setOptions] = useState([0, 1, 2, 3]);
    const [correctOptions, setCorrectOptions] = useState([]);

    const handleCreate = (formData) => {
        const mcqOptions = options.map((optionIndex) => {
            const optionText = formData[`mcq_question_text${optionIndex}`];
            const explanation = formData[`explanation${optionIndex}`] || null;

            return {
                mcq_question_text: optionText,
                is_correct: correctOptions[optionIndex] || false,
                description: explanation,
                mcq_images: null
            };
        });

        const categoriesPayload = {
            section_id: formData.section,
            exam_type_id: formData.exam_type,
            exam_sub_type_id: formData.exam_sub_type,
            group_id: formData.group,
            level_id: formData.level,
            subject_id: formData.subject,
            lesson_id: formData.lesson,
            topic_id: formData.topic,
            sub_topic_id: formData.sub_topic,
            year_id: formData.year
        }

        const payload = {
            title: formData.title,
            description: formData.description,
            type: formData.type,
            mark: formData.mark,
            images: null,
            is_paid: isPaid,
            is_featured: isFeatured,
            status: statusCheck,
            mcq_options: mcqOptions,
            categories: categoriesPayload
        };
        console.log(payload)

        // createQuestion(payload);
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleCreate)} id="question-form">
                <div className="space-y-4 mt-4">
                    {/* Question Type */}
                    <div className="space-y-1">
                        <Label className="text-md font-bold">Question Type</Label>
                        <Controller
                            name="type"
                            control={control}
                            rules={{ required: "Type is required" }}
                            render={({ field }) => (
                                <Select
                                    onValueChange={(val) => {
                                        handleTypeChange(val)
                                        field.onChange(val)
                                    }}
                                    value={selectedType}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="normal">Normal</SelectItem>
                                        <SelectItem value="mcq">MCQ</SelectItem>
                                        <SelectItem value="creative">Creative</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.type && <span className="text-red-600">{errors.type.message}</span>}
                    </div>

                    {/* title */}
                    <div className="space-y-1">
                        <Label htmlFor="title" className="text-md font-bold">Title</Label>
                        <Controller
                            name="title"
                            control={control}
                            rules={{ required: "Title is required" }}
                            render={({ field }) => (
                                <ReactQuill
                                    theme="snow"
                                    value={field.value}
                                    onChange={field.onChange}
                                    modules={module}
                                />
                            )}
                        />
                        {errors.title && <span className="text-red-600">{errors.title.message}</span>}
                    </div>

                    {/* description */}
                    <div className="space-y-1">
                        <Label htmlFor="details" className="text-md font-bold">Description</Label>
                        <Controller
                            name="description"
                            control={control}
                            rules={{ required: "Description is required" }}
                            render={({ field }) => (
                                <ReactQuill
                                    theme="snow"
                                    value={field.value}
                                    onChange={field.onChange}
                                    modules={module}
                                />
                            )}
                        />
                        {errors.description && <span className="text-red-600">{errors.description.message}</span>}
                    </div>

                    {/* images(optional) later */}
                    <div className="space-y-1">
                        <Label htmlFor="picture" className="text-md font-bold">Picture</Label>
                        <Input
                            {...register("picture")}
                            id="picture"
                            type="file"
                            name="picture"
                            accept="image/jpeg, image/jpg, image/png"
                            className="dark:bg-gray-600"
                        />
                        {errors.picture && <span className="text-red-600">{errors.picture.message}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-8 space-y-1">
                        {/* is_paid */}
                        <div>
                            <Checkbox
                                id="is_paid"
                                checked={isPaid}
                                onCheckedChange={(checked) => setIsPaid(checked)}
                            />
                            <Label htmlFor="is_paid" className="ml-2">Paid</Label>
                        </div>

                        {/* is_featured */}
                        <div>
                            <Checkbox
                                id="is_featured"
                                checked={isFeatured}
                                onCheckedChange={(checked) => setIsFeatured(checked)}
                            />
                            <Label htmlFor="is_featured" className="ml-2">Featured</Label>
                        </div>
                    </div>

                    {/* marks */}
                    <div className="grid gap-2">
                        <Label htmlFor="mark" className="text-md font-bold">Marks</Label>
                        <Input
                            {...register("mark", { required: "Marks is Required" })}
                            id="mark"
                            name="mark"
                            type="number"
                            placeholder="5"
                        />
                        {errors.mark && <span className="text-red-600">{errors.mark.message}</span>}
                    </div>

                    {/* status */}
                    <div>
                        <Checkbox
                            id="status"
                            checked={statusCheck}
                            onCheckedChange={(checked) => setStatusCheck(checked)}
                        />
                        <Label htmlFor="status" className="ml-2">Status</Label>
                    </div>

                    {/* mcq question */}
                    {selectedType === "mcq" && (
                        <McqOptions
                            control={control}
                            options={options}
                            setOptions={setOptions}
                            correctOptions={correctOptions}
                            setCorrectOptions={setCorrectOptions}
                        />
                    )}
                    {/* creative question */}
                    {selectedType === "creative" && <CreativeQuestionForm questionId={question_id} />}

                    {/* select category */}
                    <SelectCategory control={control} />

                    {/* update button */}
                    {
                        title && (
                            <Button
                                type="button"
                                onClick={handleSubmit(handleUpdate)}
                                disabled={isUpdating}
                            >
                                {isUpdating ? "Updating..." : "Update"}
                            </Button>
                        )
                    }
                    {/* proceed button */}
                    <Button
                        disabled={isLoading}
                        type="submit"
                        className="w-full"
                    >
                        {isLoading ? "Proceeding" : "Create Question"}
                    </Button>
                </div>
            </form>
        </>
    )
}
export default QuestionCreateForm