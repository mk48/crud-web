
"use client";

import ProductsNewForm from "@/components/project/products/form-new";
import PageBreadCrumb from "@/components/sidebar/page-breadcrumb";
import { useTranslation } from "react-i18next";

const Page = () => {
  const { t } = useTranslation();

  return (
    <PageBreadCrumb
      pageTitle={t("create")}
      breadCrumbList={[{ title: t("products.page-title"), url: "/products" }]}
    >
      <div className="mx-auto w-96">
        <ProductsNewForm />
      </div>
    </PageBreadCrumb>
  );
};

export default Page;
