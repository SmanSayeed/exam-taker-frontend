import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { parseHtmlContent } from "@/utils/parseHtmlContent";

export const ExaminationDetails = ({ modelTest, examination }) => (
    <Card>
        <CardHeader>
            <CardTitle>Examination Details</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                    <p className="text-sm text-gray-500">Model Test</p>
                    <p className="font-medium">{parseHtmlContent(modelTest?.data?.title)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Examination</p>
                    <p className="font-medium">{parseHtmlContent(examination?.title)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium capitalize">{examination?.type}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Time Limit</p>
                    <p className="font-medium">{examination?.time_limit} minutes</p>
                </div>
            </div>
        </CardContent>
    </Card>
);