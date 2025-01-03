import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/dashboard/components/organism/datatable/DataTableColumnHeader";
import { CatTableRowActions } from "./CatTableRowActions";

export const additionalPkgCatsColumns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={value => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Serial No" />
        ),
        cell: ({ row }) => {
            const index = row.index + 1;
            return (
                <div className="w-[80px]">{index}</div>
            )
        },
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                        {row.getValue("name")}
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                        {row.getValue("status")}
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: "description",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Details" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                        {row.getValue("description")}
                    </span>
                </div>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => <CatTableRowActions row={row} type={"additional-package-categories"} />
    }
]