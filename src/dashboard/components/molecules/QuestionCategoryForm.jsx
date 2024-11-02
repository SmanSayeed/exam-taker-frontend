import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useCreateQuestionsCategoryMutation } from "@/features/questions/questionsCategoryApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const QuestionCategoryForm = ({ type, refetchOnQuestionsCategoryQuery }) => {
    const [statusCheck, setStatusCheck] = useState(false);
    // const [image, setImage] = useState(null);
    // const [imageError, setImageError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setError
    } = useForm();

    const [createQuestionsCategory, { data, isSuccess, isLoading, error }] = useCreateQuestionsCategoryMutation();

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];

    //     if (file) {
    //         const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    //         const isValidType = validTypes.includes(file.type);
    //         const isValidSize = file.size <= 2 * 1024 * 1024; // 2 MB
    //         if (!isValidType) {
    //             setImageError("Only jpg, jpeg, and png formats are allowed.");
    //             setImage(null);
    //             return;
    //         }
    //         if (!isValidSize) {
    //             setImageError("File size should not exceed 2 MB.");
    //             setImage(null);
    //             return;
    //         }
    //         setImageError("");
    //         setImage(file);
    //     }
    // };

    const handleCreate = (formData) => {
        const payload = {
            title: formData.title,
            status: statusCheck,
            details: formData.details,
            // picture: image
        }

        createQuestionsCategory({
            type,
            data: payload
        })
    }

    useEffect(() => {
        if (error?.data) {
            toast.error(error?.data?.message);
            setError("root.random", {
                type: "random",
                message: `Something went wrong: ${error?.data?.message}`
            });
        }

        if (isSuccess) {
            toast.success(data?.message);
            reset();
            refetchOnQuestionsCategoryQuery();
        }
    }, [data, isSuccess, error, setError, reset, refetchOnQuestionsCategoryQuery]);

    return (
        <Card>
            <form onSubmit={handleSubmit(handleCreate)} className="p-4 md:p-8 ">
                <div className="space-y-4">
                    {/* category title */}
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
                        {/* <div className="space-y-1">
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
                    </div> */}
                    </div>
                    {/* category details */}
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
                    {/* status */}
                    <div>
                        <Checkbox
                            id="status"
                            checked={statusCheck}
                            onCheckedChange={(checked) => setStatusCheck(checked)}
                        />
                        <Label htmlFor="status" className="ml-2">Status</Label>
                    </div>

                    <Button disabled={isLoading}>
                        {isLoading ? "Loading" : "Create"}
                    </Button>
                </div>
            </form>
        </Card>
    )
}
export default QuestionCategoryForm;