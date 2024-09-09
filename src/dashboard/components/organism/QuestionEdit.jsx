import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { useGetSingleQuestionsQuery } from "@/features/questions/questionsApi";
import { useEffect, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { setSelectedExamSubType, setSelectedExamType, setSelectedGroup, setSelectedLesson, setSelectedLevel, setSelectedSection, setSelectedSubject, setSelectedSubTopic, setSelectedTopic, setSelectedYear } from "@/features/questions/selectedCategoriesSlice";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CreativeQuestions } from "../molecules/createquestion/CreativeQuestions";
import { McqOptions } from "../molecules/createquestion/McqOptions";
import SelectCategoryForEdit from "../molecules/questionedit/SelectCategoryForEdit";

export default function QuestionEdit() {
    const dispatch = useDispatch();
    const selectedCategories = useSelector((state) => state.selectedCategories);

    const [statusCheck, setStatusCheck] = useState(true);
    const [isPaid, setIsPaid] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);
    const [options, setOptions] = useState([0, 1, 2, 3]);
    const [correctOptions, setCorrectOptions] = useState([]);
    const [creativeQueTypes, setCreativeQueTypes] = useState([0, 1, 2]);

    const { questionId } = useParams();
    const { data: questionData } = useGetSingleQuestionsQuery(questionId);
    const [question, setQuestion] = useState({});

    const { type } = question || {};

    const {
        register,
        formState: { errors },
        control,
        setValue,
        handleSubmit,
        reset,
    } = useForm();

    useEffect(() => {
        if (questionData?.data) {
            const question = questionData.data;
            setQuestion(question);
            console.log("question", question)

            reset({
                title: question.title || "",
                description: question.description || "",
                type: question.type || "",
                mark: question.mark || ""
            });

            dispatch(setSelectedSection({ selectedSection: question.attachable?.section_id || "" }));
            dispatch(setSelectedExamType({ selectedExamType: question.attachable?.exam_type_id || "" }));
            dispatch(setSelectedExamSubType({ selectedExamSubType: question.attachable?.exam_sub_type_id || "" }));
            dispatch(setSelectedGroup({ selectedGroup: question.attachable?.group_id || "" }));
            dispatch(setSelectedLevel({ selectedLevel: question.attachable?.level_id || "" }));
            dispatch(setSelectedSubject({ selectedSubject: question.attachable?.subject_id || "" }));
            dispatch(setSelectedLesson({ selectedLesson: question.attachable?.lesson_id || "" }));
            dispatch(setSelectedTopic({ selectedTopic: question.attachable?.topic_id || "" }));
            dispatch(setSelectedSubTopic({ selectedSubTopic: question.attachable?.sub_topic_id || "" }));
            dispatch(setSelectedYear({ selectedYear: question.attachable?.year_id || "" }));

            setIsPaid(question.is_paid || false);
            setIsFeatured(question.is_featured || false);
            setStatusCheck(question.status || false);
        }
    }, [questionData?.data, reset, dispatch]);

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

    const handleUpdate = (formData) => {
        const categoriesPayload = {
            section_id: selectedCategories.selectedSection || formData.section,
            exam_type_id: selectedCategories.selectedExamType || formData.exam_type,
            exam_sub_type_id: selectedCategories.selectedExamSubType || formData.exam_sub_type,
            group_id: selectedCategories.selectedGroup || formData.group,
            level_id: selectedCategories.selectedLevel || formData.level,
            subject_id: selectedCategories.selectedSubject || formData.subject,
            lesson_id: selectedCategories.selectedLesson || formData.lesson,
            topic_id: selectedCategories.selectedTopic || formData.topic,
            sub_topic_id: selectedCategories.selectedSubTopic || formData.sub_topic,
            year_id: selectedCategories.selectedYear || formData.year,
        };
        console.log(categoriesPayload)
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleUpdate)} id="edit-question-form">
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
                                        <SelectValue placeholder={type} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={type}>{type}</SelectItem>
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
                    {type === "mcq" && (
                        <McqOptions
                            control={control}
                            options={options}
                            setOptions={setOptions}
                            correctOptions={correctOptions}
                            setCorrectOptions={setCorrectOptions}
                        />
                    )}

                    {/* creative question */}
                    {type === "creative" && (
                        <CreativeQuestions
                            control={control}
                            creativeQueTypes={creativeQueTypes}
                            setCreativeQueTypes={setCreativeQueTypes}
                        />
                    )}

                    {/* select category */}
                    <SelectCategoryForEdit
                        setValue={setValue}
                        control={control}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Update Question
                    </Button>
                </div>
            </form>
        </>
    );
}
