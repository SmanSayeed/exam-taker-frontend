import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const McqOption = ({ optionIndex, control, isCorrect, setIsCorrect }) => {
    const {
        formState: { errors }
    } = useForm();

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['link', 'formula'],
        [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
    ];
    const module = { toolbar: toolbarOptions };

    return (
        <div className="space-y-6 mt-4">
            {/* mcq_option_text */}
            <div className="space-y-2">
                <Label
                    htmlFor={`mcq_question_text_${optionIndex}`}
                    className="text-md font-bold"
                >
                    {`Option ${optionIndex + 1}`}
                </Label>
                <Controller
                    name={`mcq_question_text${optionIndex}`}
                    control={control}
                    rules={{ required: "MCQ Question Text is required" }}
                    render={({ field }) => (
                        <ReactQuill
                            theme="snow"
                            value={field.value}
                            onChange={field.onChange}
                            modules={module}
                        />
                    )}
                />
                {errors[`mcq_question_text${optionIndex}`] && (
                    <span className="text-red-600">
                        {errors[`mcq_question_text${optionIndex}`].message}
                    </span>
                )}
            </div>

            {/* is correct */}
            <div className="flex items-center space-x-2">
                <Checkbox
                    id={`is_Correct_${optionIndex}`}
                    checked={isCorrect}
                    onCheckedChange={(checked) => setIsCorrect(checked)}
                />
                <label
                    htmlFor={`is_Correct_${optionIndex}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Is Correct
                </label>
            </div>

            {/* Explanation */}
            {
                isCorrect && (
                    <div className="space-y-2">
                        <Label htmlFor={`explanation_${optionIndex}`}>Explanation</Label>
                        <Controller
                            name={`explanation${optionIndex}`}
                            control={control}
                            rules={{ required: "Explanation is required" }}
                            render={({ field }) => (
                                <ReactQuill
                                    theme="snow"
                                    value={field.value}
                                    onChange={field.onChange}
                                    modules={module}
                                />
                            )}
                        />
                        {errors[`explanation${optionIndex}`] && (
                            <span className="text-red-600">
                                {errors[`explanation${optionIndex}`].message}
                            </span>
                        )}
                    </div>
                )
            }
        </div>
    );
};

export default McqOption;
