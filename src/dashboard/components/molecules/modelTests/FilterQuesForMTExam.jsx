import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import FilterQuestionsByCategory from "../questionList/FilterQuestionsByCategory";

export default function FilterQuesForMTExam({ onFilter, isLoading }) {
    const { control, setValue, handleSubmit } = useForm();

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
        <>
            <FilterQuestionsByCategory
                control={control}
                setValue={setValue}
            />

            <div className="text-end">
                <Button
                    type="button"
                    onClick={handleSubmit(handleSubmitFilter)}
                    disabled={isLoading}
                >
                    {isLoading ? "Filtering..." : "Filter"}
                </Button>
            </div>
        </>
    );
}
