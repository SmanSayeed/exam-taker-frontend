import CInputMcq from "@/components/atoms/CInputMCQ";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";

const McqOption = ({
    optionIndex,
    control,
    isCorrect,
    setIsCorrect,
    options,
    setOptions,
    correctOptions,
    setCorrectOptions
}) => {

    const {
        formState: { errors }
    } = useForm();

    console.log("options", options)

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

    const deleteOption = (optionIndexToDelete) => {
        console.log("optionindex to delete", optionIndexToDelete)

        if (options.length > 2) {
            // Filter out the option at the specified index
            const updatedOptions = options.filter((option, idx) => {
                console.log("option", option)
                return idx !== optionIndexToDelete
            });

            // Update correctOptions to remove the status of the deleted option
            const updatedCorrectOptions = correctOptions.filter((_, idx) => idx !== optionIndexToDelete);

            // Renumber options to maintain the sequence
            setOptions(updatedOptions.map((_, idx) => idx));
            setCorrectOptions(updatedCorrectOptions);
        }
    };

    return (
        <div className="space-y-1.5 my-2 w-full">
            <div className="flex items-center gap-2">
                {/* MCQ Option Text */}
                <CInputMcq
                    name={`mcq_question_text${optionIndex}`}
                    label={`Option ${optionIndex + 1}`}
                    control={control}
                    rules={{ required: "MCQ Question Text is required" }}
                    errors={errors}
                    isCorrect={isCorrect}
                    setIsCorrect={(checked) => setIsCorrect(checked)}
                    optionIndex={optionIndex}
                />

                {options?.length > 2 && optionIndex > 1 && (
                    <Trash2
                        onClick={() => deleteOption(optionIndex)}
                        className="cursor-pointer mt-8"
                    />
                )}
            </div>

            {/* Explanation */}
            {isCorrect && (
                <CInputMcq
                    name={`explanation${optionIndex}`}
                    label="Explanation"
                    control={control}
                    errors={errors}
                />
            )}
        </div>
    );
};

export default McqOption;
