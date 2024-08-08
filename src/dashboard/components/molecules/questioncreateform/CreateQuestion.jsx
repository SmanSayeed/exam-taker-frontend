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
import { Textarea } from "@/components/ui/textarea";

import { Controller, useForm } from "react-hook-form";

const CreateQuestion = () => {
    const {
        register,
        formState: { errors },
        control
    } = useForm();

    return (
        <>
            {/* title rich text editor → ckeditor */}
            <div className="space-y-1">
                <Label htmlFor="title">Title</Label>
                <Input
                    {...register("title", { required: "title is Required" })}
                    id="title"
                    name="title"
                    placeholder="Enter title"
                />
                {errors.title && <span className="text-red-600">{errors.title.message}</span>}
            </div>

            {/* description (optional) // answer // ckeditor */}
            <div className="space-y-1">
                <Label htmlFor="details">Description</Label>
                <Textarea
                    {...register("details")}
                    id="details"
                    name="details"
                    placeholder="Write your description here.."
                />
                {errors.details && <span className="text-red-600">{errors.details.message}</span>}
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
                    placeholder="2"
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
        </>
    )
}

export default CreateQuestion