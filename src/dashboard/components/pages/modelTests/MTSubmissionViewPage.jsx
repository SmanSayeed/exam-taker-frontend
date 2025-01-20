import { Button } from "@/components/ui/button";
import { useGetSingleModelTestQuery, useGetSingleSubmissionQuery, useUpdateSubmissionReviewMutation } from "@/features/modelTests/modelTestApi";
import { useGetSingleStudentQuery } from "@/features/studentsApi/studentsApi";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ExaminationDetails } from "../../molecules/modelTests/mtexamsubmission/ExaminationDetails";
import { ReviewModal } from "../../molecules/modelTests/mtexamsubmission/ReviewModal";
import { StudentDetails } from "../../molecules/modelTests/mtexamsubmission/StudentDetails";
import { SubmissionDetails } from "../../molecules/modelTests/mtexamsubmission/SubmissionDetails";

const MTSubmissionViewPage = () => {
  const { modelTestId, examId, studentId } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { data: modelTest } = useGetSingleModelTestQuery(modelTestId);
  const { data: studentData } = useGetSingleStudentQuery(studentId);
  const { data: submissionData, isLoading } = useGetSingleSubmissionQuery({ modelTestId, examId, studentId });
  const [updateReview] = useUpdateSubmissionReviewMutation();

  const handleReviewSubmit = async (formData) => {
    try {
      await updateReview({ modelTestId, examId, studentId, data: formData }).unwrap();
      toast.success("Review updated successfully");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update review");
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const examination = submissionData?.data?.examination;
  const questions = submissionData?.data?.questions || [];
  const studentAnswer = submissionData?.data?.submission_details;
  const submittedFile = submissionData?.data?.submitted_file;

  return (
    <div className="h-[90vh] overflow-hidden">
      <div className="h-full overflow-y-auto px-6">
        <div className="container mx-auto py-6 max-w-7xl">
          <Button variant="outline" className="mb-6" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            Back to Submissions
          </Button>
          <div className="grid gap-6">
            {/* examination details */}
            <ExaminationDetails
              modelTest={modelTest}
              examination={examination}
            />

            {/* student details */}
            <StudentDetails
              studentData={studentData}
            />

            {/* submission details */}
            <SubmissionDetails
              questions={questions}
              studentAnswer={studentAnswer}
              onReviewClick={() => setIsModalOpen(true)}
              submittedFile={submittedFile}
              questionType={examination?.type}
            />
          </div>
        </div>
      </div>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReviewSubmit}
        initialData={{ total_marks: studentAnswer?.total_marks, comments: studentAnswer?.comments }}
      />
    </div>
  );
};

export default MTSubmissionViewPage;
