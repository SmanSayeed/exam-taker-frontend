import React, { useState } from 'react';
import { useGetStudentsQuery, useDeleteStudentMutation, useChangeStudentStatusMutation } from "@/features/studentsApi/studentsApi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";// Import toast notification

const StudentTable = ({ openModal }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: studentsData, isLoading, refetch } = useGetStudentsQuery(currentPage); // Include refetch
  const [deleteStudent] = useDeleteStudentMutation();
  const [changeStatus] = useChangeStudentStatusMutation();

  const handleDelete = async (id) => {
    try {
      const response = await deleteStudent(id).unwrap(); // Using unwrap to access response directly
      if (response.status === "success") {
        toast.success(response.message); // Show toast
        refetch(); // Refetch the data to update the list
      }
    } catch (error) {
      toast.error(error.message); // Error handling
    }
  };

  const handleStatusChange = async (student) => {
    await changeStatus({ id: student.id, status: student.active_status ? 0 : 1 });
    refetch(); // Refetch after status change
  };

  // Calculate pagination
  const totalPages = studentsData?.meta?.last_page || 1;

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg bg-white dark:bg-gray-800">
      {isLoading ? (
        <div className="flex justify-center py-4">Loading...</div>
      ) : (
        <>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
              {studentsData?.data?.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{student.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{student.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                    {student.active_status ? "Active" : "Inactive"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                    <div className="flex space-x-2">
                      <Button onClick={() => openModal(student)}>Edit</Button>
                      <Button onClick={() => handleDelete(student.id)}>Delete</Button>
                      <Button onClick={() => handleStatusChange(student)}>
                        {student.active_status ? "Deactivate" : "Activate"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentTable;
