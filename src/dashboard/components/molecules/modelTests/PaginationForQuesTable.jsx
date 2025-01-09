import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon
} from "@radix-ui/react-icons";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DataTablePagination({ table }) {
    return (
        <div className="flex items-center justify-between overflow-auto px-2">
            <div className="hidden flex-1 text-sm text-muted-foreground sm:block">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center sm:space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="hidden text-sm font-medium sm:block">Rows per page</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={value => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to first page</span>
                        <DoubleArrowLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to last page</span>
                        <DoubleArrowRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}







// import { Button } from "@/components/ui/button";
// import {
//     DoubleArrowLeftIcon,
//     DoubleArrowRightIcon
// } from "@radix-ui/react-icons";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// export default function PaginationForQuesTable({ table, onPerPageChange, onPageChange, currentPage, perPage, totalRecords }) {

//     const totalPages = Math.ceil(totalRecords / perPage);

//     const handlePreviousClick = () => {
//         if (currentPage > 1) {
//             onPageChange(currentPage - 1);
//         }
//     };

//     const handleNextClick = () => {
//         if (currentPage < totalPages) {
//             onPageChange(currentPage + 1);
//         }
//     };

//     const handlePerPageChange = (e) => {
//         const newPerPage = parseInt(e.target.value, 10);
//         onPerPageChange(newPerPage);
//         onPageChange(1); // Reset to page 1
//     };

//     return (
//         <div className="flex items-center justify-between overflow-auto px-2">
//             <div className="hidden flex-1 text-sm text-muted-foreground sm:block">
//                 {table.getFilteredSelectedRowModel().rows.length} of{" "}
//                 {table.getFilteredRowModel().rows.length} row(s) selected.
//             </div>
//             <div className="flex items-center sm:space-x-6 lg:space-x-8">
//                 {/* Options for "per page" and "jump to page" */}
//                 <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
//                     <div>
//                         <label className="mr-2 text-gray-700 dark:text-gray-300">Items per page:</label>
//                         <select
//                             value={perPage}
//                             onChange={handlePerPageChange}
//                             className="border p-1 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//                         >
//                             {[10, 20, 50, 100].map((num) => (
//                                 <option key={num} value={num}>
//                                     {num}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* <div className="flex items-center space-x-2">
//                         <input
//                             type="number"
//                             min="1"
//                             max={totalPages}
//                             placeholder="Jump to page"
//                             value={jumpToPage}
//                             onChange={(e) => setJumpToPage(e.target.value)}
//                             className="border p-1 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-24"
//                         />
//                         <Button onClick={handleJumpToPage} disabled={!jumpToPage}>
//                             Go
//                         </Button>
//                     </div> */}
//                 </div>

//                 <div className="flex w-[100px] items-center justify-center text-sm font-medium">
//                     Page {currentPage} of{" "}
//                     {totalPages}
//                 </div>

//                 <div className="flex items-center space-x-2">
//                     <Button
//                         variant="outline"
//                         className="hidden h-8 w-8 p-0 lg:flex"
//                         onClick={() => onPageChange(1)}
//                         disabled={currentPage === 1}
//                     >
//                         <span className="sr-only">Go to first page</span>
//                         <DoubleArrowLeftIcon className="h-4 w-4" />
//                     </Button>

//                     {/* previous page button */}
//                     <Button
//                         variant="outline"
//                         className="h-8 w-8 p-0"
//                         onClick={handlePreviousClick}
//                         disabled={currentPage === 1}
//                     >
//                         <span className="sr-only">Go to previous page</span>
//                         <ChevronLeft className="h-4 w-4" />
//                     </Button>

//                     {/* next page button */}
//                     <Button
//                         variant="outline"
//                         className="h-8 w-8 p-0"
//                         onClick={handleNextClick}
//                         disabled={currentPage === totalPages}
//                     >
//                         <span className="sr-only">Go to next page</span>
//                         <ChevronRight className="h-4 w-4" />
//                     </Button>

//                     <Button
//                         variant="outline"
//                         className="hidden h-8 w-8 p-0 lg:flex"
//                         onClick={() => onPageChange(totalPages)}
//                         disabled={currentPage === totalPages}
//                     >
//                         <span className="sr-only">Go to last page</span>
//                         <DoubleArrowRightIcon className="h-4 w-4" />
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     )
// }

