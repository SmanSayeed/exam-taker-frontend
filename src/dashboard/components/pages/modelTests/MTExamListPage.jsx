import { useParams } from "react-router-dom";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import MTExamCard from "../../molecules/modelTests/MTExamCard";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";

const dummyExams = [
    {
        id: 1,
        title: "MCQ Exam 1",
        description: "This is the first MCQ exam.",
        is_active: true,
        is_paid: false,
    },
    {
        id: 2,
        title: "MCQ Exam 2",
        description: "This is the second MCQ exam.",
        is_active: false,
        is_paid: true,
    },
    {
        id: 3,
        title: "Practice Exam 3",
        description: "This is the third practice exam.",
        is_active: true,
        is_paid: false,
    },
];

export default function MTExamListPage() {
    const { modelTestId } = useParams();
    console.log(modelTestId)

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
                    <h2 className="text-2xl mb-8">Exams under Model Test: ....</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        {
                            dummyExams.length > 0 ? (
                                dummyExams.map(exam => (
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