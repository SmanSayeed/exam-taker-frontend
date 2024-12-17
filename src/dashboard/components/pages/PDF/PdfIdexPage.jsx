import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Loading from "../../atoms/Loading";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";
import PdfCard from "../../molecules/pdf/PdfCard";
import { useGetPdfsQuery } from "@/features/pdfs/pdfApi";

const PdfIndexPage = () => {
  const {
    data: allPdfs,
    isLoading,
    isSuccess,
    refetch,
  } = useGetPdfsQuery();

  if (isLoading) return <Loading />;

  return (
    <Layout>
      <Layout.Header>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-semibold">PDFs</h1>
          <Link to="/admin/pdf/create">
            <Button>Create New</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {isSuccess &&
            allPdfs?.data &&
            allPdfs?.data.map((pdf) => (
              <PdfCard key={pdf?.id} pdf={pdf} refetch={refetch} />
            ))}
        </div>
      </Layout.Body>
    </Layout>
  );
};

export default PdfIndexPage;
