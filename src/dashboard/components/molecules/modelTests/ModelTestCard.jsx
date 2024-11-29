import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { parseHtmlContent } from "@/utils/parseHtmlContent";
import { ModeltestCardActions } from "./ModeltestCardActions";

const ModelTestCard = ({ modelTest }) => {

    return (
        <Card className="py-4 relative group shadow-md hover:shadow-lg duration-500">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">
                    {parseHtmlContent(modelTest?.title)}
                </CardTitle>
                <CardDescription>
                    {parseHtmlContent(modelTest?.description)}
                </CardDescription>
            </CardHeader>

            <ModeltestCardActions />
        </Card>
    )
}

export default ModelTestCard;