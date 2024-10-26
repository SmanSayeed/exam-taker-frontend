import { Button } from "@/components/ui/button";
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

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { setSelectedExamSubType, setSelectedExamType, setSelectedGroup, setSelectedLesson, setSelectedLevel, setSelectedSection, setSelectedSubject, setSelectedSubTopic, setSelectedTopic, setSelectedYear } from "@/features/questions/selectedCategoriesSlice";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { CreativeQuesForEdit } from "../molecules/questionedit/CreativeQuesForEdit";
import { McqOptionsForEdit } from "../molecules/questionedit/McqOptionsForEdit";
import SelectCategoryForEdit from "../molecules/questionedit/SelectCategoryForEdit";

export default function EditQuestionForm() {
    const dispatch = useDispatch();
    const selectedCategories = useSelector((state) => state.selectedCategories);

    const [statusCheck, setStatusCheck] = useState(true);
    const [isPaid, setIsPaid] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);
    const [options, setOptions] = useState([]);
    const [correctOptions, setCorrectOptions] = useState([]);
    const [creativeQueTypes, setCreativeQueTypes] = useState([]);

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

            // Populate options and correct options based on API data
            if (question?.mcq_questions) {
                setOptions(question?.mcq_questions.map(option => ({
                    id: option?.id,
                    mcq_question_text: option?.mcq_question_text,
                    is_correct: !!option.is_correct,
                    description: option?.description,
                })));
                setCorrectOptions(question?.mcq_questions.map(option => !!option.is_correct));

                // Set initial values for each MCQ question text in React Hook Form
                question?.mcq_questions.forEach((option, index) => {
                    setValue(`mcq_question_text${index}`, option?.mcq_question_text);
                    setValue(`explanation${index}`, option?.description);
                });
            }

            // Populate creative question text and type based on API data
            if (question?.creative_questions) {
                setCreativeQueTypes(question?.creative_questions.map(option => ({
                    id: option?.id,
                    creative_question_text: option?.creative_question_text,
                    creative_question_type: option?.creative_question_type,
                    description: option?.description,
                })));

                // Set initial values for each creative question text in React Hook Form
                question?.creative_questions.forEach((option, index) => {
                    setValue(`creative_question_text${index}`, option.creative_question_text);
                    setValue(`creative_que_type${index}`, option.creative_question_type);
                    setValue(`explanation${index}`, option.description);
                });
            }
        }
    }, [questionData?.data, reset, dispatch, setValue]);

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

    const [editQuestion, { isLoading }] = useEditQuestionMutation();

    const handleUpdate = async (formData) => {
        const mcqOptions = options.map((_, optionIndex) => {
            const optionText = formData[`mcq_question_text${optionIndex}`];
            const explanation = formData[`explanation${optionIndex}`] || null;

            return {
                mcq_question_text: optionText,
                is_correct: correctOptions[optionIndex] || false,
                description: explanation,
                mcq_images: null
            };
        });

        const creativeQuestions = creativeQueTypes.map((_, queTypeIndex) => {
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

        const payload = {
            "title": formData.title,
            "description": formData.description,
            "images": null,
            "is_paid": isPaid,
            "is_featured": isFeatured,
            "type": formData.type,
            "mark": formData.mark,
            "status": statusCheck,
            "mcq_options": mcqOptions,
            "creative_options": creativeQuestions,
            "categories": categoriesPayload
        }

        try {
            const response = await editQuestion({ id: questionId, data: payload }).unwrap();
            toast.success(response?.message);
        } catch (err) {
            toast.error(err?.data?.message || "An error occurred");
        }
    }

    return (
        <form onSubmit={handleSubmit(handleUpdate)} id="edit-question-form">
            <div className="space-y-4 ">
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
                    <McqOptionsForEdit
                        control={control}
                        options={options}
                        setOptions={setOptions}
                        correctOptions={correctOptions}
                        setCorrectOptions={setCorrectOptions}
                    />
                )}

                {/* creative question */}
                {type === "creative" && (
                    <CreativeQuesForEdit
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
                    disabled={isLoading}
                >
                    {isLoading ? "Updating" : "Update Question"}
                </Button>
            </div>
        </form>
    );
}
