// import { Button } from "@/components/ui/button";
// import {
//     Pagination,
//     PaginationContent,
//     PaginationItem
// } from "@/components/ui/pagination";
// import { useState } from "react";
// import Loading from "../../atoms/Loading";

// export default function PaginationForQuesTable({
//     data,
//     table,
//     totalRecords,
//     currentPage,
//     perPage,
//     onPageChange,
//     onPerPageChange,
//     refetch,
//     isLoadingQuestions
// }) {
//     const [jumpToPage, setJumpToPage] = useState("");
//     const totalPages = Math.ceil(totalRecords / perPage);

//     // Page click handling with loader
//     const handlePageClick = (page) => {
//         onPageChange(page);
//     };

//     // Previous/Next click handlers with loader
//     const handlePreviousClick = () => {
//         if (currentPage > 1) {
//             handlePageClick(currentPage - 1);
//         }
//     };

//     const handleNextClick = () => {
//         if (currentPage < totalPages) {
//             handlePageClick(currentPage + 1);
//         }
//     };

//     // Per-page change handling
//     const handlePerPageChange = (e) => {
//         const newPerPage = parseInt(e.target.value, 10);
//         onPerPageChange(newPerPage);
//         onPageChange(1); // Reset to page 1 on per-page change
//     };

//     // Jump to page handling
//     const handleJumpToPage = () => {
//         const page = parseInt(jumpToPage, 10);
//         if (page >= 1 && page <= totalPages) {
//             handlePageClick(page);
//             setJumpToPage("");
//         }
//     };

//     // Generate displayed page numbers
//     const generatePageNumbers = () => {
//         const pages = [];
//         if (totalPages <= 10) {
//             for (let i = 1; i <= totalPages; i++) pages.push(i);
//         } else {
//             pages.push(1, 2, 3);
//             if (currentPage > 6) pages.push("...");
//             const middlePages = [currentPage - 1, currentPage, currentPage + 1].filter(
//                 (page) => page > 3 && page < totalPages - 2
//             );
//             pages.push(...middlePages);
//             if (currentPage < totalPages - 5) pages.push("...");
//             pages.push(totalPages - 2, totalPages - 1, totalPages);
//         }
//         return pages;
//     };

//     if (isLoadingQuestions) return <Loading />;

//     if (!data) {
//         return <h1 className="text-5xl text-black">No data found</h1>;
//     }

//     return (
//         <div className="space-y-4">
//             {/* display seleted row count */}
//             <div className="hidden flex-1 text-sm text-muted-foreground sm:block">
//                 {table.getFilteredSelectedRowModel().rows.length} of{" "}
//                 {table.getFilteredRowModel().rows.length} row(s) selected.
//             </div>

//             {/* Display total records and pages */}
//             <div className="text-gray-700 dark:text-gray-300 text-sm">
//                 <span>Total Records: {totalRecords}</span> | <span>Total Pages: {totalPages}</span>
//             </div>

//             {/* Pagination controls */}
//             <Pagination className="flex items-center justify-center space-x-2">
//                 <PaginationContent>
//                     <PaginationItem>
//                         <Button onClick={handlePreviousClick} disabled={currentPage === 1}>
//                             Previous
//                         </Button>
//                     </PaginationItem>

//                     {generatePageNumbers().map((page, index) => (
//                         <PaginationItem key={index}>
//                             {page === "..." ? (
//                                 <span className="px-3 text-gray-500">...</span>
//                             ) : (
//                                 <button
//                                     className={`px-3 py-[.06rem] rounded-sm text-white duration-500 ${page === currentPage ? "bg-gray-800" : "bg-gray-500 hover:bg-gray-800"
//                                         }`}
//                                     onClick={() => handlePageClick(page)}
//                                 >
//                                     {page}
//                                 </button>
//                             )}
//                         </PaginationItem>
//                     ))}

//                     <PaginationItem>
//                         <Button
//                             onClick={handleNextClick}
//                             disabled={currentPage === totalPages}
//                         >
//                             Next
//                         </Button>
//                     </PaginationItem>
//                 </PaginationContent>
//             </Pagination>

//             {/* Options for "per page" and "jump to page" */}
//             <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
//                 <div>
//                     <label className="mr-2 text-gray-700 dark:text-gray-300">Items per page:</label>
//                     <select
//                         value={perPage}
//                         onChange={handlePerPageChange}
//                         className="border p-1 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//                     >
//                         {[10, 20, 50, 100].map((num) => (
//                             <option key={num} value={num}>
//                                 {num}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                     <input
//                         type="number"
//                         min="1"
//                         max={totalPages}
//                         placeholder="Jump to page"
//                         value={jumpToPage}
//                         onChange={(e) => setJumpToPage(e.target.value)}
//                         className="border p-1 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-24"
//                     />
//                     <Button onClick={handleJumpToPage} disabled={!jumpToPage}>
//                         Go
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }




import { Button } from "@/components/ui/button";
import {
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon
} from "@radix-ui/react-icons";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationForQuesTable({ table, onPerPageChange, onPageChange, currentPage, perPage, totalRecords }) {

    const totalPages = Math.ceil(totalRecords / perPage);

    const handlePreviousClick = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePerPageChange = (e) => {
        const newPerPage = parseInt(e.target.value, 10);
        onPerPageChange(newPerPage);
        onPageChange(1); // Reset to page 1
    };

    return (
        <div className="flex items-center justify-between overflow-auto px-2">
            <div className="hidden flex-1 text-sm text-muted-foreground sm:block">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center sm:space-x-6 lg:space-x-8">
                {/* Options for "per page" and "jump to page" */}
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div>
                        <label className="mr-2 text-gray-700 dark:text-gray-300">Items per page:</label>
                        <select
                            value={perPage}
                            onChange={handlePerPageChange}
                            className="border p-1 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        >
                            {[10, 20, 50, 100].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* <div className="flex items-center space-x-2">
                        <input
                            type="number"
                            min="1"
                            max={totalPages}
                            placeholder="Jump to page"
                            value={jumpToPage}
                            onChange={(e) => setJumpToPage(e.target.value)}
                            className="border p-1 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-24"
                        />
                        <Button onClick={handleJumpToPage} disabled={!jumpToPage}>
                            Go
                        </Button>
                    </div> */}
                </div>

                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {currentPage} of{" "}
                    {totalPages}
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => onPageChange(1)}
                        disabled={currentPage === 1}
                    >
                        <span className="sr-only">Go to first page</span>
                        <DoubleArrowLeftIcon className="h-4 w-4" />
                    </Button>

                    {/* previous page button */}
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={handlePreviousClick}
                        disabled={currentPage === 1}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {/* next page button */}
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={handleNextClick}
                        disabled={currentPage === totalPages}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => onPageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        <span className="sr-only">Go to last page</span>
                        <DoubleArrowRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

