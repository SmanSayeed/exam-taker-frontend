import QuestionCard from "../molecules/QuestionCard";

export default function QuestionsList({ paginationData }) {

  return (
    <div className="space-y-3 mb-5 ">
      <div className="bg-red-500">
        {paginationData?.data?.data.map(data => <QuestionCard key={data.id} data={data} />)}
      </div>
    </div>
  )
}