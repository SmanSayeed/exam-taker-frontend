import { useParams } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import PdfEditForm from "../../molecules/pdf/PdfEditForm";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";
import { useGetPdfByIdQuery } from "@/features/pdfs/pdfApi";

const PdfEditPage = () => {
  // Extract the `id` from the URL params
  const { pdfId } = useParams();

  // Fetch PDF data by ID using the query hook
  const { data: pdfData, error, isLoading } = useGetPdfByIdQuery(pdfId);

  // Handle loading, error, or absence of data
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching PDF data</div>;
  if (!pdfData) return <div>No PDF found</div>;

  return (
    <Layout>
      {/* Header Section */}
      <Layout.Header>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      {/* Body Section */}
      <Layout.Body>
        <div className="w-full">
          <Card className="container">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                PDF Modification
              </CardTitle>
              <CardDescription>
                Enter proper information to modify the PDF
              </CardDescription>
            </CardHeader>

            {/* PDF Edit Form */}
            <PdfEditForm initialData={pdfData.data} />
          </Card>
        </div>
      </Layout.Body>
    </Layout>
  );
};

export default PdfEditPage;
