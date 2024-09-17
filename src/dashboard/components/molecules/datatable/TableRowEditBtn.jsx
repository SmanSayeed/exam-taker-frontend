import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Edit } from "lucide-react";
import { useState } from "react";
import TableRowEditForm from "./TableRowEditForm";

const TableRowEditBtn = ({ row, type }) => {

    const [open, setOpen] = useState(false);

    const handleOpen = (event) => {
        event.preventDefault();

        setOpen(true);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={handleOpen}>
                <DropdownMenuItem className="cursor-pointer">
                    <button className="flex">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </button>
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent
                onClick={(e) => e.stopPropagation()}
                className="max-w-[85%] sm:max-w-[70%]"
            >
                <DialogHeader>
                    <DialogTitle>Edit question&apos;s category</DialogTitle>
                    <DialogDescription>
                        Make changes to your categories here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>

                <TableRowEditForm
                    open={open}
                    rowData={row.original}
                    type={type}
                />

            </DialogContent>
        </Dialog>
    )
}

export default TableRowEditBtn
