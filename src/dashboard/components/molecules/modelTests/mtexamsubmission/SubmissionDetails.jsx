import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { CreativeQuesForSubmissionView } from "./CreativeQuesForSubmissionView";
import { McqQuesForSubmissionView } from "./McqQuesForSubmissionView";
import { NormalQuesForSubmissionView } from "./NormalQuesForSubmissionView";

export const SubmissionDetails = ({ questions, studentAnswer, onReviewClick, submittedFile, questionType }) => {
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

                <div className="flex flex-col">
                    <h3 className="text-xl font-semibold">Questions & Answer Sheet</h3>
                    {
                        submittedFile?.file_url && submittedFile?.cdn_url && (
                            <Button
                                variant="outline"
                                onClick={() => handleViewPDF(submittedFile?.cdn_url)}
                                className="my-6"
                            >
                                <FileText className="w-4 h-4 mr-2" />
                                View Answer Sheet
                            </Button>
                        )
                    }

                    {/* mcq exam question */}
                    <div className="text-center">
                        {questionType === "mcq" &&
                            questions?.map((question, index) => (
                                <McqQuesForSubmissionView
                                    key={question?.id}
                                    queIndex={index}
                                    question={question}
                                />
                            ))}

                        {/* creative question exam question */}
                        {questionType === "creative" &&
                            questions.map((question, index) => (
                                <CreativeQuesForSubmissionView
                                    key={question?.id}
                                    queIndex={index}
                                    question={question}
                                />
                            ))}

                        {/* normal question exam question */}
                        {questionType === "normal" &&
                            questions.map((question, index) => (
                                <NormalQuesForSubmissionView
                                    key={question?.id}
                                    queIndex={index}
                                    question={question}
                                />
                            ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};