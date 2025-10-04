"use client";

import PageBreadCrumb from "@/components/sidebar/page-breadcrumb";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <PageBreadCrumb pageTitle={t("translation:product.title")}>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">Products</div>
    </PageBreadCrumb>
  );
}
