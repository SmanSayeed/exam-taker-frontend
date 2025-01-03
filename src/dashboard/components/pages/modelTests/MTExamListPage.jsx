import { useGetAllMTExamsQuery } from "@/features/modelTests/modelTestApi";
import { useParams } from "react-router-dom";
import Loading from "../../atoms/Loading";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import MTExamCard from "../../molecules/modelTests/MTExamCard";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";

export default function MTExamListPage() {
    const { modelTestId } = useParams();
    const { data: allMTExams, isLoading, isError } = useGetAllMTExamsQuery(modelTestId);

    if (isLoading) return <Loading />;

    return (
        <Layout>
            <Layout.Header>
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <div className="w-full">
                    <h2 className="text-2xl mb-8">All Model Test Exams</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        {
                            allMTExams?.data && allMTExams?.data?.length > 0 ? (
                                allMTExams?.data.map(exam => (
                                    <MTExamCard key={exam.id} exam={exam} />
                                ))
                            ) : (
                                <p className="text-gray-500">No exams available for this model test.</p>
                            )
                        }
                    </div>
                </div>
            </Layout.Body>
        </Layout>
    )
}