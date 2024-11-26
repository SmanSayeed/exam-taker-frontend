import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import { CustomDialog } from "@/components/custom-dialog";
import IconMenu from "@/components/icon-menu";
import { FilePenIcon } from "lucide-react";
import { useState } from "react";
import TableRowDeleteBtn from "../molecules/datatable/TableRowDeleteBtn";
import { TableRowEditForm } from "../molecules/datatable/TableRowEditForm";

export function DataTableRowActions({ row, type }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Edit Question Dialog */}
            <CustomDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title="Edit question's category"
                description="Make changes to your categories here. Click save when you&apos;re done."
            >
                <TableRowEditForm
                    open={isOpen}
                    rowData={row.original}
                    type={type}
                    setOpen={setIsOpen}
                />
            </CustomDialog>

            {/* action dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    >
                        <DotsHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    {/* Edit action */}
                    <DropdownMenuItem className="cursor-pointer">
                        {/* <TableRowEditBtn row={row} type={type} /> */}
                        <button
                            onClick={() => setIsOpen(true)}
                        >
                            <IconMenu
                                text="Edit"
                                icon={<FilePenIcon className="h-4 w-4" />}
                            />
                        </button>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* Delete action */}
                    <DropdownMenuItem className="cursor-pointer">
                        <TableRowDeleteBtn row={row} type={type} />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
