import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import FilterQuestionsByCategory from "../questionList/FilterQuestionsByCategory";

export default function FilterQuesForMTExam({ onFilter, form, setQuestionType, questionType }) {
    const {
        handleSubmit,
        control,
        setValue,
        formState: { isSubmitting }
    } = useForm({
        defaultValues: { type: questionType }
    });

    // const { isSubmitting } = form.formState;

    const handleSubmitFilter = (formData) => {
        const rawPayload = {
            section_id: formData.section || [],
            exam_type_id: formData.exam_type || [],
            exam_sub_type_id: formData.exam_sub_type || [],
            group_id: formData.group || [],
            level_id: formData.level || [],
            subject_id: formData.subject || [],
            lesson_id: formData.lesson || [],
            topic_id: formData.topic || [],
            sub_topic_id: formData.sub_topic || [],
            type: [formData.type]
        };

        // Remove empty values
        const payload = Object.fromEntries(
            Object.entries(rawPayload).filter(
                ([, value]) => value !== undefined && value.length > 0
            )
        );

        onFilter(payload);
    };

    return (
        <div className="py-6">
            <h1 className="text-xl font-bold mb-3">Filtering Questions:</h1>

            {/* Question Type Select */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Question Type</label>
                <Select
                    onValueChange={(value) => {
                        setValue("type", value);
                        setQuestionType(value);
                    }}
                    defaultValue={questionType}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select exam type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="mcq">MCQ</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <FilterQuestionsByCategory
                control={control}
                setValue={setValue}
            />

            <div className="text-end">
                <Button
                    type="button"
                    onClick={handleSubmit(handleSubmitFilter)}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Filtering..." : "Filter"}
                </Button>
            </div>
        </div>
    );
}
