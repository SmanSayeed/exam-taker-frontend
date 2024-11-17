import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import FilterQuestionsByCategory from "../molecules/questionList/FilterQuestionsByCategory";

export default function FilteringQuestions() {
  return (
    <div className="relativ h-full min-h-20 ">
      <div>
        <FilterQuestionsByCategory />
      </div>

      <div className="mb-4 text-end">
        <Button>
          Ok
        </Button>
      </div>

      {/* <div className="refresh-and-search w-full ">
        <FilterQuestionsBySearch />
      </div> */}
      <div className="relative w-full md:flex-1 border border-white rounded-md">
        <Input
          placeholder="Search questions..."
          className="pr-10"
        />
        <button type="submit" className="absolute right-2 top-1/4">
          <Search size={18} className="opacity-70" />
        </button>
      </div>
    </div>
  )
}