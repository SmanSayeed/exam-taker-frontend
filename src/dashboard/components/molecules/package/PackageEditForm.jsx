import { useEditPackageMutation } from "@/features/packages/packageApi";
import { toast } from "sonner";
import { PackageForm } from "./PackageForm";

export const PackageEditForm = ({ singlePackage }) => {
    const [editPackage, { isLoading }] = useEditPackageMutation();

    const handleEditPackage = async (formData) => {
        const payload = new FormData();

        payload.append("name", formData.name);
        payload.append("description", formData.description);
        payload.append("duration_days", formData.duration_days);
        payload.append("price", formData.price);

        if (formData.img) {
            payload.append("img", formData.img);
        }

        payload.append("discount", formData.discount);
        payload.append("discount_type", formData.discount_type);
        payload.append("is_active", formData.is_active ? 1 : 0);

        if (formData.section) {
            payload.append("section_id", formData.section);
        }
        if (formData.exam_Type) {
            payload.append("exam_type_id", formData.exam_Type);
        }
        if (formData.exam_sub_type) {
            payload.append("exam_sub_type_id", formData.exam_sub_type);
        }

        // if (singlePackage?.category?.section_id || formData.section) {
        //     payload.append("section_id", singlePackage?.category?.section_id || formData.section);
        // }
        // if (singlePackage?.category?.exam_type_id || formData.exam_Type) {
        //     payload.append("exam_type_id", singlePackage?.category?.exam_type_id || formData.exam_Type);
        // }
        // if (singlePackage?.category?.exam_sub_type_id || formData.exam_sub_type) {
        //     payload.append("exam_sub_type_id", singlePackage?.category?.exam_sub_type_id || formData.exam_sub_type);
        // }

        try {
            const response = await editPackage({ id: singlePackage?.id, data: payload }).unwrap();
            toast.success(response?.message);
        } catch (err) {
            toast.error(err?.data?.message || "An error occurred");
        }
    };

    return (
        <PackageForm
            initialValues={singlePackage}
            onSubmit={handleEditPackage}
            isLoading={isLoading}
            buttonLabel="Update Package"
        />
    );
};
