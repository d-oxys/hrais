import { Breadcrumb } from "antd";
import FormCompany from "../components/FormCompany";

const CreateCompanyPage = () => {
  const breadcrumb = [
    {
      href: "#",
      title: "Settings",
    },
    {
      href: "/settings/company",
      title: "Companies",
    },
    {
      href: "/settings/company/create",
      title: "Create New Company",
    },
  ];

  return (
    <div>
      <div className="mb-5">
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-lg">Create New Company</p>
            <Breadcrumb items={breadcrumb} />
          </div>
        </div>
        <div className="mt-4 bg-white rounded-xl p-5">
          <div className="font-bold text-primary mb-5">Company Data</div>
          <div className="border border-2 border-primary mb-4"></div>
          <FormCompany />
        </div>
      </div>
    </div>
  );
};
export default CreateCompanyPage;
