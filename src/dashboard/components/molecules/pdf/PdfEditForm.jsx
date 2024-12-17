import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUpdatePdfMutation } from "@/features/pdfs/pdfApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

export default function PdfEditForm({ initialData }) {
  const [isActive, setIsActive] = useState(initialData?.is_active || false);
  const [filePreview, setFilePreview] = useState(
    initialData?.storage_url || ""
  );
  const [imgPreview, setImgPreview] = useState(initialData?.img || "");
  const [pdfFile, setPdfFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialData?.title || "",
      file_link: initialData?.file_link || "",
      description: initialData?.description || "",
    },
  });

  const [updatePdf, { isLoading }] = useUpdatePdfMutation();

  useEffect(() => {
    setIsActive(initialData?.is_active || false);
    setValue("is_active", initialData?.is_active);
  }, [initialData, setValue]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setFilePreview(file.name);
      setValue("file", file);
    } else {
      toast.error("Only PDF files are allowed.");
      e.target.value = null;
    }
  };

  const handleImgUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImgFile(file);
      setImgPreview(URL.createObjectURL(file));
      setValue("img", file);
    } else {
      toast.error("Only image files are allowed.");
      e.target.value = null;
    }
  };

  const handleFormSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.file) formData.append("file", data.file);
    if (data.img) formData.append("img", data.img);
    if (data.file_link) formData.append("file_link", data.file_link);
    formData.append("is_active", isActive ? 1 : 0);
    formData.append("description", data.description || "");

    try {
      const updatedData = await updatePdf({
        id: initialData.id,
        data,
      }).unwrap();
      console.log(updatedData);
      toast.success("PDF and Image Updated Successfully!");

      // Reset form and local state with updated data
      reset({
        title: updatedData.data.title,
        file_link: updatedData.data.file_link || "",
        description: updatedData.data.description || "",
      });

      setIsActive(updatedData.data.is_active);
      setFilePreview(updatedData.data.storage_url || "");
      setImgPreview(updatedData.data.img || "");

      setPdfFile(null);
      setImgFile(null);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "An error occurred while updating.");
    }
  };



  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6 p-4 border rounded-md"
    >
      {/* Title */}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <span className="text-red-600">{errors.title.message}</span>
        )}
      </div>

      {/* PDF Upload */}
      <div>
        <Label htmlFor="file">Upload PDF</Label>
        <Controller
          name="file"
          control={control}
          render={() => (
            <Input
              id="file"
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
            />
          )}
        />
        {filePreview && (
          <p className="text-sm mt-2 text-green-600">
            <a
              href={
                pdfFile
                  ? URL.createObjectURL(pdfFile)
                  : `${BASE_URL}${filePreview}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Preview PDF
            </a>
          </p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <Label htmlFor="img">Upload Image</Label>
        <Controller
          name="img"
          control={control}
          render={() => (
            <Input
              id="img"
              type="file"
              accept="image/*"
              onChange={handleImgUpload}
            />
          )}
        />
        {imgPreview && (
          <img
            src={
              imgFile
                ? URL.createObjectURL(imgFile)
                : `${BASE_URL}/${imgPreview}`
            }
            alt="Image Preview"
            className="mt-2 h-20 w-20 object-cover rounded"
          />
        )}
      </div>

      {/* File Link */}
      <div>
        <Label htmlFor="file_link">File Link (optional)</Label>
        <Input
          id="file_link"
          placeholder="Enter file link"
          {...register("file_link", {
            validate: (value) => {
              if (!value && !pdfFile)
                return "Either a file or file link is required";
              return true;
            },
          })}
        />
        {errors.file_link && (
          <span className="text-red-600">{errors.file_link.message}</span>
        )}
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter description"
          {...register("description")}
        />
      </div>

      {/* Is Active Checkbox */}
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

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
          </>
        ) : (
          "Update PDF and Image"
        )}
      </Button>
    </form>
  );
}
