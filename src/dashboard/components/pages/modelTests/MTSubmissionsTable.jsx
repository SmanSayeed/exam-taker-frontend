import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useGetMTSubmissionsQuery, useGetSingleModelTestQuery } from "@/features/modelTests/modelTestApi";

const MTSubmissionsTable = () => {
  const { modelTestId, examId } = useParams();
  const navigate = useNavigate();

  // Fetch model test details and submissions
  const { data: modelTest } = useGetSingleModelTestQuery(modelTestId);
  const { data: submissionsData, isLoading } = useGetMTSubmissionsQuery({
    modelTestId,
    examId,
  });

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const examination = submissionsData?.data?.examination;
  const submissions = submissionsData?.data?.answers || [];

  return (
    <div className="container mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {modelTest?.data?.title}
          </CardTitle>
          <p className="text-gray-600">
            Examination: {examination?.title}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Questions</p>
              <p className="font-medium">{examination?.total_questions}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Time Limit</p>
              <p className="font-medium">{examination?.time_limit} minutes</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Submissions</p>
              <p className="font-medium">{examination?.total_submissions}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Exam Type</p>
              <p className="font-medium capitalize">{examination?.type}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sl</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Total Marks</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission, index) => (
                <TableRow key={submission.answer_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    {submission.student.name}
                  </TableCell>
                  <TableCell>{submission.student.email}</TableCell>
                  <TableCell>{submission.submission_details.total_marks}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/model-tests/${modelTestId}/exams/${examId}/submissions/${submission.answer_id}`)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Exam
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MTSubmissionsTable;