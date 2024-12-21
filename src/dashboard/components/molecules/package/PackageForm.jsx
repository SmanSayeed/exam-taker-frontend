import { ImageUploader } from "@/components/atoms/ImageUploader";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import SelectCategoryForPackage from "./SelectCategoryForPackage";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const PackageForm = ({
    initialValues = {},
    onSubmit,
    isLoading,
    buttonLabel = "Submit"
}) => {

    const {
        register,
        control,
        setValue,
        formState: { errors },
        handleSubmit
    } = useForm({
        defaultValues: {
            name: initialValues.name || "",
            description: initialValues.description || "",
            duration_days: initialValues.duration_days || "",
            price: initialValues.price || "",
            discount: initialValues.discount || "",
            discount_type: initialValues.discount_type || "percentage",
            is_active: initialValues.is_active === 1 ? true : false,
            img: initialValues.img || ""
        }
    });

    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"],
        ["link", "formula"],
        [{ header: 1 }, { header: 2 }, { header: 3 }],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["clean"]
    ];

    const modules = {
        toolbar: toolbarOptions
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 mt-4">
                {/* Name */}
                <div className="space-y-1">
                    <Label htmlFor="name" className="text-md font-semibold">Name</Label>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Name is required" }}
                        render={({ field }) => (
                            <ReactQuill
                                theme="snow"
                                value={field.value}
                                onChange={field.onChange}
                                modules={modules}
                            />
                        )}
                    />
                    {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                </div>

                {/* Description */}
                <div className="space-y-1">
                    <Label htmlFor="description" className="text-md font-semibold">Description</Label>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <ReactQuill
                                theme="snow"
                                value={field.value}
                                onChange={field.onChange}
                                modules={modules}
                            />
                        )}
                    />
                </div>

                {/* Duration, Price, and Discount */}
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="space-y-1 md:w-1/3">
                        <Label htmlFor="duration" className="text-md font-semibold">Duration (in days)</Label>
                        <Input
                            {...register("duration_days")}
                            id="duration_days"
                            type="number"
                            className="dark:bg-gray-600"
                        />
                    </div>
                    <div className="space-y-1 md:w-1/3">
                        <Label htmlFor="price" className="text-md font-semibold">Price</Label>
                        <Input
                            {...register("price")}
                            id="price"
                            type="number"
                            className="dark:bg-gray-600"
                        />
                    </div>
                    <div className="space-y-1 md:w-1/3">
                        <Label htmlFor="discount" className="text-md font-semibold">Discount</Label>
                        <Input
                            {...register("discount")}
                            id="discount"
                            type="number"
                            className="dark:bg-gray-600"
                        />
                    </div>
                </div>

                {/* Discount Type */}
                <div className="space-y-1 md:w-1/2">
                    <Label htmlFor="discount_type" className="text-md font-semibold">
                        Discount Type
                    </Label>
                    <Controller
                        name="discount_type"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="amount">Amount</SelectItem>
                                    <SelectItem value="percentage">Percentage</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>

                {/* Image Uploader */}
                <div className="space-y-1">
                    <Label htmlFor="img" className="text-md font-semibold">Upload Image</Label>
                    <Controller
                        name="img"
                        control={control}
                        render={({ field }) => (
                            <ImageUploader
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div>

                {/* Select Category */}
                <SelectCategoryForPackage
                    setValue={setValue}
                    control={control}
                />

                {/* Active Checkbox */}
                {/* <div>
                    <Checkbox
                        id="is_active"
                        name="is_active"
                        checked={isActive}
                        onCheckedChange={(checked) => setIsActive(checked)}
                    />
                    <Label htmlFor="is_active" className="ml-2">Active</Label>
                </div> */}
                <div>
                    <Controller
                        name="is_active"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                id="is_active"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        )}
                    />
                    <Label htmlFor="is_active" className="ml-2">Active</Label>
                </div>

                {/* Submit Button */}
                <Button disabled={isLoading} type="submit" className="w-full">
                    {isLoading ? "Submitting..." : buttonLabel}
                </Button>
            </div>
        </form>
    );
};
