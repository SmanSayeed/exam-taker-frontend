import { Checkbox } from "@/components/ui/checkbox";
import { Controller, useForm } from "react-hook-form";
import CInputMcq from "@/components/atoms/CInputMCQ";// Import your CInputMcq component

const McqOption = ({
    optionIndex,
    control,
    isCorrect,
    setIsCorrect
}) => {
    const {
        formState: { errors }
    } = useForm();

    return (
        <div className="space-y-6 mt-4 w-[80%]">
            {/* mcq_option_text */}
            <CInputMcq
                name={`mcq_question_text${optionIndex}`}
                label={`Option ${optionIndex + 1}`}
                control={control}
                rules={{ required: "MCQ Question Text is required" }}
                errors={errors}
            />

            {/* is correct */}
            <div className="flex items-center space-x-2">
                <Checkbox
                    id={`is_Correct_${optionIndex}`}
                    checked={isCorrect}
                    onCheckedChange={(checked) => setIsCorrect(checked)}
                />
                <label
                    htmlFor={`is_Correct_${optionIndex}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Is Correct
                </label>
            </div>

            {/* Explanation */}
            {isCorrect && (
                <CInputMcq
                    name={`explanation${optionIndex}`}
                    label="Explanation"
                    control={control}
                    // rules={{ required: "Explanation is required" }}
                    errors={errors}
                />
            )}
        </div>
    );
};

export default McqOption;
