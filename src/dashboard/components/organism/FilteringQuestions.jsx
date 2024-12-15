import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import FilterQuestionsByCategory from "../molecules/questionList/FilterQuestionsByCategory";

export default function FilteringQuestions({ control, setValue, handleFilterQuestions, register, handleSubmit, errors, isLoadingQuestions }) {

  return (
    <form
      onSubmit={handleSubmit(handleFilterQuestions)}
      className="relative h-full min-h-20"
    >
      <div className="mb-4">
        {/* Filter Options */}
        <FilterQuestionsByCategory control={control} setValue={setValue} />
      </div>

      <div className="relative mb-4">
        {/* Search Input */}
        <Input
          placeholder="Search questions..."
          {...register("keyword")}
          className="pr-10"
        />
        <button type="submit" className="absolute right-2 top-1/4">
          <Search size={18} className="opacity-70" />
        </button>
      </div>

      <div className="text-end">
        <Button type="submit" disabled={isLoadingQuestions}>
          Filtered
        </Button>
      </div>
    </form>
  );
}
