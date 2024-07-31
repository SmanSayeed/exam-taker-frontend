import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/dashboard/components/molecules/DataTableColumnHeader"
import { DataTableRowActions } from "@/dashboard/components/molecules/DataTableRowActions"
import { labels, statuses} from "../data";
import { Badge } from "@/components/ui/badge";

export const questionsColumns = [
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
        accessorKey: "description",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Description" />
        ),
        cell: ({ row }) => {
            const label = labels.find(label => label.value === row.original.label)

            return (
                <div className="flex space-x-2">
                    {label && <Badge variant="outline">{label.label}</Badge>}
                    <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                        {row.getValue("description")}
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: "answer_details",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Answer Details" />
        ),
        cell: ({ row }) => {
            const label = labels.find(label => label.value === row.original.label)

            return (
                <div className="flex space-x-2">
                    {label && <Badge variant="outline">{label.label}</Badge>}
                    <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                        {row.getValue("answer_details")}
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: "is_paid",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Is Paid" />
        ),
        cell: ({ row }) => {
            const label = labels.find(label => label.value === row.original.label)

            return (
                <div className="flex space-x-2">
                    {label && <Badge variant="outline">{label.label}</Badge>}
                    <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                        {row.getValue("role")}
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: "is_featured",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Is Featured" />
        ),
        cell: ({ row }) => {
            const status = statuses.find(
                status => status.value === row.getValue("status")
            )

            if (!status) {
                return null
            }

            return (
                <div className="flex w-[100px] items-center">
                    {status.icon && (
                        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{status.label}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        }
    },
    {
        accessorKey: "created_date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created Date" />
        ),
        cell: ({ row }) => {
            const label = labels.find(label => label.value === row.original.label)

            return (
                <div className="flex space-x-2">
                    {label && <Badge variant="outline">{label.label}</Badge>}
                    <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                        {row.getValue("created_date")}
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