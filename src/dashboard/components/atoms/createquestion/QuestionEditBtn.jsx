import { Button } from "@/components/ui/button";
import { useEditQuestionMutation } from "@/features/questions/questionsApi";

const QuestionEditBtn = ({ formRef, questionId }) => {
    const [editQuestion, { data, isLoading, error }] = useEditQuestionMutation();

    const handleEdit = (event) => {
        event.preventDefault();

        const formData = new FormData(formRef.current);

        // Log all form data
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        const payload = {
            title: formData.get('title'),
            description: formData.get('description'),
            images: null,
            is_paid: formData.get('is_paid'),
            is_featured: formData.get('is_featured'),
            question_type: formData.get('type'),
            status: formData.get('status'),
            mark: formData.get('mark'),
        };
        console.log(payload)

        editQuestion({ questionId, ...payload });
    }

    return (
        <Button
            disabled={isLoading}
            type="button"
            onClick={handleEdit}
            className="w-full"
        >
            Update
        </Button>
    )
}

export default QuestionEditBtn;
