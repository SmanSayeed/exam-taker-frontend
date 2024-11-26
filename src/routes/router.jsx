import ErrorPage from "@/Error";
import NotFound from "@/NotFound";
import DashboardPage from "@/dashboard/components/pages/DashboardPage";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";

import AdminLoginPage from "@/components/pages/AdminLoginPage";
import StudentCreateForAdminPage from "@/dashboard/components/pages/StudentCreateForAdminPage";
import StudentListForAdminPage from "@/dashboard/components/pages/StudentListForAdminPage";
import UserCreateForAdminPage from "@/dashboard/components/pages/UserCreateForAdminPage";
import UserListForAdminPage from "@/dashboard/components/pages/UserListForAdminPage";

import ModelTestCreatePage from "@/dashboard/components/pages/modelTests/ModelTestCreatePage";
import ModelTestsPage from "@/dashboard/components/pages/modelTests/ModelTestsPage";
import AllPackagesForAdminPage from "@/dashboard/components/pages/packages/AllPackagesForAdminPage";
import PackageManagementForAdminPage from "@/dashboard/components/pages/packages/PackageCreateForAdminPage";
import PackageEditForAdminPage from "@/dashboard/components/pages/packages/PackageEditForAdminPage";
import QuestionCreateForAdminPage from "@/dashboard/components/pages/questions/QuestionCreateForAdminPage";
import QuestionEditForAdminPage from "@/dashboard/components/pages/questions/QuestionEditForAdminPage";
import QuestionListForAdminPage from "@/dashboard/components/pages/questions/QuestionListForAdminPage";

import ExamSubTypePage from "@/dashboard/components/pages/questioncategories/ExamSubTypePage";
import ExamTypePage from "@/dashboard/components/pages/questioncategories/ExamTypePage";
import GroupPage from "@/dashboard/components/pages/questioncategories/GroupPage";
import LessonPage from "@/dashboard/components/pages/questioncategories/LessonPage";
import LevelPage from "@/dashboard/components/pages/questioncategories/LevelPage";
import SectionPage from "@/dashboard/components/pages/questioncategories/SectionPage";
import SubTopicsPage from "@/dashboard/components/pages/questioncategories/SubTopicsPage";
import SubjectPage from "@/dashboard/components/pages/questioncategories/SubjectPage";
import TagsPage from "@/dashboard/components/pages/questioncategories/TagsPage";
import TopicsPage from "@/dashboard/components/pages/questioncategories/TopicsPage";
import YearPage from "@/dashboard/components/pages/questioncategories/YearPage";

const router = createBrowserRouter([
    {
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <AdminLoginPage />
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
                        path: "/admin/category/section",
                        element: <SectionPage />
                    },
                    {
                        path: "/admin/category/exam-type",
                        element: <ExamTypePage />
                    },
                    {
                        path: "/admin/category/year",
                        element: <YearPage />
                    },
                    {
                        path: "/admin/category/group",
                        element: <GroupPage />
                    },
                    {
                        path: "/admin/category/exam-sub-type",
                        element: <ExamSubTypePage />
                    },
                    {
                        path: "/admin/category/level",
                        element: <LevelPage />
                    },
                    {
                        path: "/admin/category/subject",
                        element: <SubjectPage />
                    },
                    {
                        path: "/admin/category/lesson",
                        element: <LessonPage />
                    },
                    {
                        path: "/admin/category/topics",
                        element: <TopicsPage />
                    },
                    {
                        path: "/admin/category/sub-topics",
                        element: <SubTopicsPage />
                    },
                    {
                        path: "/admin/category/tags",
                        element: <TagsPage />
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
                        path: "/admin/question/edit/:questionId",
                        element: <QuestionEditForAdminPage />
                    },
                    {
                        path: "/admin/package/create",
                        element: <PackageManagementForAdminPage />
                    },
                    {
                        path: "/admin/package/edit/:packageId",
                        element: <PackageEditForAdminPage />
                    },
                    {
                        path: "/admin/packages",
                        element: <AllPackagesForAdminPage />
                    },
                    {
                        path: "/admin/model-tests/create",
                        element: <ModelTestCreatePage />
                    },
                    {
                        path: "/admin/model-tests",
                        element: <ModelTestsPage />
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