import { Card } from "@/components/ui/card";
import { useGetQuestionsQuery } from "@/features/questions/questionsApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Loading from "../../atoms/Loading";
import PageTitle from "../../atoms/PageTitle";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import PaginationSCN from "../../molecules/questionList/PaginationSCN";
import FilteringQuestions from "../../organism/FilteringQuestions";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";

const QuestionListForAdminPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [filters, setFilters] = useState({});

    // Fetch data based on the current page, per-page value, and filters
    const {
        data: paginationData,
        isLoading: isLoadingGetQuestions,
        isFetching: isFetchingGetQuestions,
        isSuccess,
        refetch,
    } = useGetQuestionsQuery({
        page: currentPage,
        per_page: perPage,
        ...filters,
    });
console.log(isFetchingGetQuestions);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm();

    const cleanPayload = (payload) =>
        Object.fromEntries(
            Object.entries(payload).filter(
                ([, value]) => value !== undefined && value.length > 0 // Remove empty fields
            )
        );

    const handleFilterQuestions = async (formData) => {
        const rawPayload = {
            keyword: formData.keyword,
            section_id: formData.section || [],
            exam_type_id: formData.exam_type || [],
            exam_sub_type_id: formData.exam_sub_type || [],
            group_id: formData.group || [],
            level_id: formData.level || [],
            subject_id: formData.subject || [],
            lesson_id: formData.lesson || [],
            topic_id: formData.topic || [],
            sub_topic_id: formData.sub_topic || [],
        };
        const payload = cleanPayload(rawPayload); // Remove empty values

        try {
            setFilters(payload);
            refetch({
                page: currentPage,
                perPage: perPage,
                ...payload,
            });
        } catch (err) {
            toast.error(
                err?.data?.error ||
                err?.data?.message ||
                "An error occurred while filtering"
            );
        }
    };

    if (isLoadingGetQuestions) return <Loading />;
    if (!isSuccess || !paginationData)
        return <h1 className="text-5xl text-black">No data found</h1>;

    return (
        <Layout>
            <Layout.Header sticky>
                <PageTitle title="Questions List" />
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <Card
                    id="filtering-and-search-question"
                    className="mb-5 h-full rounded-md p-3"
                >
                    <FilteringQuestions
                        setValue={setValue}
                        handleFilterQuestions={handleFilterQuestions}
                        control={control}
                        register={register}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        refetch={refetch}
                        isFetchingGetQuestions={isFetchingGetQuestions}
                    />
                </Card>

                <div>
                    <PaginationSCN
                        data={paginationData.data.data}
                        totalRecords={paginationData.data.total}
                        currentPage={currentPage}
                        perPage={perPage}
                        refetch={refetch}
                        onPageChange={(newPage) => {
                            setCurrentPage(newPage);
                            refetch({
                                page: newPage,
                                per_page: perPage,
                                ...filters,
                            });
                        }}
                        onPerPageChange={(newPerPage) => {
                            setPerPage(newPerPage);
                            refetch({
                                page: currentPage,
                                per_page: newPerPage,
                                ...filters,
                            });
                        }}
                    />
                </div>
            </Layout.Body>
        </Layout>
    );
};

export default QuestionListForAdminPage;
