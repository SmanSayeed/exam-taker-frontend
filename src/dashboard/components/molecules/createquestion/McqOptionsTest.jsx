import { Button } from "@/components/ui/button";
import McqOptionTest from "./McqOptionTest";

export const McqOptionsTest = ({
    control,
    options,
    setOptions,
    correctOptions,
    setCorrectOptions
}) => {

    // Generate a unique ID using the crypto module
    const uniqueId = crypto.randomUUID();

    const addNewOption = () => {
        if (options.length < 8) {
            setOptions((prevOptions) => [...prevOptions, uniqueId]); // Add a unique ID
        }
    };

    const handleCorrectChange = (id, checked) => {
        const updatedCorrectOptions = { ...correctOptions, [id]: checked };
        setCorrectOptions(updatedCorrectOptions);
    };

    return (
        <div>
            {
                options.map((optionId, optionIndex) => (
                    <div key={optionId} className="flex flex-col md:flex-row items-start md:items-center gap-2 mb-4">
                        <McqOptionTest
                            options={options}
                            setOptions={setOptions}
                            correctOptions={correctOptions}
                            setCorrectOptions={setCorrectOptions}
                            optionId={optionId}
                            optionIndex={optionIndex}
                            control={control}
                            isCorrect={!!correctOptions[optionId]}
                            setIsCorrect={(checked) => handleCorrectChange(optionId, checked)}
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
