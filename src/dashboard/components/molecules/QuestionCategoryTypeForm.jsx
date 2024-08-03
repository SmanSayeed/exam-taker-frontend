import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateSectionMutation, useGetSectionsQuery } from "@/features/questions/questionsCategory/section/sectionApi";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";


const QuestionCategoryTypeForm = () => {
    const [statusCheck, setStatusCheck] = useState(false);
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState("");

    const {
        register,
        handleSubmit, reset,
        formState: { errors },
        setError, control
    } = useForm();

    // const [createSection, { data, isSuccess, isLoading, error }] = useCreateSectionMutation();
    const {data} = useGetSectionsQuery()

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const validTypes = ["image/jpeg", "image/jpg", "image/png"];
            const isValidType = validTypes.includes(file.type);
            const isValidSize = file.size <= 2 * 1024 * 1024; // 2 MB
            if (!isValidType) {
                setImageError("Only jpg, jpeg, and png formats are allowed.");
                setImage(null);
                return;
            }
            if (!isValidSize) {
                setImageError("File size should not exceed 2 MB.");
                setImage(null);
                return;
            }
            setImageError("");
            setImage(file);
        }
    };

    const handleCreate = (formData) => {
        const payload = {
            section_id: formData.section,
            title: formData.title,
            status: statusCheck,
            details: formData.details,
            picture: image
        }
        console.log("data is :", payload)

        // createSection(payload);
    }

    // useEffect(() => {
    //     if (error?.data) {
    //         toast.error(error?.data?.message);
    //         setError("root.random", {
    //             type: "random",
    //             message: `Something went wrong: ${error?.data?.message}`
    //         });
    //     }

    //     if (isSuccess) {
    //         toast.success(data?.message);
    //         reset()
    //     }
    // }, [data, isSuccess, error, setError, reset]);

    return (
        <Card>
            <form onSubmit={handleSubmit(handleCreate)} className="container gap-2 p-8 ">
                <div className="space-y-4 mt-4 ">
                    <div className="grid gap-2">
                        <Label>section</Label>
                        <Controller
                            name="section"
                            control={control}
                            rules={{ required: "Section is required" }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-[300px]">
                                        <SelectValue placeholder="Section" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {data?.data && data?.data.map(item => <SelectItem key={item.id} value={item?.id}>{item?.title}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.role && <span className="text-red-600">{errors.role.message}</span>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
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
                        <div className="space-y-1">
                            <Label htmlFor="picture">Picture</Label>
                            <Input
                                {...register("picture")}
                                id="picture"
                                type="file"
                                name="picture"
                                accept="image/jpeg, image/jpg, image/png"
                                onChange={handleImageChange}
                                className="dark:bg-gray-600"
                            />
                            {errors.picture && <span className="text-red-600">{errors.picture.message}</span>}
                            {imageError && <span className="text-red-600">{imageError}</span>}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="details">Details</Label>
                        <Textarea
                            {...register("details")}
                            id="details"
                            name="details"
                            placeholder="Write your details here.."
                        />
                        {errors.details && <span className="text-red-600">{errors.details.message}</span>}
                    </div>
                    <div>
                        <Checkbox
                            id="status"
                            checked={statusCheck}
                            onCheckedChange={(checked) => setStatusCheck(checked)}
                        />
                        <Label htmlFor="status" className="ml-2">Status</Label>
                    </div>

                    <Button>Create</Button>
                </div>
            </form>
        </Card>
    )
}
export default QuestionCategoryTypeForm;