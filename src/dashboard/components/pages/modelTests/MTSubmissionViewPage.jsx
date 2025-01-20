import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useGetSingleModelTestQuery,
  useGetSingleSubmissionQuery,
  useUpdateSubmissionReviewMutation
} from "@/features/modelTests/modelTestApi";
import { useGetSingleStudentQuery } from '@/features/studentsApi/studentsApi';
import { parseHtmlContent } from "@/utils/parseHtmlContent";
import { ArrowLeft, FileText } from "lucide-react";
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "sonner";
import ReviewModal from './ReviewModal';

const MTSubmissionViewPage = () => {
  const { modelTestId, examId, studentId } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Fetch required data
  const { data: modelTest } = useGetSingleModelTestQuery(modelTestId);
  const { data: studentData } = useGetSingleStudentQuery(studentId);
  const { data: submissionData, isLoading } = useGetSingleSubmissionQuery({
    modelTestId,
    examId,
    studentId
  });

  const [updateReview] = useUpdateSubmissionReviewMutation();

  const handleReviewSubmit = async (formData) => {
    try {
      await updateReview({
        modelTestId,
        examId,
        studentId,
        data: formData
      }).unwrap();
      toast.success('Review updated successfully');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating review:', error);
      toast.error('Failed to update review');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const examination = submissionData?.data?.examination;
  const submissionDetails = submissionData?.data?.submission_details;
  const questions = submissionData?.data?.questions || [];

  // Find the relevant answer from the examination answers array
  const studentAnswer = examination?.answers?.find(a => a.student_id === parseInt(studentId));
  const pdfUrl = studentAnswer?.creative_answers?.file_url;

  const handleViewPDF = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="h-[90vh] overflow-hidden">
      <div className="h-full overflow-y-auto px-6">
        <div className="container mx-auto py-6 max-w-7xl">
          <Button
            variant="outline"
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Submissions
          </Button>

          <div className="grid gap-6">
            {/* Model Test & Exam Details */}
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

            {/* Student Details */}
            <Card>
              <CardHeader>
                <CardTitle>Student Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{studentData?.data?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{studentData?.data?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{studentData?.data?.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submission Details */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Submission Details</CardTitle>
                <Button onClick={() => setIsModalOpen(true)}>
                  Update Review
                </Button>
              </CardHeader>
              <CardContent>
                {/* Results Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg mb-6">
                  <div>
                    <p className="">Total Questions</p>
                    <p className="font-medium">{questions?.length}</p>
                  </div>
                  <div>
                    <p className="">Total Marks</p>
                    <p className="font-medium">{studentAnswer?.total_marks || '0'}</p>
                  </div>
                  <div>
                    <p className="">Start Time</p>
                    <p className="font-medium">{studentAnswer?.exam_start_time}</p>
                  </div>
                  <div>
                    <p className="">Submission Time</p>
                    <p className="font-medium">{studentAnswer?.submission_time}</p>
                  </div>
                </div>

                {/* Questions and Answers */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Questions & Answer Sheet</h3>
                    {pdfUrl && (
                      <Button
                        variant="outline"
                        onClick={() => handleViewPDF(pdfUrl)}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        View Answer Sheet
                      </Button>
                    )}
                  </div>

                  {/* Questions List */}
                  <div className="space-y-4">
                    {questions.map((question, index) => (
                      <div key={question.id} className="border rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <span className="text-gray-600 min-w-[24px]">Q{index + 1}.</span>
                          <div className="flex-1">
                            <p className="font-medium mb-2">{question?.title || 'No question description'}</p>
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>Marks: {question.mark}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Review Comments */}
                  {studentAnswer?.comments && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium mb-1">Review Comments:</p>
                      <p className="text-gray-600">{studentAnswer.comments}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReviewSubmit}
        initialData={{
          total_marks: studentAnswer?.total_marks,
          comments: studentAnswer?.comments
        }}
      />
    </div>
  );
};

export default MTSubmissionViewPage;