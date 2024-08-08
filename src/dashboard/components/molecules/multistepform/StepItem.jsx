import { useMultiContext } from "@/providers/MultiStepContextProvider";

export function StepItem({ infos }) {
  const { step } = useMultiContext();
  const isFinished = step === 4 && infos.num === 3;

  return (
    <li className="flex items-center gap-4 capitalize">
      <span
        className={`flex size-8 items-center justify-center rounded-full border-2 font-medium ${step === infos.num || isFinished
          ? "border-indigo-300 bg-indigo-300"
          : ""
          }`}
      >
        {infos.num}
      </span>
      <div className="hidden flex-col lg:flex">
        <p className="text-sm">
          {infos.title}
        </p>
        <p>
          {infos.description}
        </p>
      </div>
    </li>
  )
}
