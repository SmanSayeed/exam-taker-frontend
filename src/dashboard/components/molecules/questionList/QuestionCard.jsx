import { Card } from "@/components/ui/card";
import { parseHtmlContent } from "@/utils/parseHtmlContent";

import { CircleCheck } from "lucide-react";
import { QueCardActions } from "./QueCardActions";
import TagsTitle from "./TagsTitle";

export default function QuestionCard({ data: questionData, refetch }) {
    const { id, title, mcq_questions,creative_questions, tags, images } = questionData || {};

    const tagIds = tags ? tags.split(",").map(tagId => parseInt(tagId, 10)) : [];

    return (
        <Card className="py-4 pl-4 pr-8 relative group shadow-md my-3 hover:shadow-lg duration-500">
            <span className="text-xs font-semibold absolute top-0 left-0 px-2 py-0 rounded-br bg-gray-400 text-primary-foreground">
                #{id}
            </span>

            {/* display question title and tagsname */}
            <div className="mb-4">
                <p className="my-4 text-lg dark:text-white">
                    {parseHtmlContent(title)}
                </p>

                <div className="flex flex-wrap gap-2 justify-end">
                    {tagIds.map((tagId) => (
                        <TagsTitle
                            key={tagId}
                            tagId={tagId}
                        />
                    ))}
                </div>
            </div>

            {/* Render the image if available */}
            {images && (
                <div className="my-4">
                    <img
                        src={images}
                        alt={`Image for question ${id}`}
                        className="rounded-md shadow-md max-w-full"
                    />
                </div>
            )}

            <div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {mcq_questions?.map((option, index) => (
                        <li key={option.id} className="flex items-center gap-3 border rounded-sm p-2">
                            {
                                option?.is_correct ? (
                                    <CircleCheck className="text-green-600" />
                                ) : (
                                    <p className="h-8 w-8 flex items-center justify-center border rounded-full">
                                        {index + 1}
                                    </p>
                                )
                            }
                            <p>{parseHtmlContent(option.mcq_question_text)}</p>
                        </li>
                    ))}
                     {creative_questions?.map((option, index) => (
                        <li key={option.id} className="flex items-center gap-3 border rounded-sm p-2">
                            <p>{parseHtmlContent(option.creative_question_text)}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <QueCardActions
                refetch={refetch}
                questionData={questionData}
                tagIds={tagIds}
            />
        </Card>
    );
}

