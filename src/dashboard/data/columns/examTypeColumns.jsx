import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/dashboard/components/molecules/DataTableColumnHeader"
import { DataTableRowActions } from "@/dashboard/components/molecules/DataTableRowActions"
import { labels} from "../data";
import { Badge } from "@/components/ui/badge";

export const examTypeColumns =[
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
            <DataTableColumnHeader column={column} title="ID" />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => {
            const label = labels.find(label => label.value === row.original.label)

            return (
                <div className="flex space-x-2">
                    {label && <Badge variant="outline">{label.label}</Badge>}
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
            const label = labels.find(label => label.value === row.original.label)

            return (
                <div className="flex space-x-2">
                    {label && <Badge variant="outline">{label.label}</Badge>}
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
            const label = labels.find(label => label.value === row.original.label)

            return (
                <div className="flex space-x-2">
                    {label && <Badge variant="outline">{label.label}</Badge>}
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
            const label = labels.find(label => label.value === row.original.label)

            return (
                <div className="flex space-x-2">
                    {label && <Badge variant="outline">{label.label}</Badge>}
                    <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                        {row.getValue("section_id")}
                    </span>
                </div>
            )
        }
    },
    {
        id: "actions",
        cell: () => <DataTableRowActions />
    }
]