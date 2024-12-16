import { Card } from "@/components/ui/card";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";
import PdfCreateForm from "../../molecules/pdf/PdfCreateForm";

const PdfCreatePage = () => {
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
        <div className="body w-full">
          <div>
            <Card className="container">
              {/* Page Title */}
              <div className="my-4">
                <h1 className="text-xl font-semibold">PDF Creation</h1>
                <p>Upload a PDF file or provide a file link</p>
              </div>

              {/* PDF Upload Form */}
              <PdfCreateForm />
            </Card>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  );
};

export default PdfCreatePage;
