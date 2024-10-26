import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { parseHtmlContent } from "@/utils/parseHtmlContent";

const ModelTestCard = ({ modelTest }) => {

    return (
        <Card className="container">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">
                    {parseHtmlContent(modelTest?.title)}
                </CardTitle>
                <CardDescription>
                    {parseHtmlContent(modelTest?.description)}
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-10">

            </CardContent>
        </Card>
    )
}

export default ModelTestCard;