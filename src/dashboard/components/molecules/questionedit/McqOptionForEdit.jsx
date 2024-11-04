import CInputMcq from "@/components/atoms/CInputMCQ"; // Import your CInputMcq component
import { useDeleteMcqOptionMutation } from "@/features/questions/questionsApi";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const McqOptionForEdit = ({
    optionIndex,
    control,
    isCorrect,
    setIsCorrect,
    options,
    option,
    setOptions,
    setCorrectOptions
}) => {

    const [loadingOptions, setLoadingOptions] = useState({});
    const [deleteMcqOption] = useDeleteMcqOptionMutation();

    const {
        formState: { errors }
    } = useForm();

    const deleteOption = async (optionId, optionIndexToDelete) => {
        if (!optionId) {
            setOptions(prevOptions => prevOptions.filter((_, index) => index !== optionIndexToDelete));
        }

        if (options?.length > 2 && optionId) {
            setLoadingOptions(prev => ({ ...prev, [optionId]: true }));

            try {
                const response = await deleteMcqOption(optionId).unwrap();
                toast.success(response?.message);

                setOptions(prevOptions => prevOptions.filter((_, index) => index !== optionIndexToDelete));

                setCorrectOptions(prevCorrectOptions =>
                    prevCorrectOptions.filter((_, index) => index !== optionIndexToDelete)
                );
            } catch (error) {
                console.error(error);
                toast.error("Failed to delete option");
            } finally {
                setLoadingOptions(prev => ({ ...prev, [optionId]: false }));
            }
        }
    };

    return (
        <div className="space-y-1.5 my-2 w-full">
            <div className="flex items-center gap-2">
                {/* mcq_option_text */}
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

                {
                    options?.length > 2 && optionIndex > 1 && (
                        <button
                            type="button"
                            onClick={() => deleteOption(option.id, optionIndex)}
                            className="md:ml-4"
                            disabled={loadingOptions[option.id]}
                        >
                            {
                                loadingOptions[option.id] ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (<Trash2 className="mt-8" />)
                            }
                        </button>
                    )
                }
            </div>

            {/* Explanation */}
            {isCorrect && (
                <CInputMcq
                    name={`explanation${optionIndex}`}
                    label="Explanation"
                    control={control}
                    errors={errors}
                    optionIndex={optionIndex}
                />
            )}
        </div>
    );
};

export default McqOptionForEdit;
