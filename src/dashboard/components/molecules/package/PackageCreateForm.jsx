import { useCreatePackageMutation } from "@/features/packages/packageApi";
import { toast } from "sonner";
import { PackageForm } from "./PackageForm";

export const PackageCreateForm = () => {
    const [createPackage, { isLoading }] = useCreatePackageMutation();

    const pkgSection = JSON.parse(localStorage.getItem("pkgSection"));
    const pkgExamType = JSON.parse(localStorage.getItem("pkgExamType"));
    const pkgExamSubTye = JSON.parse(localStorage.getItem("pkgExamSubTye"));

    const handleCreatePackage = async (formData) => {
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

        if (pkgSection || formData.section) {
            payload.append("section_id", pkgSection || formData.section);
        }
        if (pkgExamType || formData.exam_Type) {
            payload.append("exam_type_id", pkgExamType || formData.exam_Type);
        }
        if (pkgExamSubTye || formData.exam_sub_type) {
            payload.append("exam_sub_type_id", pkgExamSubTye || formData.exam_sub_type);
        }

        try {
            const response = await createPackage(payload).unwrap();
            toast.success(response?.message);
        } catch (err) {
            toast.error(err?.data?.message || "An error occurred");
        }
    };

    return (
        <PackageForm
            onSubmit={handleCreatePackage}
            isLoading={isLoading}
            buttonLabel="Create Package"
        />
    );
};

