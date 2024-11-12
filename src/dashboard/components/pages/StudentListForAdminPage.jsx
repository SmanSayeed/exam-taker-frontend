import React, { useState } from "react";
import { Layout } from "../templates/Layout";
import Search from "../atoms/Search";
import ThemeSwitch from "../atoms/ThemeSwitch";
import UserNav from "../organism/UserNav";
import StudentEditModal from "../molecules/students/StudentEditModal";
import StudentTable from "../molecules/students/StudentTable"; // Import the new StudentTable component

const StudentListForAdminPage = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <Layout.Header sticky>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">Here's a list of students!</p>
          </div>
        </div>

        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <StudentTable openModal={openModal} /> {/* Pass the openModal function to StudentTable */}
        </div>
      </Layout.Body>

      {selectedStudent && (
        <StudentEditModal isOpen={isModalOpen} onClose={closeModal} student={selectedStudent} />
      )}
    </Layout>
  );
};

export default StudentListForAdminPage;
