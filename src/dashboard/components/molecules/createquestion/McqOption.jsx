import CInputMcq from "@/components/atoms/CInputMCQ";
import { removeMcqOption, updateField } from "@/features/questions/questionFormSlice";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const McqOption = ({
    optionIndex,
    control,
    isCorrect,
    setIsCorrect,
    options,
    setOptions,
    setCorrectOptions
}) => {
    const dispatch = useDispatch();
    const mcq_options = useSelector((state) => state.questionForm.mcq_options);

    const {
        formState: { errors }
    } = useForm({
        defaultValues: mcq_options
    });

    const deleteOption = (optionIndexToDelete) => {
        if (options?.length > 2) {
            setOptions(prevOptions =>
                prevOptions.filter((_, idx) => idx !== optionIndexToDelete)
            );
            setCorrectOptions(prevCorrectOptions =>
                prevCorrectOptions.filter((_, idx) => idx !== optionIndexToDelete)
            );
            dispatch(removeMcqOption(optionIndexToDelete));
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
                    onChange={(e) => {
                        dispatch(updateField({
                            field: "mcq_options.mcq_question_text",
                            value: e.target.value,
                            index: optionIndex
                        }));
                    }}
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
                    onChange={(e) => {
                        dispatch(updateField({
                            field: "mcq_options.description",
                            value: e.target.value,
                            index: optionIndex
                        }));
                    }}
                />
            )}
        </div>
    );
};

export default McqOption;
