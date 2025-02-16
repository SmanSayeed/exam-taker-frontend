import {
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

import { useGetQuestionsQuery } from "@/features/questions/questionsApi";
import { useState } from "react";
import { DataTablePagination } from "../../organism/datatable/DataTablePagination";
import { DataTableToolbar } from "../../organism/datatable/DataTableToolbar";

export function QuestionsDataTable({
    columns = [],
    filters = {},
    pagination,
    setPagination,
    rowSelection,
    setRowSelection
}) {

    const [columnVisibility, setColumnVisibility] = useState({});
    const [columnFilters, setColumnFilters] = useState([]);
    const [sorting, setSorting] = useState([]);

    const {
        data: questionsData,
    } = useGetQuestionsQuery({
        page: pagination.pageIndex + 1,
        perPage: pagination.pageSize,
        ...filters
    });

    const table = useReactTable({
        data: questionsData?.data?.data || [],
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination
        },
        pageCount: Math.ceil((questionsData?.data?.total || 1) / pagination.pageSize),
        manualPagination: true,
        onPaginationChange: setPagination,
        getPaginationRowModel: getPaginationRowModel(),
        enableRowSelection: true,
        meta: {
            setRowSelection: (newSelection) => {
                setRowSelection(newSelection);
            },
        },
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    return (
        <div className="space-y-4">
            <DataTableToolbar table={table} />
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {
                            table.getHeaderGroups().map(headerGroup => (
                                <TableRow key={headerGroup.id}>
                                    {
                                        headerGroup.headers.map(header => {
                                            return (
                                                <TableHead key={header.id} colSpan={header.colSpan}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })
                                    }
                                </TableRow>
                            ))
                        }
                    </TableHeader>
                    <TableBody>
                        {
                            table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map(row => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {
                                            row.getVisibleCells().map(cell => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>

            <DataTablePagination
                table={table}
                totalRecords={questionsData?.data?.total}
                lastPage={questionsData?.data?.last_page}
                fromQuestionTable={true}
                filters={filters}
            />
        </div>
    )
}