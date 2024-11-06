import CInputMcq from "@/components/atoms/CInputMCQ";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";

const McqOptionTest = ({
    optionId,
    control,
    isCorrect,
    setIsCorrect,
    options,
    setOptions,
    correctOptions,
    setCorrectOptions,
    optionIndex
}) => {
    const {
        formState: { errors }
    } = useForm();

    const deleteOption = (optionId) => {

        if (options?.length > 2) {

            setOptions((prevOptions) =>
                prevOptions.filter((option) => option !== optionId)
            );

            setCorrectOptions((prevCorrectOptions) =>
                prevCorrectOptions.filter(option => option !== optionId)
            );
        }
    };

    return (
        <div className="space-y-1.5 my-2 w-full">
            <div className="flex items-center gap-2">
                {/* MCQ Option Text */}
                <CInputMcq
                    name={`mcq_question_text${optionId}`}
                    label={`Option ${optionIndex + 1}`}
                    control={control}
                    rules={{ required: "MCQ Question Text is required" }}
                    errors={errors}
                    isCorrect={isCorrect}
                    setIsCorrect={(checked) => setIsCorrect(checked)}
                    optionIndex={optionId}
                />

                {options?.length > 2 && optionIndex > 1 && (
                    <Trash2
                        onClick={() => deleteOption(optionId)}
                        className="cursor-pointer mt-8"
                    />
                )}
            </div>

            {/* Explanation */}
            {isCorrect && (
                <CInputMcq
                    name={`explanation${optionId}`}
                    label="Explanation"
                    control={control}
                    errors={errors}
                />
            )}
        </div>
    );
};

export default McqOptionTest;
