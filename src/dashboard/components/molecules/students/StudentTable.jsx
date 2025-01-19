import React, { useState } from 'react';
import { useGetStudentsQuery, useDeleteStudentMutation, useChangeStudentStatusMutation } from "@/features/studentsApi/studentsApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const StudentTable = ({ openModal }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const { 
    data: studentsData, 
    isLoading, 
    isFetching 
  } = useGetStudentsQuery(currentPage);
  
  const [deleteStudent, { isLoading: isDeleting }] = useDeleteStudentMutation();
  const [changeStatus, { isLoading: isChangingStatus }] = useChangeStudentStatusMutation();

  const handleDelete = async (id) => {
    try {
      const response = await deleteStudent(id).unwrap();
      if (response.status === "success") {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(error.data?.message || 'Error deleting student');
    }
  };

  const handleStatusChange = async (student) => {
    try {
      const response = await changeStatus({ 
        id: student.id, 
        status: student.active_status ? 0 : 1 
      }).unwrap();
      if (response.status === "success") {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(error.data?.message || 'Error changing status');
    }
  };

  const students = studentsData?.data?.data || [];
  const pagination = studentsData?.data?.pagination;

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.includes(searchTerm);
    
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'active' && student.active_status) ||
      (statusFilter === 'inactive' && !student.active_status);
    
    return matchesSearch && matchesStatus;
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchTerm('');
    setStatusFilter('all');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Students</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-popover divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{student.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{student.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      student.active_status 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                        : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                    }`}>
                      {student.active_status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => openModal(student)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDelete(student.id)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          'Delete'
                        )}
                      </Button>
                      <Button 
                        variant={student.active_status ? "secondary" : "default"}
                        size="sm"
                        onClick={() => handleStatusChange(student)}
                        disabled={isChangingStatus}
                      >
                        {isChangingStatus ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          student.active_status ? "Deactivate" : "Activate"
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Showing page {pagination?.current_page} of {pagination?.total_pages} ({pagination?.total_data} total)
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={isFetching || !pagination?.prev_page || currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: pagination?.total_pages || 0 }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    disabled={isFetching}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button 
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={isFetching || currentPage === pagination?.total_pages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTable;