import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useUpdatePdfMutation } from "@/features/pdfs/pdfApi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { parseHtmlContent } from "@/utils/parseHtmlContent";
import { PdfCardActions } from "./PdfCardActions";

const PdfCard = ({ pdf, refetch }) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [isActive, setIsActive] = useState(pdf?.is_active);
  const [updatePdf, { isLoading }] = useUpdatePdfMutation();

  const handleChangeStatus = async () => {
    try {
      const updatedStatus = !isActive;

      const response = await updatePdf({
        id: pdf?.id,
        data: { is_active: updatedStatus ? 1 : 0 },
      }).unwrap();

      setIsActive(updatedStatus);

      toast.success(
        `PDF status updated to ${updatedStatus ? "Active" : "Inactive"}.` ||
          response?.message
      );
    } catch (error) {
      // Revert local state if the API call fails
      setIsActive(isActive);

      toast.error("Failed to update PDF status. Please try again.");
    }
  };

  return (
    <Card className="py-4 relative group shadow-md hover:shadow-lg duration-500">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {parseHtmlContent(pdf?.title)}
        </CardTitle>
        <CardDescription>{parseHtmlContent(pdf?.description)}</CardDescription>
      </CardHeader>

      {/* Actions */}
      <PdfCardActions pdfId={pdf?.id} refetch={refetch} />

      <div className="flex justify-between">
        {/* View PDF Button */}
        <div className="flex items-center flex-col">
          <Link
            to={`${BASE_URL}${pdf?.storage_url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-start space-x-2 mt-4 p-4"
          >
            <Button variant="outline">View PDF</Button>
          </Link>
          <Link  className="flex items-center justify-start space-x-2" to={`${pdf?.file_link}`}>
            <Button variant="outline">File link</Button>
          </Link>
        </div>
        {/* Change Status */}
        <div className="flex items-center justify-end space-x-2 mt-4 p-4">
          <Label htmlFor={`status-switch-${pdf?.id}`}>Change Status</Label>
          <Switch
            id={`status-switch-${pdf?.id}`}
            checked={isActive}
            onCheckedChange={handleChangeStatus}
            disabled={isLoading}
          />
        </div>
      </div>
    </Card>
  );
};

export default PdfCard;
