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
import QuestionCreateForAdminPage from "@/dashboard/components/pages/questions/QuestionCreateForAdminPage";
import QuestionListForAdminPage from "@/dashboard/components/pages/questions/QuestionListForAdminPage";

import PdfCreatePage from "@/dashboard/components/pages/PDF/PdfCreatePage";
import PdfEditPage from "@/dashboard/components/pages/PDF/PdfEditPage";
import PdfIndexPage from "@/dashboard/components/pages/PDF/PdfIdexPage";

// category management
import AdditionalPkgCatsPage from "@/dashboard/components/pages/categories/AdditionalPkgCatsPage";
import ExamSubTypePage from "@/dashboard/components/pages/categories/ExamSubTypePage";
import ExamTypePage from "@/dashboard/components/pages/categories/ExamTypePage";
import GroupPage from "@/dashboard/components/pages/categories/GroupPage";
import LessonPage from "@/dashboard/components/pages/categories/LessonPage";
import LevelPage from "@/dashboard/components/pages/categories/LevelPage";
import SectionPage from "@/dashboard/components/pages/categories/SectionPage";
import SubTopicsPage from "@/dashboard/components/pages/categories/SubTopicsPage";
import SubjectPage from "@/dashboard/components/pages/categories/SubjectPage";
import TagsPage from "@/dashboard/components/pages/categories/TagsPage";
import TopicsPage from "@/dashboard/components/pages/categories/TopicsPage";
import YearPage from "@/dashboard/components/pages/categories/YearPage";

import CreateExamForModelTestPage from "@/dashboard/components/pages/modelTests/CreateExamForModelTestPage";
import MTEditPage from "@/dashboard/components/pages/modelTests/MTEditPage";
import MTExamListPage from "@/dashboard/components/pages/modelTests/MTExamListPage";
import MTUnderPkgPage from "@/dashboard/components/pages/packages/MTUnderPkgPage";
import PackageCreatePage from "@/dashboard/components/pages/packages/PackageCreatePage";
import PackageEditPage from "@/dashboard/components/pages/packages/PackageEditPage";
import PackagesPage from "@/dashboard/components/pages/packages/PackagesPage";
import QuestionEditPage from "@/dashboard/components/pages/questions/QuestionEditPage";
import PaymentListPage from "@/dashboard/components/pages/subscriptions/PaymentListPage";
import QuotaSubscriptionsPage from "@/dashboard/components/pages/subscriptions/QuotaSubscriptionsPage";
import MTSubmissionsTable from "@/dashboard/components/pages/modelTests/MTSubmissionsTable";
import MTSubmissionView from "@/dashboard/components/pages/modelTests/MTSubmissionView";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <AdminLoginPage />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "/admin",
            element: <DashboardPage />,
          },
          {
            path: "/admin/users",
            element: <UserListForAdminPage />,
          },
          {
            path: "/admin/user/create",
            element: <UserCreateForAdminPage />,
          },
          {
            path: "/admin/students",
            element: <StudentListForAdminPage />,
          },
          {
            path: "/admin/student/create",
            element: <StudentCreateForAdminPage />,
          },
          // category management
          {
            path: "/admin/category/section",
            element: <SectionPage />,
          },
          {
            path: "/admin/category/exam-type",
            element: <ExamTypePage />,
          },
          {
            path: "/admin/category/exam-sub-type",
            element: <ExamSubTypePage />,
          },
          {
            path: "/admin/category/group",
            element: <GroupPage />,
          },
          {
            path: "/admin/category/level",
            element: <LevelPage />,
          },
          {
            path: "/admin/category/subject",
            element: <SubjectPage />,
          },
          {
            path: "/admin/category/lesson",
            element: <LessonPage />,
          },
          {
            path: "/admin/category/topics",
            element: <TopicsPage />,
          },
          {
            path: "/admin/category/sub-topics",
            element: <SubTopicsPage />,
          },
          {
            path: "/admin/category/year",
            element: <YearPage />,
          },
          {
            path: "/admin/category/tags",
            element: <TagsPage />,
          },
          {
            path: "/admin/category/additional-package-categories",
            element: <AdditionalPkgCatsPage />,
          },
          // question management
          {
            path: "/admin/question/create",
            element: <QuestionCreateForAdminPage />,
          },
          {
            path: "/admin/questions",
            element: <QuestionListForAdminPage />,
          },
          {
            path: "/admin/question/edit/:questionId",
            element: <QuestionEditPage />,
          },
          // package management
          {
            path: "/admin/package/create",
            element: <PackageCreatePage />,
          },
          {
            path: "/admin/package/edit/:packageId",
            element: <PackageEditPage />,
          },
          {
            path: "/admin/packages",
            element: <PackagesPage />,
          },
          {
            path: "/admin/package/:packageId/model-tests",
            element: <MTUnderPkgPage />,
          },
          // modeltest management
          {
            path: "/admin/model-tests/create",
            element: <ModelTestCreatePage />,
          },
          {
            path: "/admin/model-tests",
            element: <ModelTestsPage />,
          },
          {
            path: "/admin/model-test/:modelTestId",
            element: <MTEditPage />,
          },
          {
            path: "/admin/model-tests/:modelTestId/create-exam",
            element: <CreateExamForModelTestPage />,
          },
          {
            path: "/admin/model-tests/:modelTestId/exams",
            element: <MTExamListPage />,
          },
          {
            path: "/admin/model-tests/:modelTestId/exams/:examId/submissions",
            element: <MTSubmissionsTable />,
          },
          {
            path: "/admin/model-tests/:modelTestId/exams/:examId/submissions/:answerId",
            element: <MTSubmissionView />,
          },
          // pdf management
          {
            path: "/admin/pdf",
            element: <PdfIndexPage />,
          },
          {
            path: "/admin/pdf/create",
            element: <PdfCreatePage />,
          },
          {
            path: "/admin/pdf/edit/:pdfId",
            element: <PdfEditPage />,
          },
          // payments && subscriptions management
          {
            path: "/admin/payments",
            element: <PaymentListPage />,
          },
          {
            path: "/admin/quota",
            element: <QuotaSubscriptionsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
