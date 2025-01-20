import { Card } from "@/components/ui/card";
import { parseHtmlContent } from "@/utils/parseHtmlContent";

export function NormalQuesForSubmissionView({ queIndex, question }) {
    const { title } = question || {};

    return (
        <Card className="p-4 relative group shadow-md my-3 hover:shadow-lg duration-500">
            {/* Question Title */}
            <div className="mb-4 flex items-center gap-2">
                <p className="text-base font-medium">{queIndex + 1}. </p>
                <p className="text-base">{parseHtmlContent(title)}</p>
            </div>
        </Card>
    );
}
