import { useCreatePackageMutation } from "@/features/packages/packageApi";
import { toast } from "sonner";
import { PackageForm } from "./PackageForm";

export const PackageCreateForm = () => {
    const [createPackage, { isLoading }] = useCreatePackageMutation();

    const handleCreatePackage = async (formData) => {
        try {
            const data = new FormData();

            // Append all form fields to FormData
            Object.keys(formData).forEach((key) => {
                if (key === "img" && formData[key]) {
                    data.append(key, formData[key]); // Attach image file
                } else if (key === "is_active") {
                    data.append(key, formData[key] ? 1 : 0); // convert boolean to integar
                } else {
                    data.append(key, formData[key]); // Attach other fields
                }
            });

            const response = await createPackage(data).unwrap();
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

