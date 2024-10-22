import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/dashboard/components/molecules/datatable/DataTableColumnHeader";
import { useGetQuestionsCategoryQuery } from "@/features/questions/questionsCategoryApi";
import { useEffect, useState } from "react";
import { DataTableRowActions } from "../components/organism/DataTableRowActions";

const useDataTableColumns = (type) => {
    const [includeSectionId, setIncludeSectionId] = useState(false);
    const [includeYearId, setIncludeYearId] = useState(false);
    const [includeExamTypeId, setIncludeExamTypeId] = useState(false);
    const [includeLevelId, setIncludeLevelId] = useState(false);
    const [includeGroupId, setIncludeGroupId] = useState(false);
    const [includePart, setIncludePart] = useState(false);
    const [includeSubjectId, setIncludeSubjectId] = useState(false);
    const [includeLessonId, setIncludeLessonId] = useState(false);
    const [includeTopicId, setIncludeTopicId] = useState(false);

    const { data: categoryData, isLoading, isError } = useGetQuestionsCategoryQuery(type);
    console.log("topicsData", categoryData)

    useEffect(() => {
        if (categoryData?.data) {
            setIncludeSectionId(categoryData?.data?.data.some(item => item.section_id !== undefined));
            setIncludeYearId(categoryData?.data?.data.some(item => item.year !== undefined));
            setIncludeExamTypeId(categoryData?.data?.data.some(item => item.exam_type_id !== undefined));
            setIncludeLevelId(categoryData?.data?.data.some(item => item.level_id !== undefined));
            setIncludeGroupId(categoryData?.data?.data.some(item => item.group_id !== undefined));
            setIncludePart(categoryData?.data?.data.some(item => item.part !== undefined));
            setIncludeSubjectId(categoryData?.data?.data.some(item => item.subject_id !== undefined));
            setIncludeLessonId(categoryData?.data?.data.some(item => item.lesson_id !== undefined));
            setIncludeTopicId(categoryData?.data?.data.some(item => item.topic_id !== undefined));
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
                console.log("topics row data:", row.getValue("status"))
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
                                    {row.original.year}
                                </span>
                            </div>
                        )}
                    </>
                );
            }
        }] : []),
        ...(includeExamTypeId ? [{
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
        ...(includeLevelId ? [{
            accessorKey: "level_id",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Level" />
            ),
            cell: ({ row }) => {
                return (
                    <>
                        {row.original.level_id && (
                            <div className="flex space-x-2">
                                <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                                    {row.original.level.title}
                                </span>
                            </div>
                        )}
                    </>
                );
            }
        }] : []),
        ...(includeGroupId ? [{
            accessorKey: "group_id",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Group" />
            ),
            cell: ({ row }) => {
                return (
                    <>
                        {row.original.group_id && (
                            <div className="flex space-x-2">
                                <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                                    {row.original.group.title}
                                </span>
                            </div>
                        )}
                    </>
                );
            }
        }] : []),
        ...(includePart ? [{
            accessorKey: "part",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Part" />
            ),
            cell: ({ row }) => {
                return (
                    <>
                        {row.original.part && (
                            <div className="flex space-x-2">
                                <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                                    {row.original.part}
                                </span>
                            </div>
                        )}
                    </>
                );
            }
        }] : []),
        ...(includeSubjectId ? [{
            accessorKey: "subject_id",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Subject" />
            ),
            cell: ({ row }) => {
                return (
                    <>
                        {row.original.subject_id && (
                            <div className="flex space-x-2">
                                <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                                    {row.original.subject.title}
                                </span>
                            </div>
                        )}
                    </>
                );
            }
        }] : []),
        ...(includeLessonId ? [{
            accessorKey: "lesson_id",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Lesson" />
            ),
            cell: ({ row }) => {
                return (
                    <>
                        {row.original.lesson_id && (
                            <div className="flex space-x-2">
                                <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                                    {row.original.lesson.title}
                                </span>
                            </div>
                        )}
                    </>
                );
            }
        }] : []),
        ...(includeTopicId ? [{
            accessorKey: "topic_id",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Topic" />
            ),
            cell: ({ row }) => {
                return (
                    <>
                        {row.original.topic_id && (
                            <div className="flex space-x-2">
                                <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                                    {row.original.topic.title}
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
