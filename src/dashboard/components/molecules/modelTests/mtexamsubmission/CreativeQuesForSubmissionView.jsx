import { Card } from "@/components/ui/card";
import DOMPurify from "dompurify";

const parseHtmlContent = (htmlContent) => {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(htmlContent),
            }}
        />
    );
};

export function CreativeQuesForSubmissionView({ queIndex, question }) {
    const { title, creative_parts } = question || {};

    return (
        <Card className="p-4 relative group shadow-md my-3 hover:shadow-lg duration-500">
            {/* Question Title */}
            <div className="mb-4 flex items-center justify-between gap-2">
                <div className="flex gap-2">
                    <p className="text-base">{queIndex + 1}. </p>
                    <p className="text-left text-base">{parseHtmlContent(title)}</p>
                </div>
            </div>

            {/* Creative Parts */}
            <div className="grid grid-cols-1 gap-2">
                {creative_parts?.map((option) => (
                    <div
                        key={option?.id}
                        className="flex items-center justify-start gap-y-2 p-2"
                    >
                        <div className="flex p-2 gap-2">
                            <p className="border rounded-full h-6 w-6 p-2 flex items-center justify-center text-sm">
                                {option?.creative_question_type}
                            </p>
                            <h1 className="text-sm">
                                {parseHtmlContent(option?.creative_question_text)}
                            </h1>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
