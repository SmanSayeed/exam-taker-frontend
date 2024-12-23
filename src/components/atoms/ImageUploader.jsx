import { Button } from "@/components/ui/button";
import { useState } from "react";

export const ImageUploader = ({ value, onChange }) => {
    const baseURL = "https://loopsexam.xyz";
    const imageURL = value && `${baseURL}${value}`;

    const [preview, setPreview] = useState(imageURL || null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                onChange(file); // Pass the file to the parent form
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setPreview(null);
        onChange(null); // Clear the value in the parent form
    };

    return (
        <div className="space-y-2">
            {preview ? (
                <div className="relative w-40 h-40">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg border"
                    />
                    <Button
                        type="button"
                        className="absolute top-1 right-1 bg-red-600 text-white text-sm px-2 py-1"
                        onClick={handleRemoveImage}
                    >
                        Remove
                    </Button>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                    <span className="text-sm text-gray-500">Click to upload</span>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>
            )}
        </div>
    );
};