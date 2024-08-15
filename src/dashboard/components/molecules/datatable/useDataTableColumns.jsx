import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/dashboard/components/molecules/datatable/DataTableColumnHeader";
import { useGetQuestionsCategoryQuery } from "@/features/questions/questionsCategoryApi";
import { useEffect, useState } from "react";
import { DataTableRowActions } from "../../organism/DataTableRowActions";

const useDataTableColumns = (type) => {
    const [includeSectionId, setIncludeSectionId] = useState(false);
    const [includeYearId, setIncludeYearId] = useState(false);
    const [examTypeId, setExamTypeId] = useState(false);

    const { data: categoryData, isLoading, isError } = useGetQuestionsCategoryQuery(type);

    useEffect(() => {
        if (categoryData?.data) {
            setIncludeSectionId(categoryData?.data?.data.some(item => item.section_id !== undefined));
            setIncludeYearId(categoryData?.data?.data.some(item => item.year !== undefined));
            setExamTypeId(categoryData?.data?.data.some(item => item.exam_type_id !== undefined));
        }
    }, [categoryData]);

    if (isLoading || isError) return null;

    return [
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
        ...(includeSectionId ? [{
            accessorKey: "section_id",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Section" />
            ),
            cell: ({ row }) => {
                return (
                    <>
                        {row.original.section_id && (
                            <div className="flex space-x-2">
                                <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                                    {row.original.section.title}
                                </span>
                            </div>
                        )}
                    </>
                );
            }
        }] : []),
        ...(includeYearId ? [{
            accessorKey: "year",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Year" />
            ),
            cell: ({ row }) => {
                return (
                    <>
                        {row.original.year && (
                            <div className="flex space-x-2">
                                <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                                    {row.getValue("year")}
                                </span>
                            </div>
                        )}
                    </>
                );
            }
        }] : []),
        ...(examTypeId ? [{
            accessorKey: "exam_type_id",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Exam Type" />
            ),
            cell: ({ row }) => {
                return (
                    <>
                        {row.original.exam_type_id && (
                            <div className="flex space-x-2">
                                <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                                    {row.original.exam_type.title}
                                </span>
                            </div>
                        )}
                    </>
                );
            }
        }] : []),
        {
            id: "actions",
            cell: ({ row }) => <DataTableRowActions row={row} type={type} />
        }
    ];
}

export default useDataTableColumns;
