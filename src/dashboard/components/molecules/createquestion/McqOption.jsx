import CInputMcq from "@/components/atoms/CInputMCQ"; // Import your CInputMcq component
import { Checkbox } from "@/components/ui/checkbox";
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
        if (options.length > 2) {
            setOptions(prevOptions =>
                prevOptions.filter(optionIndex => optionIndex !== optionIndexToDelete)
            );
            setCorrectOptions(prevCorrectOptions =>
                prevCorrectOptions.filter((_, index) => index !== optionIndexToDelete)
            );
            dispatch(removeMcqOption(optionIndexToDelete));
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
                    onChange={(e) => {
                        dispatch(updateField({ field: "mcq_options.mcq_question_text", value: e.target.value, index: optionIndex }));
                    }}
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
                    onCheckedChange={(checked) => {
                        setIsCorrect(checked);
                        dispatch(updateField({ field: "mcq_options.is_correct", value: checked, index: optionIndex }));
                    }}
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
                    errors={errors}
                    onChange={(e) => {
                        dispatch(updateField({ field: "mcq_options.description", value: e.target.value, index: optionIndex }));
                    }}
                />
            )}
        </div>
    );
};

export default McqOption;
