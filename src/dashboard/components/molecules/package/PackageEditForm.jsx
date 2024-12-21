import { useEditPackageMutation } from "@/features/packages/packageApi";
import { toast } from "sonner";
import { PackageForm } from "./PackageForm";

export const PackageEditForm = ({ singlePackage }) => {
    const [editPackage, { isLoading }] = useEditPackageMutation();

    const handleEditPackage = async (formData) => {
        try {
            const data = new FormData();

            // Append all fields to FormData
            Object.keys(formData).forEach((key) => {
                if (key === "img" && formData[key]) {
                    data.append(key, formData[key]); // Attach the image file
                } else if (key === "is_active") {
                    data.append(key, formData[key] === true ? 1 : 0); // convert boolean to integar
                } else {
                    data.append(key, formData[key]); // Attach other fields
                }
            });

            const response = await editPackage({ id: singlePackage?.id, data }).unwrap();
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
