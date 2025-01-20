import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export const SubmissionDetails = ({ questions, studentAnswer, onReviewClick, submittedFile }) => {
    const handleViewPDF = (url) => window.open(url, "_blank");

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Submission Details</CardTitle>
                <Button onClick={onReviewClick}>Update Review</Button>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg mb-6">
                    <div>
                        <p>Total Questions</p>
                        <p className="font-medium">{questions?.length}</p>
                    </div>
                    <div>
                        <p>Total Marks</p>
                        <p className="font-medium">{studentAnswer?.total_marks || "0"}</p>
                    </div>
                    <div>
                        <p>Start Time</p>
                        <p className="font-medium">{studentAnswer?.exam_start_time}</p>
                    </div>
                    <div>
                        <p>Submission Time</p>
                        <p className="font-medium">{studentAnswer?.submission_time}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Questions & Answer Sheet</h3>
                    {
                        submittedFile?.file_url && submittedFile?.cdn_url && (
                            <Button
                                variant="outline"
                                onClick={() => handleViewPDF(submittedFile?.cdn_url)}
                            >
                                <FileText className="w-4 h-4 mr-2" />
                                View Answer Sheet
                            </Button>
                        )
                    }
                </div>
            </CardContent>
        </Card>
    );
};