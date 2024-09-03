import { Input } from "@/components/ui/input";
import { Check, RefreshCcw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuestionSearchQuery } from "@/features/questions/questionsApi";
import { useState } from "react";

export default function FilterQuestionsBySearch() {
  const [searchTerm, setSearchTerm] = useState('');


  const { data, error, isLoading } = useQuestionSearchQuery({
    "keyword": searchTerm,
    "types": ["mcq", "creative"],
    "perPage": 15
  });


  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    console.log("searchTerm", searchTerm)

  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // No additional action required as the query is triggered by state change
  };

  return (
    <div className="flex flex-col flex-wrap lg:flex-row items-center gap-2 mt-6 ">

      <form onSubmit={handleFormSubmit} className="relative w-full md:flex-1 border border-white rounded-md">
        <Input
          value={searchTerm}
          onChange={handleSearchInputChange}
          placeholder="Search questions..."
          className="pr-10"
        />
        <button type="submit" className="absolute right-2 top-1/4">
          <Search size={18} className="opacity-70" />
        </button>
      </form>

      <div className="flex flex-wrap items-center justify-around gap-2 ">
        <div className="border border-white flex items-center gap-2 pl-2 rounded-lg bg-black cursor-pointer">
          <Check size={20} className="text-white" />
          <Button>Answer</Button>
        </div>

        <div className="border border-white flex items-center gap-2 pl-2 rounded-lg bg-black cursor-pointer">
          <Check size={20} className="text-white" />
          <Button>Describe</Button>
        </div>

        <div className="border border-white flex items-center gap-2 pl-2 rounded-lg bg-black cursor-pointer">
          <RefreshCcw size={20} className="text-white" />
          <Button>Refresh</Button>
        </div>
      </div>

      {/* Search Results */}
      <div className="mt-4 w-full">
        {isLoading && <p>Loading...</p>}

        {!isLoading && error && <p>Error: {error?.data?.message}</p>}

        {!isLoading && !error && data?.data?.data?.length > 0 ? (
          data?.data?.data?.map((question) => (
            <div key={question.id} className="mb-4">
              <h3 className="text-lg font-semibold">{question.title}</h3>
              <p className="text-sm text-gray-600">{question.description}</p>
            </div>
          ))
        ) : (
          !isLoading && !error && <p>No results found</p>
        )}
      </div>
    </div>
  );
}