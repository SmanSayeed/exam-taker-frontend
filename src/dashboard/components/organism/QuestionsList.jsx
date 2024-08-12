import QuestionCard from "../molecules/QuestionCard";

export default function QuestionsList({ paginationData }) {

  // const { data, isError, isLoading, isSuccess } = useGetQuestionsQuery()
  // console.log(data?.data)

  // console.log("card data is: ", data?.data)
  // const questions = data?.data?.data
  // console.log("Que", data?.data?.data)

  return (
    <div className="space-y-3 mb-5 ">
      <div>
        {paginationData?.data?.data.map(data => <QuestionCard key={data.id} data={data} />)}
      </div>

      {/* <PaginationSCN data={questions}/> */}
    </div>
  )
}