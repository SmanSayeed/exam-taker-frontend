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
import QuestionCreateForAdminPage from "@/dashboard/components/pages/questions/QuestionCreateForAdminPage";
import QuestionEditForAdminPage from "@/dashboard/components/pages/questions/QuestionEditForAdminPage";
import QuestionListForAdminPage from "@/dashboard/components/pages/questions/QuestionListForAdminPage";
import ExamSubTypeForQuestionPage from "@/dashboard/components/pages/questions/questioncategories/ExamSubTypeForQuestionPage";
import ExamTypeForQuestionPage from "@/dashboard/components/pages/questions/questioncategories/ExamTypeForQuestionPage";
import GroupForQuestionPage from "@/dashboard/components/pages/questions/questioncategories/GroupForQuestionPage";
import LessonForQuestionPage from "@/dashboard/components/pages/questions/questioncategories/LessonForQuestionPage";
import LevelForQuestionPage from "@/dashboard/components/pages/questions/questioncategories/LevelForQuestionPage";
import SectionForQuestionPage from '@/dashboard/components/pages/questions/questioncategories/SectionForQuestionPage';
import SubTopicsForQuestionPage from "@/dashboard/components/pages/questions/questioncategories/SubTopicsForQuestionPage";
import SubjectForQuestionPage from "@/dashboard/components/pages/questions/questioncategories/SubjectForQuestionPage";
import TopicsForQuestionPage from "@/dashboard/components/pages/questions/questioncategories/TopicsForQuestionPage";
import YearForQuestionPage from "@/dashboard/components/pages/questions/questioncategories/YearForQuestionPage";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";

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
                        element: <SectionForQuestionPage />
                    },
                    {
                        path: "/admin/questions/exam-type",
                        element: <ExamTypeForQuestionPage />
                    },
                    {
                        path: "/admin/questions/year",
                        element: <YearForQuestionPage />
                    },
                    {
                        path: "/admin/questions/group",
                        element: <GroupForQuestionPage />
                    },
                    {
                        path: "/admin/questions/exam-sub-type",
                        element: <ExamSubTypeForQuestionPage />
                    },
                    {
                        path: "/admin/questions/level",
                        element: <LevelForQuestionPage />
                    },
                    {
                        path: "/admin/questions/subject",
                        element: <SubjectForQuestionPage />
                    },
                    {
                        path: "/admin/questions/lesson",
                        element: <LessonForQuestionPage />
                    },
                    {
                        path: "/admin/questions/topics",
                        element: <TopicsForQuestionPage />
                    },
                    {
                        path: "/admin/questions/sub-topics",
                        element: <SubTopicsForQuestionPage />
                    },
                    {
                        path: "/admin/question/create",
                        element: <QuestionCreateForAdminPage />
                    },
                    {
                        path: "/admin/questions",
                        element: <QuestionListForAdminPage />
                    },
                    {
                        path: "/admin/question/edit/:id",
                        element: <QuestionEditForAdminPage />
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