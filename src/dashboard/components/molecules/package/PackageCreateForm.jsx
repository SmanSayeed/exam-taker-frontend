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
import useLocalStorage from "@/hooks/useLocalStorage";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import SelectCategoryForPackage from "./SelectCategoryForPackage";

export default function PackageCreateForm() {
    const [isActive, setIsActive] = useState(false);
    const [imgPreview, setImgPreview] = useState(null);

    const aPackage = useSelector((state) => state.package);
    const { name, description, duration_days, price } = aPackage;

    const {
        register,
        formState: { errors },
        control,
        setValue,
        handleSubmit,
    } = useForm({
        defaultValues: {
            name: name || "",
            description: description || "",
            duration_days: duration_days || "",
            price: price || "",
            img: "",
            discount: "",
            discount_type: "amount",
        },
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
        key: "selectedSection",
        defaultValue: "",
    });
    const [selectedExamType, setSelectedExamType] = useLocalStorage({
        key: "selectedExamType",
        defaultValue: "",
    });
    const [selectedExamSubType, setSelectedExamSubType] = useLocalStorage({
        key: "selectedExamSubType",
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
        formPayload.append("section_id", selectedSection || formData.section);
        formPayload.append("exam_type_id", selectedExamType || formData.exam_Type);
        formPayload.append("exam_sub_type_id", selectedExamSubType || formData.exam_sub_type);

        try {
            const response = await createPackage(formPayload).unwrap();
            toast.success(response?.message);
        } catch (err) {
            toast.error(err?.data?.message || "An error occurred");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImgPreview(reader.result);
            };
            reader.readAsDataURL(file);
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
                                onChange={field.onChange}
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
                    {errors.description && (
                        <span className="text-red-600">{errors.description.message}</span>
                    )}
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

                {/* Image */}
                <div className="space-y-1">
                    <Label htmlFor="img" className="text-md font-semibold">
                        Image
                    </Label>
                    <Input
                        id="img"
                        name="img"
                        type="file"
                        accept="image/*"
                        {...register("img", { required: "Image is required" })}
                        onChange={handleFileChange}
                        className="dark:bg-gray-600"
                    />
                    {imgPreview && (
                        <img src={imgPreview} alt="Preview" className="mt-2 max-h-32" />
                    )}
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

                {/* Select Category */}
                <SelectCategoryForPackage
                    setValue={setValue}
                    control={control}
                    setSelectedSection={setSelectedSection}
                    setSelectedExamType={setSelectedExamType}
                    setSelectedExamSubType={setSelectedExamSubType}
                />

                {/* Is Active */}
                <div>
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







// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import { useCreatePackageMutation } from "@/features/packages/packageApi";
// import useLocalStorage from "@/hooks/useLocalStorage";
// import { useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import ReactQuill from "react-quill";
// import { useSelector } from "react-redux";
// import { toast } from "sonner";
// import SelectCategoryForPackage from "./SelectCategoryForPackage";

// function PackageCreateForm() {
//     const [isActive, setIsActive] = useState(false);
//     const [imgPreview, setImgPreview] = useState(null);

//     const aPackage = useSelector((state) => state.package);
//     const { name, description, duration_days, price } = aPackage;

//     const {
//         register,
//         formState: { errors },
//         control,
//         setValue,
//         handleSubmit,
//     } = useForm({
//         defaultValues: {
//             name: name || "",
//             description: description || "",
//             duration_days: duration_days || "",
//             price: price || "",
//             img: "",
//             discount: "",
//             discount_type: "amount",
//         },
//     });

//     const toolbarOptions = [
//         ["bold", "italic", "underline", "strike"],
//         ["link", "formula"],
//         [{ header: 1 }, { header: 2 }, { header: 3 }],
//         [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
//         [{ script: "sub" }, { script: "super" }],
//         [{ indent: "-1" }, { indent: "+1" }],
//         [{ direction: "rtl" }],
//         [{ size: ["small", false, "large", "huge"] }],
//         [{ header: [1, 2, 3, 4, 5, 6, false] }],
//         [{ color: [] }, { background: [] }],
//         [{ font: [] }],
//         [{ align: [] }],
//         ["clean"],
//     ];

//     const module = {
//         toolbar: toolbarOptions,
//     };

//     const [selectedSection, setSelectedSection] = useLocalStorage({
//         key: "selectedSection",
//         defaultValue: "",
//     });
//     const [selectedExamType, setSelectedExamType] = useLocalStorage({
//         key: "selectedExamType",
//         defaultValue: "",
//     });
//     const [selectedExamSubType, setSelectedExamSubType] = useLocalStorage({
//         key: "selectedExamSubType",
//         defaultValue: "",
//     });

//     const [createPackage, { isLoading }] = useCreatePackageMutation();

//     const handleCreate = async (formData) => {
//         console.log("formdata", formData)

//         const categoriesPayload = {
//             section_id: selectedSection || formData.section,
//             exam_type_id: selectedExamType || formData.exam_Type,
//             exam_sub_type_id: selectedExamSubType || formData.exam_sub_type,
//         };

//         const payload = {
//             name: formData.name,
//             description: formData.description,
//             duration_days: formData.duration_days,
//             price: formData.price,
//             img: imgPreview,
//             discount: formData.discount,
//             discount_type: formData.discount_type,
//             is_active: isActive,
//             category: categoriesPayload,
//         };

//         try {
//             const response = await createPackage(payload).unwrap();
//             toast.success(response?.message);
//         } catch (err) {
//             toast.error(err?.data?.message || "An error occurred");
//         }
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];

//         if (file) {
//             const reader = new FileReader();

//             reader.onload = () => {
//                 setImgPreview(reader.result); // Store base64 image
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit(handleCreate)} id="package-form">
//             <div className="space-y-4 mt-4">
//                 {/* Name */}
//                 <div className="space-y-1">
//                     <Label htmlFor="name" className="text-md font-semibold">
//                         Name
//                     </Label>
//                     <Controller
//                         name="name"
//                         control={control}
//                         rules={{ required: "Name is required" }}
//                         render={({ field }) => (
//                             <ReactQuill
//                                 theme="snow"
//                                 value={field.value}
//                                 onChange={field.onChange}
//                                 modules={module}
//                             />
//                         )}
//                     />
//                     {errors.name && (
//                         <span className="text-red-600">{errors.name.message}</span>
//                     )}
//                 </div>

//                 {/* Description */}
//                 <div className="space-y-1">
//                     <Label htmlFor="description" className="text-md font-semibold">
//                         Description
//                     </Label>
//                     <Controller
//                         name="description"
//                         control={control}
//                         rules={{ required: "Description is required" }}
//                         render={({ field }) => (
//                             <ReactQuill
//                                 theme="snow"
//                                 value={field.value}
//                                 onChange={field.onChange}
//                                 modules={module}
//                             />
//                         )}
//                     />
//                     {errors.description && (
//                         <span className="text-red-600">{errors.description.message}</span>
//                     )}
//                 </div>

//                 {/* Duration */}
//                 <div className="space-y-1 md:w-1/2">
//                     <Label htmlFor="duration" className="text-md font-semibold">
//                         Duration (in days)
//                     </Label>
//                     <Input
//                         {...register("duration_days")}
//                         id="duration"
//                         type="number"
//                         className="dark:bg-gray-600"
//                     />
//                 </div>

//                 {/* Image */}
//                 <div className="space-y-1">
//                     <Label htmlFor="img" className="text-md font-semibold">
//                         Image
//                     </Label>
//                     <Input
//                         id="img"
//                         name="img"
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                         className="dark:bg-gray-600"
//                     />
//                     {imgPreview && (
//                         <img src={imgPreview} alt="Preview" className="mt-2 max-h-32" />
//                     )}
//                 </div>

//                 {/* Price and Discount */}
//                 <div className="flex flex-col md:flex-row gap-8">
//                     {/* Price */}
//                     <div className="space-y-1 md:w-1/2">
//                         <Label htmlFor="price" className="text-md font-semibold">
//                             Price
//                         </Label>
//                         <Input
//                             {...register("price")}
//                             id="price"
//                             type="number"
//                             className="dark:bg-gray-600"
//                         />
//                     </div>

//                     {/* Discount */}
//                     <div className="space-y-1 md:w-1/2">
//                         <Label htmlFor="discount" className="text-md font-semibold">
//                             Discount
//                         </Label>
//                         <Input
//                             {...register("discount")}
//                             id="discount"
//                             type="number"
//                             className="dark:bg-gray-600"
//                         />
//                     </div>
//                 </div>

//                 {/* Discount Type */}
//                 <div className="space-y-1 md:w-1/2">
//                     <Label htmlFor="discount_type" className="text-md font-semibold">
//                         Discount Type
//                     </Label>
//                     <Controller
//                         name="discount_type"
//                         control={control}
//                         render={({ field }) => (
//                             <Select onValueChange={field.onChange} defaultValue={field.value}>
//                                 <SelectTrigger>
//                                     <SelectValue />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="amount">Amount</SelectItem>
//                                     <SelectItem value="percentage">Percentage</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         )}
//                     />
//                 </div>

//                 {/* Select Category */}
//                 <SelectCategoryForPackage
//                     setValue={setValue}
//                     control={control}
//                     setSelectedSection={setSelectedSection}
//                     setSelectedExamType={setSelectedExamType}
//                     setSelectedExamSubType={setSelectedExamSubType}
//                 />

//                 {/* Is Active */}
//                 <div>
//                     <Checkbox
//                         id="is_active"
//                         checked={isActive}
//                         onCheckedChange={(checked) => setIsActive(checked)}
//                     />
//                     <Label htmlFor="is_active" className="ml-2">
//                         Active
//                     </Label>
//                 </div>

//                 <Button disabled={isLoading} type="submit" className="w-full">
//                     {isLoading ? "Creating..." : "Create Package"}
//                 </Button>
//             </div>
//         </form>
//     );
// }

// export default PackageCreateForm;
