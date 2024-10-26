// McqOptions Component
import { Button } from "@/components/ui/button";
import McqOption from "../createquestion/McqOption";

export const McqOptionsForEdit = ({
    control,
    options,
    setOptions,
    correctOptions,
    setCorrectOptions
}) => {

    const addNewOption = () => {
        if (options.length < 8) {
            setOptions(prevOptions => [...prevOptions, { id: null, mcq_question_text: "", is_correct: false, description: "" }]);
        }
    };

    const deleteOption = (optionIndexToDelete) => {
        if (options.length > 2) {
            setOptions(prevOptions => prevOptions.filter((_, index) => index !== optionIndexToDelete));
            setCorrectOptions(prevCorrectOptions => prevCorrectOptions.filter((_, index) => index !== optionIndexToDelete));
        }
    };

    const handleCorrectChange = (index, checked) => {
        const updatedCorrectOptions = [...correctOptions];
        updatedCorrectOptions[index] = checked;
        setCorrectOptions(updatedCorrectOptions);
    };

    return (
        <div>
            {options.map((_, optionIndex) => (
                <div key={optionIndex} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mb-4">
                    <McqOption
                        optionIndex={optionIndex}
                        control={control}
                        isCorrect={correctOptions[optionIndex]}
                        setIsCorrect={(checked) => handleCorrectChange(optionIndex, checked)}
                    />
                    {options.length > 2 && optionIndex > 1 && (
                        <Button type="button" onClick={() => deleteOption(optionIndex)} className="md:ml-4">Delete</Button>
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