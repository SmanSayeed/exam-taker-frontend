import { Button } from "@/components/ui/button";
import McqOption from "./McqOption";

export const McqOptions = ({
    control,
    options,
    setOptions,
    correctOptions,
    setCorrectOptions
}) => {

    const addNewOption = () => {
        if (options.length < 8) {
            setOptions(prevOptions => [...prevOptions, prevOptions.length]);
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
                options.map((optionIndex) => (
                    <div key={optionIndex} className="flex flex-col md:flex-row items-start md:items-center gap-2 mb-4">
                        <McqOption
                            options={options}
                            setOptions={setOptions}
                            setCorrectOptions={setCorrectOptions}
                            optionIndex={optionIndex}
                            control={control}
                            isCorrect={!!correctOptions[optionIndex]}
                            setIsCorrect={(checked) => handleCorrectChange(optionIndex, checked)}
                        />
                    </div>
                ))
            }

            <div className="flex justify-end mt-4">
                {options.length < 8 && (
                    <Button type="button" onClick={addNewOption} className="ml-4">
                        New Option
                    </Button>
                )}
            </div>
        </div>
    );
};
