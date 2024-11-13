import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem
} from "@/components/ui/pagination";
import { useGetQuestionsQuery } from "@/features/questions/questionsApi";
import { useState } from "react";
import QuestionCard from "./QuestionCard";

export default function PaginationSCN({ refetch }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [jumpToPage, setJumpToPage] = useState("");

  // Fetch data using current page and perPage values
  const { data, isLoading, isError } = useGetQuestionsQuery({ page: currentPage, perPage });

  // Destructure necessary data from the response
  const paginationData = data?.data?.data;
  const totalRecords = data?.data?.total;
  const totalPages = Math.ceil(totalRecords / perPage);
  const prevPageUrl = data?.data?.prev_page_url;
  const nextPageUrl = data?.data?.next_page_url;

  const handlePageClick = (page) => setCurrentPage(page);

  const handlePreviousClick = () => {
    if (prevPageUrl) setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextClick = () => {
    if (nextPageUrl) setCurrentPage((prev) => prev + 1);
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to page 1 on per-page change
  };

  const handleJumpToPage = () => {
    const page = parseInt(jumpToPage, 10);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setJumpToPage("");
    }
  };

  // Generate the page numbers to display in the pagination bar
  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 6) {
      // Display all pages if total pages are fewer than 6
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Show first 2 pages, ellipsis, and last 2 pages
      pages.push(1, 2);
      if (currentPage > 4) pages.push("...");
      if (currentPage > 3 && currentPage < totalPages - 2) pages.push(currentPage);
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages - 1, totalPages);
    }
    return pages;
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading questions.</div>;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        {paginationData?.map((question) => (
          <QuestionCard key={question.id} data={question} refetch={refetch} />
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button onClick={handlePreviousClick} disabled={!prevPageUrl}>
                Previous
              </Button>
            </PaginationItem>

            {generatePageNumbers().map((page, index) => (
              <PaginationItem key={index}>
                {page === "..." ? (
                  <span className="px-3">...</span>
                ) : (
                  <button
                    className={`px-3 py-[.06rem] rounded-sm text-white duration-500 ${
                      page === currentPage ? "bg-gray-800" : "bg-gray-500 hover:bg-gray-800"
                    }`}
                    onClick={() => handlePageClick(page)}
                  >
                    {page}
                  </button>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <Button onClick={handleNextClick} disabled={!nextPageUrl}>
                Next
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {/* Select per page */}
        <div>
          <label className="mr-2 text-gray-700">Items per page:</label>
          <select value={perPage} onChange={handlePerPageChange} className="border p-1 rounded">
            {[10, 20, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Jump to page */}
        <div>
          <input
            type="number"
            min="1"
            max={totalPages}
            placeholder="Jump to page"
            value={jumpToPage}
            onChange={(e) => setJumpToPage(e.target.value)}
            className="border p-1 rounded w-24"
          />
          <Button onClick={handleJumpToPage} disabled={!jumpToPage}>
            Go
          </Button>
        </div>

        {/* Total data and pages display */}
        <div className="text-gray-700">
          <span>Total Records: {totalRecords}</span> | <span>Total Pages: {totalPages}</span>
        </div>
      </div>
    </div>
  );
}
