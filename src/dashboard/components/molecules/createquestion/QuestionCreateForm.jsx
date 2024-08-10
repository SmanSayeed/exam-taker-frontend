import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const QuestionCreateForm = () => {
    const {
        register,
        formState: { errors },
        control,
        handleSubmit
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

    const handleCreate = (formData) => {
        console.log(formData)
    }

    return (
        <form onSubmit={handleSubmit(handleCreate)}>
            <div className="space-y-4 mt-4">
                {/* title */}
                <div className="space-y-1">
                    <Label htmlFor="title">Title</Label>
                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: "Title is required" }}
                        render={({ field }) => (
                            <ReactQuill
                                theme="snow"
                                value={field.value}
                                modules={module}
                            />
                        )}
                    />
                    {errors.title && <span className="text-red-600">{errors.title.message}</span>}
                </div>

                {/* description */}
                <div className="space-y-1">
                    <Label htmlFor="details">Description</Label>
                    <Controller
                        name="description"
                        control={control}
                        rules={{ required: "Description is required" }}
                        render={({ field }) => (
                            <ReactQuill
                                theme="snow"
                                value={field.value}
                                modules={module}
                            />
                        )}
                    />
                    {errors.description && <span className="text-red-600">{errors.description.message}</span>}
                </div>

                {/* images(optional) later */}
                <div className="space-y-1">
                    <Label htmlFor="picture">Picture</Label>
                    <Input
                        {...register("picture")}
                        id="picture"
                        type="file"
                        name="picture"
                        accept="image/jpeg, image/jpg, image/png"
                        className="dark:bg-gray-600"
                    />
                    {errors.picture && <span className="text-red-600">{errors.picture.message}</span>}
                </div>

                <div className="grid grid-cols-2 gap-8 space-y-1">
                    {/* is_paid */}
                    <div>
                        <Checkbox
                            id="is_paid"
                        // checked={statusCheck}
                        // onCheckedChange={(checked) => setStatusCheck(checked)}
                        />
                        <Label htmlFor="status" className="ml-2">Paid</Label>
                    </div>

                    {/* is_featured */}
                    <div>
                        <Checkbox
                            id="is_featured"
                        // checked={statusCheck}
                        // onCheckedChange={(checked) => setStatusCheck(checked)}
                        />
                        <Label htmlFor="status" className="ml-2">Featured</Label>
                    </div>
                </div>

                {/* Question Type */}
                <div className="space-y-1">
                    <Label>Question Type</Label>
                    <Controller
                        name="type"
                        control={control}
                        rules={{ required: "Type is required" }}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="mcq">MCQ</SelectItem>
                                    <SelectItem value="normal">Normal</SelectItem>
                                    <SelectItem value="creative">Creative</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.type && <span className="text-red-600">{errors.type.message}</span>}
                </div>

                {/* marks */}
                <div className="grid gap-2">
                    <Label htmlFor="mark">Marks</Label>
                    <Input
                        {...register("mark", { required: "Marks is Required" })}
                        id="mark"
                        name="mark"
                        type="number"
                        placeholder="5"
                    />
                    {errors.mark && <span className="text-red-600">{errors.mark.message}</span>}
                </div>

                {/* status */}
                <div>
                    <Checkbox
                        id="status"
                    // checked={statusCheck}
                    // onCheckedChange={(checked) => setStatusCheck(checked)}
                    />
                    <Label htmlFor="status" className="ml-2">Status</Label>
                </div>

                <Button type="submit" className="w-full">
                    Proceed
                </Button>
            </div>
        </form>
    )
}
export default QuestionCreateForm;