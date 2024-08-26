import { useState } from "react";
import CreativeQuestion from "./CreativeQuestion";

export const CreativeQuestionForm = ({ questionId }) => {
    const [questions, setQuestions] = useState([0]);

    const addNewOption = () => {
        setQuestions(prevQuestions => [...prevQuestions, prevQuestions.length]);
    };

    return (
        <div>
            {
                questions.map((questionIndex) => (
                    <CreativeQuestion
                        key={questionIndex}
                        questionId={questionId}
                        questionIndex={questionIndex}
                    />
                ))
            }
            {/* <div className="text-right mt-[-38px]">
                <Button type="button" onClick={addNewOption}>
                    New Question
                </Button>
            </div> */}
        </div>
    );
};
