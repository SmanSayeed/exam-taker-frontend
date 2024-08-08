import { useMultiContext } from "@/providers/MultiStepContextProvider";

const titleData = {
  title: [
    'Basic info',
    'Add your qustion',
    'Select Category'
  ],
  description: [
    'Please provide your question title, description, type, marks ....',
    'Add question title and option and answer.',
    'Select Category.'
  ],
}
export function DisplayTitle() {
  const { step } = useMultiContext();

  return (
    <div
    >
      <h1 className={`text-xl font-bold lg:text-2xl`}>
        {titleData.title[step - 1]}
      </h1>
      <p className="text-gray-400 lg:text-lg">
        {titleData.description[step - 1]}
      </p>
    </div>
  )
}
