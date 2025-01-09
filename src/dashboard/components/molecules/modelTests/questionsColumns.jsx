import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/dashboard/components/organism/datatable/DataTableColumnHeader";
import { parseHtmlContent } from "@/utils/parseHtmlContent";
import { Check } from "lucide-react";

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
            const mcqOptions = row.original.mcq_questions || [];
            console.log("mcqoptions", mcqOptions)

            return (
                <div className="flex flex-col space-y-2">
                    <span className="font-medium">
                        {parseHtmlContent(row.getValue("title"))}
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                        {mcqOptions.map((option) => (
                            <div
                                key={option.id}
                                className="flex items-center space-x-1 p-2 rounded-md border-gray-400"
                            >
                                <span className={`text-sm font-medium min-w-[20px] ${option.is_correct && 'text-green-500'}`}>
                                    {option.mcq_option_serial}.
                                </span>
                                <span className={`text-sm ${option.is_correct && 'text-green-500'}`}>
                                    {parseHtmlContent(option.mcq_question_text)}
                                </span>
                                {
                                    option?.is_correct && <Check className="text-green-600" />
                                }
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    },
]