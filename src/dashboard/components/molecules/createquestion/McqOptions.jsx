import { Button } from "@/components/ui/button";
import McqOption from "./McqOption";

export const McqOptions = ({
    control,
    options,
    setOptions,
    correctOptions,
    setCorrectOptions,
    defaultValues
}) => {

    // useEffect(() => {
    //     if (defaultValues && defaultValues.mcq_options) {
    //         const initialCorrectOptions = defaultValues.mcq_options.map(option => option.is_correct);
    //         setCorrectOptions(initialCorrectOptions);
    //     }
    // }, [defaultValues, setCorrectOptions]);

    const addNewOption = () => {
        if (options.length < 8) {
            setOptions(prevOptions => [...prevOptions, prevOptions.length]);
        }
    };

    const deleteOption = (optionIndexToDelete) => {
        if (options.length > 2) {
            setOptions(prevOptions =>
                prevOptions.filter(optionIndex => optionIndex !== optionIndexToDelete)
            );
            setCorrectOptions(prevCorrectOptions =>
                prevCorrectOptions.filter((_, index) => index !== optionIndexToDelete)
            );
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
                    <div key={optionIndex} className="flex items-center justify-between mb-4">
                        <McqOption
                            optionIndex={optionIndex}
                            control={control}
                            isCorrect={!!correctOptions[optionIndex]}
                            setIsCorrect={(checked) => handleCorrectChange(optionIndex, checked)}
                        // defaultValues={defaultValues}
                        />

                        {/* Conditionally render the delete button */}
                        {options.length > 2 && optionIndex > 1 && (
                            <Button
                                type="button"
                                onClick={() => deleteOption(optionIndex)}
                                className="ml-4"
                            >
                                Delete
                            </Button>
                        )}
                    </div>
                ))
            }

            {/* Display the "New Option" button next to the delete button */}
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
