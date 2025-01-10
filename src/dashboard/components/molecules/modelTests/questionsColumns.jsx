import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/dashboard/components/organism/datatable/DataTableColumnHeader";
import { parseHtmlContent } from "@/utils/parseHtmlContent";
import { Check } from "lucide-react";

export const questionsColumns = [
    {
        id: "select",
        header: ({ table }) => {
            const rowSelection = table.getState().rowSelection;

            return (
                <Checkbox
                    checked={Object.keys(rowSelection).length === table.getRowModel().rows.length}
                    onCheckedChange={(value) => {
                        const isChecked = !!value;
                        const newSelection = {};

                        if (isChecked) {
                            table.getRowModel().rows.forEach((row) => {
                                newSelection[row.original.id] = true;
                            });
                        }

                        table.options.meta?.setRowSelection(isChecked ? newSelection : {});
                    }}
                    aria-label="Select all"
                />
            );
        },
        cell: ({ row, table }) => {
            const rowSelection = table.getState().rowSelection;

            return (
                <Checkbox
                    checked={!!rowSelection[row.original.id]}
                    onCheckedChange={(value) => {
                        const newSelection = { ...rowSelection };

                        if (value) {
                            newSelection[row.original.id] = true;
                        } else {
                            delete newSelection[row.original.id];
                        }

                        table.options.meta?.setRowSelection(newSelection);
                    }}
                    aria-label="Select row"
                />
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Serial No" />
        ),
        cell: ({ row, table }) => {
            const { pageIndex, pageSize } = table.getState().pagination;
            const index = row.index + 1 + pageIndex * pageSize;

            return (
                <div className="w-[80px]">{index}</div>
            );
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
                                    !!option?.is_correct && <Check className="text-green-600" />
                                }
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    },
]