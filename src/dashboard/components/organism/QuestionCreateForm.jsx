import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import CreateQuestion from "../molecules/questioncreateform/CreateQuestion";

const QuestionCreateForm = () => {
    const {
        handleSubmit
    } = useForm();

    const handleCreate = (formData) => {
        console.log(formData)
    }

    return (
        <form onSubmit={handleSubmit(handleCreate)}>
            <div className="space-y-4 mt-4">

                {/* step:1 create question */}
                <CreateQuestion />

                <Button>
                    Create a Question
                </Button>
            </div>
        </form>
    )
}
export default QuestionCreateForm;