import { StepItem } from "./StepItem"

const stepData = [
  { num: 1, title: "Step 1", description: "Create Question" },
  { num: 2, title: "Step 2", description: "Add Question" },
  { num: 3, title: "Step 3", description: "Select Category" }
]

export function Steps() {
  return (
    <header className="flex items-start justify-center bg-cover bg-no-repeat p-6 lg:rounded-md lg:bg-cover lg:bg-center lg:pt-10">
      <ul className="flex gap-4 lg:gap-12">
        {stepData.map((info, index) => <StepItem key={index} infos={info} />)}
      </ul>
    </header>
  )
}
