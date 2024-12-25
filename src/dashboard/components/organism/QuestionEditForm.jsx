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

import CInput from "@/components/atoms/CInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { setSelectedExamSubType, setSelectedExamType, setSelectedGroup, setSelectedLesson, setSelectedLevel, setSelectedSection, setSelectedSubject, setSelectedSubTopic, setSelectedTopic, setSelectedYear } from "@/features/questions/selectedCategoriesSlice";
import { getPlainTextFromHtml } from "@/utils/getPlainTextFromHtml";
import { Controller, useForm } from "react-hook-form";
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Loading from "../atoms/Loading";
import TagsField from "../molecules/createquestion/TagsField";
import { CreativeQuesForEdit } from "../molecules/questionedit/CreativeQuesForEdit";
import { McqOptionsForEdit } from "../molecules/questionedit/McqOptionsForEdit";
import SelectCategoryForEdit from "../molecules/questionedit/SelectCategoryForEdit";

export default function QuestionEditForm() {
    const dispatch = useDispatch();
    const selectedCategories = useSelector((state) => state.selectedCategories);

    const [statusCheck, setStatusCheck] = useState(true);
    const [isPaid, setIsPaid] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);
    const [options, setOptions] = useState([]);
    const [correctOptions, setCorrectOptions] = useState([]);
    const [creativeQueTypes, setCreativeQueTypes] = useState([]);

    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file)); // Show preview of the uploaded image
        }
    };

    const [tags, setTags] = useState([]);
    const selectedTagIds = tags && tags.map(tag => tag.id);

    const { questionId } = useParams();
    const { data: questionData, isLoading: isQuestionLoading, refetch: refetchQuestion } = useGetSingleQuestionsQuery(questionId);

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
            const question = questionData?.data;
            setQuestion(question);

            reset({
                title: question.title || "",
                description: question.description || "",
                type: question.type || "",
                mark: question.mark || ""
            });

            setPreviewImage(question.image || "");
            setImage(null);

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
                    mcq_question_text: getPlainTextFromHtml(option?.mcq_question_text),
                    is_correct: !!option.is_correct,
                    description: getPlainTextFromHtml(option?.description),
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

    const [editQuestion, { isLoading: isUpdating }] = useEditQuestionMutation();

    const handleUpdate = async (formData) => {
        console.log("formdata", formData)

        const mcqOptions = options
            .map((option, optionIndex) => {
                let data;

                const optionText = formData[`mcq_question_text${optionIndex}`];
                const explanation = formData[`explanation${optionIndex}`] || null;

                data = option?.id ? {
                    id: option?.id,
                    mcq_question_text: optionText,
                    is_correct: correctOptions[optionIndex] || false,
                    description: explanation,
                    mcq_images: null
                } : {
                    mcq_question_text: optionText,
                    is_correct: correctOptions[optionIndex] || false,
                    description: explanation,
                    mcq_images: null
                }

                return data;
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
            "categories": categoriesPayload,
            "tags": selectedTagIds,
            "image": image && image
        }

        try {
            const response = await editQuestion({ id: questionId, data: payload }).unwrap();
            toast.success(response?.message);
            refetchQuestion();
        } catch (err) {
            toast.error(err?.data?.message || "An error occurred");
        }
    }

    if (isQuestionLoading) return <Loading />

    return (
        <form onSubmit={handleSubmit(handleUpdate)} id="edit-question-form">
            <div className="space-y-4 ">
                {/* title */}
                <div className="space-y-1">
                    <CInput
                        name="title"
                        label="Title"
                        control={control}
                        rules={{ required: "Title is required" }}
                        errors={errors}
                    />
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

                <div className="flex flex-row items-center justify-between gap-4 space-y-1">
                    {/* is_paid */}
                    <div className="flex items-center">
                        <Checkbox
                            id="is_paid"
                            checked={isPaid}
                            onCheckedChange={(checked) => setIsPaid(checked)}
                        />
                        <Label htmlFor="is_paid" className="ml-2">Paid</Label>
                    </div>

                    {/* is_featured */}
                    <div className="flex items-center">
                        <Checkbox
                            id="is_featured"
                            checked={isFeatured}
                            onCheckedChange={(checked) => setIsFeatured(checked)}
                        />
                        <Label htmlFor="is_featured" className="ml-2">Featured</Label>
                    </div>

                    {/* status */}
                    <div className="flex items-center">
                        <Checkbox
                            id="status"
                            checked={statusCheck}
                            onCheckedChange={(checked) => setStatusCheck(checked)}
                        />
                        <Label htmlFor="status" className="ml-2">Status</Label>
                    </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-1 pb-10">
                    <Label className="text-md font-bold">Image</Label>
                    {previewImage && (
                        <div className="mb-4">
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="w-full max-w-xs object-contain rounded-lg border"
                            />
                        </div>
                    )}
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                {/* select category */}
                <SelectCategoryForEdit
                    setValue={setValue}
                    control={control}
                />

                {/* select tags */}
                <div className="pb-4">
                    <TagsField
                        control={control}
                        tags={tags}
                        setTags={setTags}
                        existingTags={questionData?.data?.tags}
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isUpdating}
                >
                    {isUpdating ? "Updating" : "Update Question"}
                </Button>
            </div>
        </form>
    );
}