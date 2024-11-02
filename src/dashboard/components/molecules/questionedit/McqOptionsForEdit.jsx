// McqOptions Component
import { Button } from "@/components/ui/button";
import { useDeleteMcqOptionMutation } from "@/features/questions/questionsApi";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import McqOption from "../createquestion/McqOption";

export const McqOptionsForEdit = ({
    control,
    options,
    setOptions,
    correctOptions,
    setCorrectOptions
}) => {

    const [loadingOptions, setLoadingOptions] = useState({});
    const [deleteMcqOption] = useDeleteMcqOptionMutation();

    const addNewOption = () => {
        if (options.length < 8) {
            setOptions(prevOptions => [...prevOptions, { id: null, mcq_question_text: "", is_correct: false, description: "" }]);
        }
    };

    const deleteOption = async (optionId, optionIndexToDelete) => {
        if (!optionId) {
            setOptions(prevOptions => prevOptions.filter((_, index) => index !== optionIndexToDelete));
        }

        if (options.length > 2 && optionId) {
            setLoadingOptions(prev => ({ ...prev, [optionId]: true }));

            try {
                const response = await deleteMcqOption(optionId).unwrap();
                toast.success(response?.message);
                setOptions(prevOptions => prevOptions.filter((_, index) => index !== optionIndexToDelete));
            } catch (error) {
                console.error(error);
                toast.error("Failed to delete option");
            } finally {
                setLoadingOptions(prev => ({ ...prev, [optionId]: false }));
            }
        }
    };

    // const deleteOption = (optionIndexToDelete) => {
    //     if (options.length > 2) {
    //         setOptions(prevOptions => prevOptions.filter((_, index) => index !== optionIndexToDelete));
    //         setCorrectOptions(prevCorrectOptions => prevCorrectOptions.filter((_, index) => index !== optionIndexToDelete));
    //     }
    // };

    const handleCorrectChange = (index, checked) => {
        const updatedCorrectOptions = [...correctOptions];
        updatedCorrectOptions[index] = checked;
        setCorrectOptions(updatedCorrectOptions);
    };

    return (
        <div>
            {options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex flex-col md:flex-row items-start md:items-center gap-2 mb-4">
                    <McqOption
                        optionIndex={optionIndex}
                        control={control}
                        isCorrect={correctOptions[optionIndex]}
                        setIsCorrect={(checked) => handleCorrectChange(optionIndex, checked)}
                    />
                    {options.length > 2 && optionIndex > 1 && (
                        <button
                            type="button"
                            onClick={() => deleteOption(option.id, optionIndex)}
                            className="md:ml-4"
                            disabled={loadingOptions[option.id]}
                        >
                            {
                                loadingOptions[option.id] ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (<Trash2 />)
                            }
                        </button>
                    )}
                </div>
            ))}
            <div className="flex justify-end mt-4">
                {options.length < 8 && (
                    <Button type="button" onClick={addNewOption} className="ml-4">New Option</Button>
                )}
            </div>
        </div>
    );
};
