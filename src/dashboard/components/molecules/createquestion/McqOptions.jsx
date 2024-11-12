import { Button } from "@/components/ui/button";
import McqOption from "./McqOption";

export const McqOptions = ({
    control,
    options,
    setOptions,
    correctOptions,
    setCorrectOptions
}) => {
    const uniqueId = crypto.randomUUID();

    const addNewOption = () => {
        if (options.length < 8) {
            setOptions((prevOptions) => [...prevOptions, uniqueId]);
        }
    };

    // const addNewOption = () => {
    //     if (options.length < 8) {
    //         setOptions(prevOptions => [...prevOptions, prevOptions.length]);
    //     }
    // };

    const handleCorrectChange = (id, checked) => {
        const updatedCorrectOptions = [...correctOptions];
        updatedCorrectOptions[id] = checked;
        setCorrectOptions(updatedCorrectOptions);
    };

    return (
        <div>
            {
                options.map((optionId, optionIndex) => (
                    <div key={optionId} className="flex flex-col md:flex-row items-start md:items-center gap-2 mb-4">
                        <McqOption
                            options={options}
                            setOptions={setOptions}
                            correctOptions={correctOptions}
                            setCorrectOptions={setCorrectOptions}
                            optionIndex={optionIndex}
                            optionId={optionId}
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
