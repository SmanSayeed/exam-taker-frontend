// McqOptions Component
import { Button } from "@/components/ui/button";
import McqOptionForEdit from "./McqOptionForEdit";

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

    const handleCorrectChange = (index, checked) => {
        const updatedCorrectOptions = [...correctOptions];
        updatedCorrectOptions[index] = checked;
        setCorrectOptions(updatedCorrectOptions);
    };

    return (
        <div>
            {
                options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex flex-col md:flex-row items-start md:items-center gap-2 mb-4">
                        <McqOptionForEdit
                            optionIndex={optionIndex}
                            control={control}
                            isCorrect={correctOptions[optionIndex]}
                            setIsCorrect={(checked) => handleCorrectChange(optionIndex, checked)}
                            options={options}
                            setOptions={setOptions}
                            option={option}
                            setCorrectOptions={setCorrectOptions}
                        />
                    </div>
                ))
            }

            <div className="flex justify-end mt-4">
                {
                    options.length < 8 && (
                        <Button type="button" onClick={addNewOption} className="ml-4">New Option</Button>
                    )
                }
            </div>
        </div>
    );
};
