"use client";

import useProduct from "@/components/project/products/api-hooks/useProduct";
import ProductsUpdateForm from "@/components/project/products/form-update";
import PageBreadCrumb from "@/components/sidebar/page-breadcrumb";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

const Page = () => {
  const { t } = useTranslation();
  const params = useParams<{ id: string }>();

  //------------------------- Query: Get Products -----------------------------------
  const { data } = useProduct(params.id);

  return (
    <PageBreadCrumb
      pageTitle={t("edit")}
      breadCrumbList={[
        {
          title: t("products.page-title"),
          url: "/products",
        },
        { title: data?.productName || "⏳", url: `/products/${params.id}` },
      ]}
    >
      <ProductsUpdateForm id={params.id} />
    </PageBreadCrumb>
  );
};

export default Page;
