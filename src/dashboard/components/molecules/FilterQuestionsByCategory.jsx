import QuestionCategorySelectBtn from "../atoms/QuestionCategorySelectBtn";

export default function FilterQuestionsByCategory() {
    return (
        <div className="space-y-2">
            <div id="category" className=" flex items-center gap-2">
                <QuestionCategorySelectBtn value={"Section"} />
                <QuestionCategorySelectBtn value={"Admission Exam"} />
            </div>
            <div id="sub-category" className="sub-category absolute right-0 flex items-center flex-wrap gap-2 ">
                <QuestionCategorySelectBtn value={"Subject"} />
                <QuestionCategorySelectBtn value={"Chapter"} />
                <QuestionCategorySelectBtn value={"Unit"} />
            </div>
        </div>
    )
}