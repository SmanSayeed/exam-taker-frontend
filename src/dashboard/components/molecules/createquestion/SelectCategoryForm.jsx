import { Button } from "@/components/ui/button";
import { useAttachCategoryMutation } from "@/features/questions/questionsApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import SelectCategory from "./SelectCategory";

const SelectCategoryForm = () => {
    const question = useSelector(state => state.question);
    const { question_id } = question;

    const {
        control,
        handleSubmit
    } = useForm();

    const [isCategoryAttached, setIsCategoryAttached] = useState(false);

    const [attachCategory, { isLoading }] = useAttachCategoryMutation();

    const handleSelect = async (formData) => {
        const payload = {
            question_id: question_id,
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
        };

        try {
            const response = await attachCategory(payload).unwrap();
            toast.success(response?.message);
            setIsCategoryAttached(true);
        } catch (err) {
            toast.error(err?.data?.message || "An error occurred");
        }
    }

    const handleUpdate = (formData) => {
        console.log(formData)

        // try {
        //     const response = await editCreativeQuestion({ id: data?.data?.id, data: payload }).unwrap();
        //     toast.success(response?.message);
        // } catch (err) {
        //     toast.error(err?.data?.message || "An error occurred");
        // }
    }

    return (
        <form onSubmit={handleSubmit(handleSelect)} id="select-category">
            <div className="space-y-4 mt-4">

                <SelectCategory
                    control={control}
                />

                {
                    isCategoryAttached ? (
                        <Button
                            type="button"
                            className="w-full"
                            onClick={handleSubmit(handleUpdate)}
                        >
                            Update
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Finish"}
                        </Button>
                    )
                }
            </div>
        </form>
    )
}

export default SelectCategoryForm