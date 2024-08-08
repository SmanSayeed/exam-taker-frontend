import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/dashboard/components/molecules/datatable/DataTableColumnHeader";
import useTypeProvider from "@/hooks/useTypeProvider";
import { DataTableRowActions } from "../../organism/DataTableRowActions";

export const columns = [
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
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                        {row.getValue("title")}
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
        accessorKey: "details",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Details" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                        {row.getValue("details")}
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: "section_id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Section ID" />
        ),
        cell: ({ row }) => {
            return (
                <>
                    {
                        row.original.section_id && (
                            <div className="flex space-x-2">
                                <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                                    {row.getValue("section_id")}
                                </span>
                            </div>
                        )
                    }
                </>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { type } = useTypeProvider();
            return <DataTableRowActions row={row} type={type} />;
        }
    }
]