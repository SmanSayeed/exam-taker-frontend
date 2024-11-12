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

  // Fetch data using the current page
  const { data, isLoading, isError } = useGetQuestionsQuery(currentPage);

  // Destructure necessary data from the response
  const paginationData = data?.data?.data;
  const totalPage = Math.ceil(data?.data?.total / 10);
  const prevPageUrl = data?.data?.prev_page_url;
  const nextPageUrl = data?.data?.next_page_url;

  // Handle page click for specific page numbers
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Handle previous and next buttons
  const handlePreviousClick = () => {
    if (prevPageUrl) {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleNextClick = () => {
    if (nextPageUrl) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading questions.</div>;

  return (
    <div className="space-y-5">
      {/* Render your list of questions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        {paginationData?.map((question) => (
          <QuestionCard key={question.id} data={question} refetch={refetch} />
        ))}
      </div>

      {/* Render pagination controls */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button onClick={handlePreviousClick} disabled={!prevPageUrl}>
              Previous
            </Button>
          </PaginationItem>

          {Array.from({ length: totalPage }, (_, index) => (
            <PaginationItem key={index}>
              <button
                className={`${index + 1 === currentPage
                  ? "bg-gray-800"
                  : "bg-gray-500 hover:bg-gray-800"
                  } px-3 py-[.06rem] rounded-sm text-white duration-500`}
                onClick={() => handlePageClick(index + 1)}
              >
                {index + 1}
              </button>
            </PaginationItem>
          ))}

          <PaginationItem>
            <Button onClick={handleNextClick} disabled={!nextPageUrl}>
              Next
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}