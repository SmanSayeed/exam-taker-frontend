import CInputMcq from "@/components/atoms/CInputMCQ";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";

const McqOption = ({
    optionIndex,
    optionId,
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

    const deleteOption = (optionId) => {
        if (options?.length > 4) {
            setOptions((prevOptions) =>
                prevOptions.filter(option => option !== optionId)
            );

            setCorrectOptions((prevCorrectOptions) =>
                prevCorrectOptions.filter(option => option !== optionId)
            );
        }
    };

    // const deleteOption = (optionIndexToDelete) => {
    //     if (options?.length > 2) {
    //         setOptions(prevOptions =>
    //             prevOptions.filter((_, idx) => idx !== optionIndexToDelete)
    //         );
    //         setCorrectOptions(prevCorrectOptions =>
    //             prevCorrectOptions.filter((_, idx) => idx !== optionIndexToDelete)
    //         );
    //     }
    // };

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

                {options?.length > 4 && optionIndex > 3 && (
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

export default McqOption;
