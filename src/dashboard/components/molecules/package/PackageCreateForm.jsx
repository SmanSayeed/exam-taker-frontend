import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreatePackageMutation } from "@/features/packages/packagesApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import SelectCategoryForPackage from "./SelectCategoryForPackage";

function PackageCreateForm() {
    const [isActive, setIsActive] = useState(false);

    const aPackage = useSelector(state => state.package);
    const { name, description, duration_days, price } = aPackage;

    const {
        register,
        formState: { errors },
        control,
        setValue,
        handleSubmit
    } = useForm({
        defaultValues: {
            name: name || "",
            description: description || "",
            duration_days: duration_days || "",
            price: price || "",

        }
    });

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

    const [selectedSection, setSelectedSection] = useLocalStorage({ key: 'selectedSection', defaultValue: "" });
    const [selectedExamType, setSelectedExamType] = useLocalStorage({ key: 'selectedExamType', defaultValue: "" });
    const [selectedExamSubType, setSelectedExamSubType] = useLocalStorage({ key: 'selectedExamSubType', defaultValue: "" });

    const [createPackage, { isLoading }] = useCreatePackageMutation()

    const handleCreate = async (formData) => {
        console.log("formData", formData)
        const categoriesPayload = {
            section_id: selectedSection || formData.section,
            exam_type_id: selectedExamType || formData.exam_Type,
            exam_sub_type_id: selectedExamSubType || formData.exam_sub_type
        }

        const payload = {
            name: formData.name,
            description: formData.description,
            duration_days: formData.duration,
            price: formData.price,
            is_active: isActive,
            category: categoriesPayload
        };

        try {
            const response = await createPackage(payload).unwrap();
            toast.success(response?.message);
        } catch (err) {
            toast.error(err?.data?.message || "An error occurred");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleCreate)} id="question-form">
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
                            rules={{ required: "Description is required" }}
                            render={({ field }) => (
                                <ReactQuill
                                    theme="snow"
                                    value={field.value}
                                    onChange={field.onChange}
                                    modules={module}
                                />
                            )}
                        />
                        {errors.description && <span className="text-red-600">{errors.description.message}</span>}
                    </div>

                    {/* duration and price */}
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="space-y-1 md:w-1/2">
                            <Label htmlFor="duration" className="text-md font-semibold">Duration (in day) </Label>
                            <Input
                                {...register("duration")}
                                id="duration"
                                type="number"
                                name="duration"
                                className="dark:bg-gray-600"
                            />
                            {errors.duration && <span className="text-red-600">{errors.duration.message}</span>}
                        </div>
                        <div className="space-y-1 md:w-1/2">
                            <Label htmlFor="price" className="text-md font-semibold">Price</Label>
                            <Input
                                {...register("price")}
                                id="price"
                                type="number"
                                name="price"
                                className="dark:bg-gray-600"
                            />
                            {errors.price && <span className="text-red-600">{errors.price.message}</span>}
                        </div>
                    </div>

                    {/* select category */}
                    <SelectCategoryForPackage
                        setValue={setValue}
                        control={control}
                        setSelectedSection={setSelectedSection}
                        setSelectedExamType={setSelectedExamType}
                        setSelectedExamSubType={setSelectedExamSubType}
                    />

                    {/* is_active */}
                    <div>
                        <Checkbox
                            id="is_active"
                            checked={isActive}
                            onCheckedChange={(checked) => setIsActive(checked)}
                        />
                        <Label htmlFor="is_paid" className="ml-2">Active</Label>
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
        </>
    )
}
export default PackageCreateForm