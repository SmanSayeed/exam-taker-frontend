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

import { useState } from "react";
import { DataTableToolbar } from "../../organism/datatable/DataTableToolbar";
import PaginationForQuesTable from "./PaginationForQuesTable";

export function DataTableForExamCreate({
    columns,
    data,
    currentPage,
    perPage,
    onSelectRowIds,
    setPerPage,
    setCurrentPage,
    refetch,
    totalRecords
}) {

    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState({});
    const [columnFilters, setColumnFilters] = useState([]);
    const [sorting, setSorting] = useState([]);

    console.log("ROW SELECTION", rowSelection)

    const table = useReactTable({
        data: data || [],
        columns: columns || [],
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters
        },
        enableRowSelection: true,
        onRowSelectionChange: (newSelection) => {
            setRowSelection(newSelection);
            console.log("new selection", newSelection)
            const selectedRows = table.getSelectedRowModel().rows;
            const selectedIds = selectedRows.map((row) => row.original.id);

            onSelectRowIds(selectedIds);
        },
        // onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues()
    });

    return (
        <div className="space-y-4 py-4">
            <DataTableToolbar
                table={table}
            />

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

            <PaginationForQuesTable
                table={table}
                data={data}
                currentPage={currentPage}
                perPage={perPage}
                refetch={refetch}
                onPageChange={(newPage) => {
                    setCurrentPage(newPage);
                    refetch({
                        page: newPage,
                        perPage: perPage
                    });
                }}
                onPerPageChange={(newPageSize) => {
                    setPerPage(newPageSize);
                    refetch({
                        page: currentPage,
                        perPage: newPageSize,
                    });
                }}
                totalRecords={totalRecords}
            />
        </div>
    )
}