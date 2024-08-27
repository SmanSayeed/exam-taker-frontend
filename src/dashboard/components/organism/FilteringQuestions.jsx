import FilterQuestionsBySearch from "../atoms/FilterQuestionsBySearch";
import FilterQuestionsByCategory from "../molecules/FilterQuestionsByCategory";

export default function FilteringQuestions() {
  return (
    <div className="relativ h-full min-h-20 ">
      <div>
        <FilterQuestionsByCategory />
      </div>

      <div className="refresh-and-search w-full ">
        <FilterQuestionsBySearch />
      </div>
    </div>
  )
}