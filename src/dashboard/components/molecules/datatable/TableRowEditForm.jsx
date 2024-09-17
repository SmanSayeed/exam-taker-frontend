import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEditQuestionsCategoryMutation } from "@/features/questions/questionsCategoryApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const TableRowEditForm = ({ rowData, open, type }) => {
    console.log("rowData", rowData)

    const [statusCheck, setStatusCheck] = useState(false);
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    useEffect(() => {
        if (open && rowData) {
            setValue("title", rowData.title);
            setValue("details", rowData.details);
            setStatusCheck(rowData.status);
        }
    }, [open, rowData, setValue]);

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

    const [editQuestionsCategory, { data, isSuccess, isLoading, error }] = useEditQuestionsCategoryMutation();

    const handleCreate = async (formData) => {
        const payload = {
            title: formData.title,
            status: statusCheck,
            details: formData.details,
            picture: image
        }

        try {
            const response = await editQuestionsCategory({
                type,
                data: payload,
                id: rowData.id
            }).unwrap();

            toast.success(response?.message);
        } catch (err) {
            console.log(err.message)
            toast.error(err?.data?.message || "An error occurred");
        }
    }

    return (
        <form onSubmit={handleSubmit(handleCreate)} className="container gap-2 p-8 ">
            <div className="space-y-4 mt-4 ">
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

                <DialogFooter>
                    <Button disabled={isLoading} type="submit">
                        {isLoading ? "Updating" : "Save changes"}
                    </Button>
                </DialogFooter>
            </div>
        </form>
    )
}

export default TableRowEditForm