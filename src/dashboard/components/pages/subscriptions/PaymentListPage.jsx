import { useGetAllPaymentsQuery } from "@/features/subscriptions/subscriptionsApi";
import Loading from "../../atoms/Loading";
import PageTitle from "../../atoms/PageTitle";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import { paymentColumns } from "../../molecules/subscriptions/paymentColumns";
import UserNav from "../../organism/UserNav";
import { DataTable } from "../../templates/DataTable";
import { Layout } from "../../templates/Layout";

const PaymentListPage = () => {
    const { data: allPayments, isLoading, isSuccess } = useGetAllPaymentsQuery();

    return (
        <Layout>
            <Layout.Header>
                <PageTitle title={"Payments & Subscriptions"} />
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <div className='mt-8 mb-2 flex items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
                        <p className='text-muted-foreground'>
                            Here&apos;s a list of students payments!
                        </p>
                    </div>
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                    {
                        isLoading ? (
                            <Loading />
                        ) : (
                            isSuccess && allPayments?.data && (
                                <DataTable
                                    data={allPayments?.data}
                                    columns={paymentColumns}
                                />
                            )
                        )
                    }
                </div>
            </Layout.Body>
        </Layout>
    );
};

export default PaymentListPage;
