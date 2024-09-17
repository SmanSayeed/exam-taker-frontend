import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import TableRowDeleteBtn from "../molecules/datatable/TableRowDeleteBtn";
import TableRowEditBtn from "../molecules/datatable/TableRowEditBtn";

export function DataTableRowActions({ row, type }) {

    return (
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
                {/* Edit button */}
                <TableRowEditBtn row={row} type={type} />

                <DropdownMenuSeparator />

                {/* Delete button */}
                <DropdownMenuItem className="cursor-pointer">
                    <TableRowDeleteBtn row={row} type={type} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
