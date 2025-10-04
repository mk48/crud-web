
"use client";

import { useTranslation } from "react-i18next";
import PageBreadCrumb from "@/components/sidebar/page-breadcrumb";
import { useParams } from "next/navigation";
import ProductsAuditHistory from "@/components/project/products/audit-history";

//This page is to show only the Audit history, mainly for deleted records
//The audit history is already shown in the View page, the view page won't work for deleted records
//so dedicated page for audit history
const Page = () => {
  const { t } = useTranslation();
  const params = useParams<{ id: string }>();

  return (
    <PageBreadCrumb
      pageTitle={`(${t("deleted")})`}
      breadCrumbList={[{ title: t("products.page-title"), url: "/products" }]}
    >
      <div className="p-4">
        <ProductsAuditHistory id={params.id} />
      </div>
    </PageBreadCrumb>
  );
};

export default Page;
