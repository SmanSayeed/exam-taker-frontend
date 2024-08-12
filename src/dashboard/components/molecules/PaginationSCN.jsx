import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem
} from "@/components/ui/pagination";
import { useGetQuestionsQuery } from "@/features/questions/questionsApi";
import { useState } from "react";

export default function PaginationSCN() {
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data using the current page
  const { data, isLoading, isError } = useGetQuestionsQuery(currentPage);

  const paginationData = data?.data?.data
  const paginationURl = data?.data

  const totalPage = Math.ceil(data?.data?.total / 10)


  // Handle page click
  // const handlePageClick = () => {
  //   setCurrentPage(prevPage => prevPage + 1);
  // };

  // Handle previous and next buttons
  const handlePreviousClick = () => {
    if (paginationData?.prev_page_url) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextClick = () => {
    if (paginationURl?.next_page_url) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading questions.</div>;

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {/* <PaginationPrevious
              href="#11"
              onClick={handlePreviousClick}
              disabled={!paginationData?.prev_page_url}
            /> */}
            <Button onClick={handlePreviousClick}>Previous </Button>
          </PaginationItem>

          {Array.from({ length: totalPage }, (_, index) => (
            <PaginationItem key={index}>
              <button className="bg-gray-500 px-3 py-[.06rem] rounded-sm text-white hover:bg-gray-800 duration-500 "  >{index + 1}</button>
            </PaginationItem>
          ))}

          <PaginationItem>
            {/* <PaginationNext
              // href="#"
              onClick={handleNextClick}
              disabled={!paginationData?.next_page_url}
            /> */}
            <Button onClick={handleNextClick}>Next</Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}