import { ImageUploader } from "@/components/atoms/ImageUploader";
import { Button } from "@/components/ui/button";
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
import { useCreatePackageMutation } from "@/features/packages/packageApi";
import { updatePkgField } from "@/features/packages/packageFormSlice";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { SelectCategoryForPkg } from "./SelectCategoryForPkg";

export function PackageCreateForm() {
    const [isActive, setIsActive] = useState(false);

    const dispatch = useDispatch();
    const packageForm = useSelector((state) => state.packageForm);

    const {
        register,
        formState: { errors },
        control,
        setValue,
        handleSubmit,
    } = useForm({
        defaultValues: packageForm
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
        ["clean"],
    ];

    const module = {
        toolbar: toolbarOptions,
    };

    const [selectedSection, setSelectedSection] = useLocalStorage({
        key: "pkgSection",
        defaultValue: "",
    });
    const [selectedExamType, setSelectedExamType] = useLocalStorage({
        key: "pkgExamType",
        defaultValue: "",
    });
    const [selectedExamSubType, setSelectedExamSubType] = useLocalStorage({
        key: "pkgExamSubType",
        defaultValue: "",
    });

    const [createPackage, { isLoading }] = useCreatePackageMutation();

    const handleCreate = async (formData) => {
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

        if (selectedSection || formData.pkgSection) {
            formPayload.append("section_id", selectedSection || formData.pkgSection);
        }

        if (selectedExamType || formData.pkgExamType) {
            formPayload.append("exam_type_id", selectedExamType || formData.exam_type);
        }

        if (selectedExamSubType || formData.pkgExamSubType) {
            formPayload.append("exam_sub_type_id", selectedExamSubType || formData.pkgExamSubType);
        }

        try {
            const response = await createPackage(formPayload).unwrap();
            toast.success(response?.message);
        } catch (err) {
            toast.error(err?.data?.message || "An error occurred");
        }
    };

    return (
        <form onSubmit={handleSubmit(handleCreate)} id="package-form">
            <div className="space-y-4 mt-4">
                {/* Name */}
                <div className="space-y-1">
                    <Label htmlFor="name" className="text-md font-semibold">
                        Name
                    </Label>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Name is required" }}
                        render={({ field }) => (
                            <ReactQuill
                                theme="snow"
                                value={field.value}
                                onChange={(value) => {
                                    field.onChange(value);
                                    dispatch(updatePkgField({ field: 'name', value }));
                                }}
                                modules={module}
                            />
                        )}
                    />
                    {errors.name && (
                        <span className="text-red-600">{errors.name.message}</span>
                    )}
                </div>

                {/* Description */}
                <div className="space-y-1">
                    <Label htmlFor="description" className="text-md font-semibold">
                        Description
                    </Label>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <ReactQuill
                                theme="snow"
                                value={field.value}
                                onChange={(value) => {
                                    field.onChange(value);
                                    dispatch(updatePkgField({ field: 'description', value }));
                                }}
                                modules={module}
                            />
                        )}
                    />
                    {errors.description && (
                        <span className="text-red-600">{errors.description.message}</span>
                    )}
                </div>

                {/* Duration days */}
                <div className="space-y-1 md:w-1/2">
                    <Label htmlFor="duration" className="text-md font-semibold">
                        Duration (in days)
                    </Label>
                    <Input
                        {...register("duration_days")}
                        id="duration"
                        type="number"
                        className="dark:bg-gray-600"
                        onChange={(e) => {
                            dispatch(updatePkgField({ field: 'duration_days', value: e.target.value }));
                        }}
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
                                    dispatch(updatePkgField({ field: 'img', value: file[0] }))
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
                            onChange={(e) => {
                                dispatch(updatePkgField({ field: 'price', value: e.target.value }));
                            }}
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
                            onChange={(e) => {
                                dispatch(updatePkgField({ field: 'discount', value: e.target.value }));
                            }}
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
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    dispatch(updatePkgField({ field: 'discount_type', value }));
                                }}
                                defaultValue={field.value}
                            >
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

                {/* Select Category */}
                <SelectCategoryForPkg
                    setValue={setValue}
                    control={control}
                    setSelectedSection={setSelectedSection}
                    setSelectedExamType={setSelectedExamType}
                    setSelectedExamSubType={setSelectedExamSubType}
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

                <Button disabled={isLoading} type="submit" className="w-full">
                    {isLoading ? "Creating..." : "Create Package"}
                </Button>
            </div>
        </form>
    );
}