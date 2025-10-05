"use client";

import AnotherForm, { LocationFormSchema } from "@/components/project/another/form";
import ProductsList from "@/components/project/products/list";
import PageBreadCrumb from "@/components/sidebar/page-breadcrumb";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { t } = useTranslation();

  const submitHandler = (data: LocationFormSchema) => {
    console.log(data);
  };

  return (
    <PageBreadCrumb pageTitle={t("translation:another.page-title")}>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <AnotherForm
          defaultValues={{ address: "", product: { id: "", name: "" } }}
          submitButtonText={t("translation:submit")}
          isBusy={false}
          onSubmit={submitHandler}
        />
      </div>
    </PageBreadCrumb>
  );
}
