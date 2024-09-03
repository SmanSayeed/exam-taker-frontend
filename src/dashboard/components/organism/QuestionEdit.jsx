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

import { useEditQuestionMutation, useGetSingleQuestionsQuery } from "@/features/questions/questionsApi";
import { useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { CreativeQuestions } from "../molecules/createquestion/CreativeQuestions";
import { McqOptions } from "../molecules/createquestion/McqOptions";
import SelectCategory from "../molecules/createquestion/SelectCategory";

const QuestionEdit = () => {
    const [statusCheck, setStatusCheck] = useState(true);
    const [isPaid, setIsPaid] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);
    const [options, setOptions] = useState([0, 1, 2, 3]);
    const [correctOptions, setCorrectOptions] = useState([]);
    const [creativeQueTypes, setCreativeQueTypes] = useState([0, 1, 2]);

    const location = useLocation();
    const { id: question_id, } = location.state || {};

    const [editQuestion, { isLoading: isUpdating }] = useEditQuestionMutation();
    const { data: questionData, isLoading, error } = useGetSingleQuestionsQuery(question_id);

    const [defaultValues, setDefaultValues] = useState({
        title: "",
        description: "",
        type: "",
        mark: "",
        mcq_options: [],
        creative_questions: [],
        categories: {}
    });

    useEffect(() => {
        console.log('Question Data:', questionData);
        if (questionData && questionData?.data) {
            const { title, description, type, mark, mcq_questions, creative_questions, attachable: categoriesData } = questionData.data;

            setDefaultValues({
                title: title || "",
                description: description || "",
                type: type || "",
                mark: mark || "",
                mcq_options: mcq_questions || [],
                creative_questions: creative_questions || [],
                categories: categoriesData || {}
            });
        }
    }, [questionData]);

    const {
        register,
        formState: { errors },
        control,
        handleSubmit,
        setValue
    } = useForm({
        defaultValues
    });

    useEffect(() => {
        if (defaultValues) {
            Object.entries(defaultValues).forEach(([key, value]) => {
                setValue(key, value);
            });
        }
    }, [defaultValues, setValue]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

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

    const handleUpdate = async (formData) => {
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

        const creativeQuestions = creativeQueTypes.map((queTypeIndex) => {
            const queText = formData[`creative_question_text${queTypeIndex}`];
            const explanation = formData[`explanation${queTypeIndex}`] || null;
            const queType = formData[`creative_que_type${queTypeIndex}`];

            return {
                creative_question_text: queText,
                creative_question_type: queType,
                description: explanation
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
            creative_options: creativeQuestions,
            categories: categoriesPayload
        };

        try {
            const response = await editQuestion({ id: question_id, data: payload }).unwrap();
            toast.success(response?.message);
        } catch (err) {
            toast.error(err?.data?.message || "An error occurred");
        }
    };

    return (
        <form onSubmit={handleSubmit(handleUpdate)} id="question-form">
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
                                value={field.value}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={field.value} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={questionData?.data?.type}>{questionData?.data?.type}</SelectItem>
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
                {defaultValues.type === "mcq" && (
                    <McqOptions
                        control={control}
                        options={options}
                        setOptions={setOptions}
                        correctOptions={correctOptions}
                        setCorrectOptions={setCorrectOptions}
                    />
                )}

                {/* creative question */}
                {defaultValues.type === "creative" && (
                    <CreativeQuestions
                        control={control}
                        creativeQueTypes={creativeQueTypes}
                        setCreativeQueTypes={setCreativeQueTypes}
                    />
                )}

                {/* select category */}
                <SelectCategory control={control} defaultValues={defaultValues.categories} />

                <Button
                    disabled={isUpdating}
                    className="w-full"
                >
                    {isUpdating ? "Updating..." : "Update"}
                </Button>
            </div>
        </form>
    )
}
export default QuestionEdit