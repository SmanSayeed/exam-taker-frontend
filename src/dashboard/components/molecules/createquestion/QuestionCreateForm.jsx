import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useCreateQuestionMutation } from "@/features/questions/questionsApi";
import { useState } from "react";

import CInput from "@/components/atoms/CInput";
import { updateField } from "@/features/questions/questionFormSlice";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { CreativeQuestions } from "./CreativeQuestions";
import { McqOptions } from "./McqOptions";
import SelectCategory from "./SelectCategory";

export default function QuestionCreateForm() {
    const [statusCheck, setStatusCheck] = useState(true);
    const [isPaid, setIsPaid] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);
    const [options, setOptions] = useState([0, 1, 2, 3]);
    const [correctOptions, setCorrectOptions] = useState([]);
    const [creativeQueTypes, setCreativeQueTypes] = useState([0, 1, 2]);

    const [selectedQuesType, setSelectedQuesType] = useLocalStorage({
        key: "questionType",
        defaultValue: "mcq",
    });
    const [mark, setMark] = useLocalStorage({
        key: "questionMark",
        defaultValue: "1",
    });

    const dispatch = useDispatch();
    const { title } = useSelector((state) => state.questionForm);

    const {
        register,
        formState: { errors },
        control,
        setValue,
        handleSubmit,
        reset
    } = useForm({
        defaultValues: {
            title: title,
            type: selectedQuesType
        },
    });

    const [selectedSection, setSelectedSection] = useLocalStorage({
        key: "section",
        defaultValue: "",
    });
    const [selectedExamType, setSelectedExamType] = useLocalStorage({
        key: "exam_type",
        defaultValue: "",
    });
    const [selectedExamSubType, setSelectedExamSubType] = useLocalStorage({
        key: "exam_sub_type",
        defaultValue: "",
    });
    const [selectedGroup, setSelectedGroup] = useLocalStorage({
        key: "group",
        defaultValue: "",
    });
    const [selectedLevel, setSelectedLevel] = useLocalStorage({
        key: "level",
        defaultValue: "",
    });
    const [selectedSubject, setSelectedSubject] = useLocalStorage({
        key: "subject",
        defaultValue: "",
    });
    const [selectedLesson, setSelectedLesson] = useLocalStorage({
        key: "lesson",
        defaultValue: "",
    });
    const [selectedTopic, setSelectedTopic] = useLocalStorage({
        key: "topic",
        defaultValue: "",
    });
    const [selectedSubTopic, setSelectedSubTopic] = useLocalStorage({
        key: "sub_topic",
        defaultValue: "",
    });
    const [selectedYear, setSelectedYear] = useLocalStorage({
        key: "year",
        defaultValue: "",
    });

    const handleTypeChange = (val) => {
        setSelectedQuesType(val);
        setValue("type", val);
    };

    const handleMarkChange = (e) => {
        const value = e.target.value;
        setMark(value);
        setValue("mark", value);
    };

    const [createQuestion, { isLoading }] = useCreateQuestionMutation();

    const handleCreate = async (formData) => {
        const mcqOptions = options.map((optionIndex) => {
            const optionText = formData[`mcq_question_text${optionIndex}`];
            const explanation = formData[`explanation${optionIndex}`] || null;

            return {
                mcq_question_text: optionText,
                is_correct: correctOptions[optionIndex] || false,
                description: explanation
            };
        });

        const creativeQuestions = creativeQueTypes.map((queTypeIndex) => {
            const queText = formData[`creative_question_text${queTypeIndex}`];
            const explanation = formData[`explanation${queTypeIndex}`] || null;
            const queType = formData[`creative_que_type${queTypeIndex}`];

            return {
                creative_question_text: queText,
                creative_question_type: queType,
                description: explanation,
            };
        });

        const categoriesPayload = {
            section_id: selectedSection || formData.section,
            exam_type_id: selectedExamType || formData.exam_type,
            exam_sub_type_id: selectedExamSubType || formData.exam_sub_type,
            group_id: selectedGroup || formData.group,
            level_id: selectedLevel || formData.level,
            subject_id: selectedSubject || formData.subject,
            lesson_id: selectedLesson || formData.lesson,
            topic_id: selectedTopic || formData.topic,
            sub_topic_id: selectedSubTopic || formData.sub_topic,
            year_id: selectedYear || formData.year,
        };

        const payload = {
            title: formData.title,
            // description: formData.description,
            type: selectedQuesType || formData.type,
            mark: formData.mark,
            // images: null,
            is_paid: isPaid,
            is_featured: isFeatured,
            status: statusCheck,
            mcq_options: mcqOptions,
            creative_options: creativeQuestions,
            categories: categoriesPayload,
        };

        try {
            const response = await createQuestion(payload).unwrap();
            toast.success(response?.message);
            reset();
            setValue("title", "");
        } catch (err) {
            toast.error(err?.data?.message || "An error occurred");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleCreate)} id="question-form">
                <div className="space-y-4 mt-4">
                    {/* title */}
                    <div className="space-y-1">
                        <CInput
                            name="title"
                            label="Title"
                            control={control}
                            rules={{ required: "Title is required" }}
                            errors={errors}
                            onChange={(e) => {
                                dispatch(updateField({ field: 'title', value: e.target.value }));
                            }}
                        />
                    </div>

                    {/* mcq question */}
                    {selectedQuesType === "mcq" && (
                        // <McqOptionsTest
                        //     control={control}
                        //     options={options}
                        //     setOptions={setOptions}
                        //     correctOptions={correctOptions}
                        //     setCorrectOptions={setCorrectOptions}
                        // />
                        <McqOptions
                            control={control}
                            options={options}
                            setOptions={setOptions}
                            correctOptions={correctOptions}
                            setCorrectOptions={setCorrectOptions}
                        />
                    )}
                    {/* creative question */}
                    {selectedQuesType === "creative" && (
                        <CreativeQuestions
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
                                    onValueChange={(val) => {
                                        handleTypeChange(val);
                                        field.onChange(val);
                                    }}
                                    value={field.value}
                                    defaultValue={selectedQuesType}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* <SelectItem value="normal">Normal</SelectItem> */}
                                        <SelectItem value="mcq">MCQ</SelectItem>
                                        {/* <SelectItem value="creative">Creative</SelectItem> */}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.type && (
                            <span className="text-red-600">{errors.type.message}</span>
                        )}
                    </div>

                    {/* marks */}
                    <div>
                        <Label htmlFor="mark" className="text-md font-bold">
                            Marks
                        </Label>
                        <Input
                            {...register("mark", { required: "Marks is Required" })}
                            id="mark"
                            name="mark"
                            type="number"
                            defaultValue={mark}
                            onChange={handleMarkChange}
                        />
                        {errors.mark && (
                            <span className="text-red-600">{errors.mark.message}</span>
                        )}
                    </div>

                    <div className="flex flex-row items-center justify-between gap-4 space-y-1 pb-10">
                        {/* is_paid */}
                        <div className="flex items-center">
                            <Checkbox
                                id="is_paid"
                                checked={isPaid}
                                onCheckedChange={(checked) => setIsPaid(checked)}
                            />
                            <Label htmlFor="is_paid" className="ml-2">
                                Paid
                            </Label>
                        </div>

                        {/* is_featured */}
                        <div className="flex items-center">
                            <Checkbox
                                id="is_featured"
                                checked={isFeatured}
                                onCheckedChange={(checked) => setIsFeatured(checked)}
                            />
                            <Label htmlFor="is_featured" className="ml-2">
                                Featured
                            </Label>
                        </div>
                        {/* status */}
                        <div className="flex items-center">
                            <Checkbox
                                id="status"
                                checked={statusCheck}
                                onCheckedChange={(checked) => setStatusCheck(checked)}
                            />
                            <Label htmlFor="status" className="ml-2">
                                Status
                            </Label>
                        </div>
                    </div>

                    {/* select category */}
                    <SelectCategory
                        setValue={setValue}
                        control={control}
                        setSelectedSection={setSelectedSection}
                        setSelectedExamType={setSelectedExamType}
                        setSelectedExamSubType={setSelectedExamSubType}
                        setSelectedGroup={setSelectedGroup}
                        setSelectedLesson={setSelectedLesson}
                        setSelectedLevel={setSelectedLevel}
                        setSelectedSubject={setSelectedSubject}
                        setSelectedTopic={setSelectedTopic}
                        setSelectedSubTopic={setSelectedSubTopic}
                        setSelectedYear={setSelectedYear}
                    />

                    <Button disabled={isLoading} type="submit" className="w-full">
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            "Create Question"
                        )}
                    </Button>
                </div>
            </form>
        </>
    );
}
