import { Button } from "@/components/ui/button";
import { useState } from "react";
import McqOption from "./McqOption"; // Import the new component

export const McqOptionForm = ({ questionId }) => {
    const [options, setOptions] = useState([0]);

    const addNewOption = () => {
        setOptions(prevOptions => [...prevOptions, prevOptions.length]);
    };

    return (
        <div>
            {
                options.map((optionIndex) => (
                    <McqOption key={optionIndex} questionId={questionId} optionIndex={optionIndex} />
                ))
            }
            <div className="text-right mt-[-38px]">
                <Button type="button" onClick={addNewOption}>
                    New Option
                </Button>
            </div>
        </div>
    );
};
