import DOMPurify from "dompurify";
import { CircleCheck } from "lucide-react";
import TagsTitle from "./TagsTitle";

const parseHtmlContent = (htmlContent) => {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(htmlContent),
            }}
        />
    );
};

const QuestionView = ({ data, tagIds }) => {
    const { id, title, is_paid, is_featured, type, mark, mcq_questions } = data || {};

    return (
        <>
            <div className="mb-4">
                <p className="my-4 text-lg dark:text-white">
                    {parseHtmlContent(title)}
                </p>

                {/* Display Tag Names */}
                <div className="flex flex-wrap gap-2 justify-end">
                    {tagIds.map((tagId) => (
                        <TagsTitle
                            key={tagId}
                            tagId={tagId}
                        />
                    ))}
                </div>
            </div>

            <div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
                    {
                        mcq_questions?.map((option, index) => <li key={option.id} className="flex items-center gap-3 border rounded-sm p-2 " >
                            {/* <p className="h-8 w-8 flex items-center justify-center border rounded-full" >{index + 1}</p> */}
                            {
                                option?.is_correct ? (
                                    <CircleCheck className="text-green-600" />
                                ) : (
                                    <p className="h-8 w-8 flex items-center justify-center border rounded-full">
                                        {index + 1}
                                    </p>
                                )
                            }
                            <p>
                                {parseHtmlContent(option.mcq_question_text)}
                            </p>
                        </li>)
                    }
                </ul>
            </div>

            <div className="text-xs flex items-center gap-3 pt-4 ">
                <p>Que ID: {id}</p>
                <p className="border-l border-gray-400 pl-2">{is_paid === 0 ? "Not paid" : "paid"}</p>
                <p className="border-l border-gray-400  pl-2">{mark} Marks </p>
                <p className="border-l border-gray-400  pl-2">{is_featured === 0 ? "Not featured" : "featured"}</p>
                <p className="border-l border-gray-400  pl-2 capitalize"> <span className={`${type === "mcq" ? "uppercase" : "capitalize"}`} > {type}  </span>question</p>
            </div>
        </>
    )
}

export default QuestionView;