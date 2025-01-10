import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const CreativeQuestion = ({ control, queTypeIndex }) => {

    const {
        formState: { errors },
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
    const module = {
        toolbar: toolbarOptions
    }

    return (
        <div className="space-y-6 mt-4">
            {/* creative question type */}
            <div className="flex gap-4 items-center">
                <Label>Creative Question Type: </Label>
                <div>
                    <Controller
                        name={`creative_que_type${queTypeIndex}`}
                        control={control}
                        rules={{ required: "Creative question type is required" }}
                        render={({ field }) => (
                            <RadioGroup
                                className="flex gap-4"
                                value={field.value}
                                onValueChange={(value) => field.onChange(value)}
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="a" id="a" />
                                    <Label htmlFor="a">A</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="b" id="b" />
                                    <Label htmlFor="b">B</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="c" id="c" />
                                    <Label htmlFor="c">C</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="d" id="d" />
                                    <Label htmlFor="d">D</Label>
                                </div>
                            </RadioGroup>
                        )}
                    />
                    {errors[`creative_que_type${queTypeIndex}`] && (
                        <span className="text-red-600">
                            {errors[`creative_que_type${queTypeIndex}`].message}
                        </span>
                    )}
                </div>
            </div>

            {/* creative_question_text */}
            <div className="space-y-2">
                <Label htmlFor={`creative_question_text${queTypeIndex}`}>Creative Question Text</Label>
                <Controller
                    name={`creative_question_text${queTypeIndex}`}
                    control={control}
                    rules={{ required: "Creative Question Text is required" }}
                    render={({ field }) => (
                        <ReactQuill
                            theme="snow"
                            value={field.value}
                            onChange={field.onChange}
                            modules={module}
                        />
                    )}
                />
                {errors[`creative_question_text${queTypeIndex}`] && (
                    <span className="text-red-600">
                        {errors[`creative_question_text${queTypeIndex}`].message}
                    </span>
                )}
            </div>

            {/* Explanation */}
            <div className="space-y-2">
                <Label htmlFor={`explanation${queTypeIndex}`}>Explanation</Label>
                <Controller
                    name={`explanation${queTypeIndex}`}
                    control={control}
                    render={({ field }) => (
                        <ReactQuill
                            theme="snow"
                            value={field.value}
                            onChange={field.onChange}
                            modules={module}
                        />
                    )}
                />
                {errors[`explanation${queTypeIndex}`] && (
                    <span className="text-red-600">
                        {errors[`explanation${queTypeIndex}`].message}
                    </span>
                )}
            </div>
        </div>
    )
}

export default CreativeQuestion