import { DeleteAction } from "@/components/delete-action";
import IconMenu from "@/components/icon-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeletePdfMutation } from "@/features/pdfs/pdfApi";
import { EllipsisVertical, FilePenIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function PdfCardActions({ pdfId, refetch }) {
  const [deletePdf] = useDeletePdfMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer absolute top-3 right-[-5px]"
        >
          <EllipsisVertical className="w-5 h-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* Edit PDF */}
        <DropdownMenuItem>
          <Link
            to={`/admin/pdf/edit/${pdfId}`}
            className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
            state={{ pdfId }}
          >
            <IconMenu text="Edit" icon={<FilePenIcon className="h-4 w-4" />} />
          </Link>
        </DropdownMenuItem>

        {/* Delete PDF */}
        <DropdownMenuItem>
          <DeleteAction
            entityId={pdfId}
            entityName="PDF"
            deleteFunction={deletePdf}
            refetch={refetch}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
