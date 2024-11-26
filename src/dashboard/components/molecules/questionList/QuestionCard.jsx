import { Card, CardTitle } from "@/components/ui/card";
import { parseHtmlContent } from "@/utils/parseHtmlContent";

import { QueCardActions } from "./QueCardActions";

export default function QuestionCard({ data: questionData, refetch }) {
    const { id, title, mcq_questions } = questionData || {};

    return (
        <Card className="py-4 pl-4 pr-8 relative group shadow-md my-3 hover:shadow-lg duration-500">
            <span className="text-xs font-semibold absolute top-0 left-0 px-2 py-0 rounded-br bg-gray-400 text-primary-foreground">
                #{id}
            </span>
            <CardTitle>
                <p className="my-4 text-lg dark:text-white">
                    {parseHtmlContent(title)}
                </p>
            </CardTitle>

            <div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {mcq_questions?.map((option, index) => (
                        <li key={option.id} className="flex items-center gap-3 border rounded-sm p-2">
                            <p className="h-8 w-8 flex items-center justify-center border rounded-full">
                                {index + 1}
                            </p>
                            <p>{parseHtmlContent(option.mcq_question_text)}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <QueCardActions
                refetch={refetch}
                questionData={questionData}
            />
        </Card>
    );
}

