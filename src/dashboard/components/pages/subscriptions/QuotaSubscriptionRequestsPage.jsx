import { useGetQuotaSubscriptionsQuery } from "@/features/subscriptions/quotaSubscriptionApi";
import { Layout } from "../../templates/Layout";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import UserNav from "../../organism/UserNav";
import { CardHeader } from "@/components/ui/card";
import QuotaSubscriptionRequestsTable from "../../molecules/subscriptions/QuotaSubscriptionRequestsPageTable";

const QuotaSubscriptionRequestsPage = () => {
  // Fetch quota subscriptions data
  const { data, error, isLoading } = useGetQuotaSubscriptionsQuery();

  if (isLoading)
    return <p className="text-center text-muted-foreground">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-destructive-foreground">
        Error loading data!
      </p>
    );

  return (
    <Layout>
      <Layout.Header>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">Here's list of subscriptions request!</p>
          </div>
        </div>
        <QuotaSubscriptionRequestsTable />
      </Layout.Body>
    </Layout>
  );
};

export default QuotaSubscriptionRequestsPage;
