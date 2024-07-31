import ErrorPage from "@/Error";
import NotFound from "@/NotFound";

import AdminLoginPage from "@/components/pages/AdminLoginPage";
import HomePage from "@/components/pages/HomePage";
import StudentLoginPage from "@/components/pages/StudentLoginPage";
import StudentRegisterPage from "@/components/pages/StudentRegisterPage";
import DashboardPage from "@/dashboard/components/pages/DashboardPage";

import StudentCreateForAdminPage from "@/dashboard/components/pages/StudentCreateForAdminPage";
import StudentListForAdminPage from "@/dashboard/components/pages/StudentListForAdminPage";
import UserCreateForAdminPage from "@/dashboard/components/pages/UserCreateForAdminPage";
import UserListForAdminPage from "@/dashboard/components/pages/UserListForAdminPage";

import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import QuestionListForAdminPage from "@/dashboard/components/pages/QuestionListForAdminPage";
import QuestionCreateForAdminPage from "@/dashboard/components/pages/QuestionCreateForAdminPage";
import ExamTypeCreateForAdmin from "@/dashboard/components/pages/ExamTypeCreateForAdmin";
import SectionForAdminPage from "@/dashboard/components/pages/questions/SectionForAdminPage";
import SubSectionForAdminPage from "@/dashboard/components/pages/questions/SubSectionForAdminPage";
import YearForAdminPage from "@/dashboard/components/pages/questions/YearForAdminPage";
import GroupForAdminPage from "@/dashboard/components/pages/questions/GroupForAdminPage";

const router = createBrowserRouter([
    {
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/login/student",
                element: <StudentLoginPage />
            },
            {
                path: "/login/admin",
                element: <AdminLoginPage />
            },
            {
                path: "/register",
                element: <StudentRegisterPage />
            },
            {
                element: <PrivateRoutes />,
                children: [
                    {
                        path: "/admin",
                        element: <DashboardPage />
                    },
                    {
                        path: "/admin/users",
                        element: <UserListForAdminPage />
                    },
                    {
                        path: "/admin/user/create",
                        element: <UserCreateForAdminPage />
                    },
                    {
                        path: "/admin/students",
                        element: <StudentListForAdminPage />
                    },
                    {
                        path: "/admin/student/create",
                        element: <StudentCreateForAdminPage />
                    },
                    {
                        path: "/admin/questions/section",
                        element: <SectionForAdminPage />
                    },
                    {
                        path: "/admin/questions/sub-section",
                        element: <SubSectionForAdminPage />
                    },
                    {
                        path: "/admin/questions/year",
                        element: <YearForAdminPage />
                    },
                    {
                        path: "/admin/questions/group",
                        element: <GroupForAdminPage />
                    },
                    {
                        path: "/admin/question/create",
                        element: <QuestionCreateForAdminPage />
                    },
                    {
                        path: "/admin/exam/type",
                        element: <ExamTypeCreateForAdmin />
                    },
                ]
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />
    },
]);

export default router;