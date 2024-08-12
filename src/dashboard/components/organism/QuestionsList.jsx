import { useGetQuestionsQuery } from "@/features/questions/questionApi";
import QuestionCard from "../molecules/QuestionCard";
import Loading from "../atoms/Loading";
import { Pagination } from "@/components/ui/pagination";
import PaginationSCN from "../molecules/PaginationSCN";


export default function QuestionsList({paginationData}) {

  // const { data, isError, isLoading, isSuccess } = useGetQuestionsQuery()
  // console.log(data?.data)

  // console.log("card data is: ", data?.data)
  // const questions = data?.data?.data
  // console.log("Que", data?.data?.data)

  return (
    <div className="space-y-3 mb-5 ">
      <div>
        {paginationData?.data?.data.map(data=><QuestionCard key={data.id} data={data} />)}
      </div>

      {/* <PaginationSCN data={questions}/> */}
    </div>
  )
}