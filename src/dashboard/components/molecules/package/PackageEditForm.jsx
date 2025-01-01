import { ImageUploader } from "@/components/atoms/ImageUploader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditPackageMutation } from "@/features/packages/packageApi";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { toast } from "sonner";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { setSelectedExamSubType, setSelectedExamType, setSelectedSection } from "@/features/questions/selectedCategoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { SelectCatForPkgEdit } from "./SelectCatForPkgEdit";

export const PackageEditForm = ({ singlePackage }) => {
    const dispatch = useDispatch();
    const selectedCategories = useSelector((state) => state.selectedCategories);

    const [isActive, setIsActive] = useState(singlePackage?.is_active === 1 ? true : false);

    const {
        register,
        formState: { errors },
        control,
        setValue,
        reset,
        handleSubmit
    } = useForm({
        defaultValues: {
            name: singlePackage?.name || "",
            description: singlePackage?.description || "",
            duration_days: singlePackage?.duration_days || "",
            price: singlePackage?.price || "",
            discount: singlePackage?.discount || "",
            discount_type: singlePackage?.discount_type || "amount",
            is_active: isActive,
            img: singlePackage?.img || ""
        }
    });

    useEffect(() => {
        if (singlePackage) {
            reset({
                name: singlePackage?.name || "",
                description: singlePackage?.description || "",
                duration_days: singlePackage?.duration_days || "",
                price: singlePackage?.price || "",
                discount: singlePackage?.discount || "",
                discount_type: singlePackage?.discount_type || "amount",
                is_active: isActive,
                img: singlePackage?.img || ""
            });

            const initialCategory = singlePackage?.category;

            dispatch(setSelectedSection({ selectedSection: initialCategory.section_id || "" }));
            dispatch(setSelectedExamType({ selectedExamType: initialCategory.exam_type_id || "" }));
            dispatch(setSelectedExamSubType({ selectedExamSubType: initialCategory.exam_sub_type_id || "" }));
        }
    }, [singlePackage, reset, dispatch, isActive]);

    // rich text editor options
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

    const [editPackage, { isLoading }] = useEditPackageMutation();

    const handleEditPackage = async (formData) => {
        const formPayload = new FormData();

        formPayload.append("name", formData.name);
        formPayload.append("description", formData.description);
        formPayload.append("duration_days", formData.duration_days);
        formPayload.append("price", formData.price);

        if (formData.img[0]) {
            formPayload.append("img", formData.img[0]);
        }

        formPayload.append("discount", formData.discount);
        formPayload.append("discount_type", formData.discount_type);
        formPayload.append("is_active", isActive ? 1 : 0);

        if (selectedCategories.selectedSection || formData.pkgSection) {
            formPayload.append("section_id", selectedCategories.selectedSection || formData.pkgSection);
        }

        if (selectedCategories.selectedExamType || formData.pkgExamType) {
            formPayload.append("exam_type_id", selectedCategories.selectedExamType || formData.exam_type);
        }

        if (selectedCategories.selectedExamSubType || formData.pkgExamSubType) {
            formPayload.append("exam_sub_type_id", selectedCategories.selectedExamSubType || formData.pkgExamSubType);
        }

        try {
            const response = await editPackage({ id: singlePackage?.id, data: formPayload }).unwrap();
            toast.success(response?.message);
        } catch (err) {
            toast.error(err?.data?.message || "An error occurred");
        }
    }

    return (
        <form onSubmit={handleSubmit(handleEditPackage)} id="package-edit-form" className="my-4">
            <div className="space-y-4 mt-4">
                {/* name */}
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
                                modules={module}
                            />
                        )}
                    />
                    {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                </div>

                {/* description */}
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
                                modules={module}
                            />
                        )}
                    />
                </div>

                {/* Duration */}
                <div className="space-y-1 md:w-1/2">
                    <Label htmlFor="duration" className="text-md font-semibold">
                        Duration (in days)
                    </Label>
                    <Input
                        {...register("duration_days")}
                        id="duration"
                        type="number"
                        className="dark:bg-gray-600"
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
                                onChange={(file) => {
                                    field.onChange(file);
                                }}
                            />
                        )}
                    />
                </div>

                {/* Price and Discount */}
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="space-y-1 md:w-1/2">
                        <Label htmlFor="price" className="text-md font-semibold">
                            Price
                        </Label>
                        <Input
                            {...register("price")}
                            id="price"
                            type="number"
                            className="dark:bg-gray-600"
                        />
                    </div>
                    <div className="space-y-1 md:w-1/2">
                        <Label htmlFor="discount" className="text-md font-semibold">
                            Discount
                        </Label>
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

                {/* select category */}
                <SelectCatForPkgEdit
                    setValue={setValue}
                    control={control}
                />

                {/* Is Active */}
                <div className="flex items-center">
                    <Checkbox
                        id="is_active"
                        checked={isActive}
                        onCheckedChange={(checked) => setIsActive(checked)}
                    />
                    <Label htmlFor="is_active" className="ml-2">
                        Active
                    </Label>
                </div>

                <Button
                    disabled={isLoading}
                    type="submit"
                    className="w-full"
                >
                    {isLoading ? "Creating..." : "Create Question"}
                </Button>
            </div>
        </form>
    )
}