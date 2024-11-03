import { Checkbox } from "@/components/ui/checkbox";
import { Controller, useForm } from "react-hook-form";
import CInputMcq from "@/components/atoms/CInputMCQ";// Import your CInputMcq component
import { Trash2 } from "lucide-react";

const McqOption = ({
    optionIndex,
    control,
    isCorrect,
    setIsCorrect,
    options,
    setOptions,
    setCorrectOptions
}) => {
    const {
        formState: { errors }
    } = useForm();


    const deleteOption = (optionIndexToDelete) => {
        if (options.length > 2) {
            setOptions(prevOptions =>
                prevOptions.filter(optionIndex => optionIndex !== optionIndexToDelete)
            );
            setCorrectOptions(prevCorrectOptions =>
                prevCorrectOptions.filter((_, index) => index !== optionIndexToDelete)
            );
        }
    };

    return (
        <div className="space-y-1.5 my-2 w-full">
            <div className="flex items-center justify-between gap-4  ">
                {/* mcq_option_text */}
                <CInputMcq
                    name={`mcq_question_text${optionIndex}`}
                    label={`Option ${optionIndex + 1}`}
                    control={control}
                    rules={{ required: "MCQ Question Text is required" }}
                    errors={errors}
                />

                {options.length > 2 && optionIndex > 1 && (
                    <Trash2 onClick={() => deleteOption(optionIndex)} className="cursor-pointer" />
                )}
            </div>


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
