import FilterQuestionsBySearch from "../atoms/FilterQuestionsBySearch";
import FilterQuestionsByCategory from "../molecules/FilterQuestionsByCategory";

export default function FilteringQuestions() {
  return (
      <div className="relative h-full">
          <div>
              <FilterQuestionsByCategory/>
          </div>
          
          <div className="refresh-and-search w-full absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <FilterQuestionsBySearch />
      </div> 
    </div>
  )
}