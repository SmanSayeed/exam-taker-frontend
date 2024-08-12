import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"
import { useState } from "react"
import QuestionCategorySelectItems from "../molecules/QuestionCategorySelectItems"

export default function QuestionCategorySelectBtn({ value }) {
    const [open, setOpen] = useState(false)

    return (
        <div
            onClick={() => setOpen(!open)}
            className="relative border border-white rounded-lg flex items-center gap-5 pr-3 bg-black cursor-pointer"
        >
            <Button>{value}</Button>
            <div
                className={`transition-transform duration-500 ${open ? 'rotate-180' : ''}`}
            >
                <ChevronUp size={20} className="text-white bg-black p-[.05rem] rounded-full" />
            </div>
            <div className="absolute top-0">
                {
                    open &&
                    <QuestionCategorySelectItems name={value} />
                }
            </div>
        </div>
    )
}