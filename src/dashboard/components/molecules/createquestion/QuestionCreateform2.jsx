import { Button } from "@/components/ui/button";

import { useMultiContext } from "@/providers/MultiStepContextProvider";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CreateQuestion from "../molecules/multistepform/CreateQuestion";

const QuestionCreateForm2 = () => {
    const {
        handleSubmit
    } = useForm();
    const naviagte = useNavigate();

    const { step, nextStep, prevStep } = useMultiContext();

    const handleCreate = (formData) => {
        console.log(formData)
        nextStep();
        if (step === 3) {
            naviagte("/admin/questions")
        }
    }

    return (
        <form onSubmit={handleSubmit(handleCreate)}>
            <div className="space-y-4 mt-4">

                {step === 1 && <CreateQuestion />}
                {step === 2 && <CreateQuestion />}
                {step === 3 && <CreateQuestion />}

                {
                    step < 4 && (
                        <div className="text-right">
                            <Button
                                type="button"
                                variant={'outline'}
                                className={`${step === 1 ? 'invisible' : ''}`}
                                onClick={() => prevStep()}
                            >
                                Go Back
                            </Button>
                            <Button type="submit" className="ml-2">
                                {step === 3 ? 'Create a Question' : 'Next Step'}
                            </Button>
                        </div>
                    )
                }
            </div>
        </form>
    )
}
export default QuestionCreateForm2;