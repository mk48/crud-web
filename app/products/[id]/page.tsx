"use client";

import useProduct from "@/components/project/products/api-hooks/useProduct";
import ProductsAuditHistory from "@/components/project/products/audit-history";
import DeleteProductsButton from "@/components/project/products/delete-button";
import LoadAndViewProducts from "@/components/project/products/load-view";
import PageBreadCrumb from "@/components/sidebar/page-breadcrumb";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const Page = () => {
  const { t } = useTranslation();
  const params = useParams<{ id: string }>();
  const router = useRouter();

  //------------------------- Query: Get Products -----------------------------------
  const { data } = useProduct(params.id);

  return (
    <PageBreadCrumb
      pageTitle={data?.productName || "⏳"}
      breadCrumbList={[{ title: t("products.page-title"), url: "/products" }]}
    >
      <div className="p-4">
        <div className="mb-4 flex justify-between">
          <Button asChild>
            <Link href={`/products/${params.id}/edit`} className="flex">
              <Pencil className="mr-2 size-4" />
              {t("translation:edit")}
            </Link>
          </Button>

          <DeleteProductsButton
            id={params.id}
            name={data?.productName || ""}
            onSuccess={() => router.push("/products")}
          />
        </div>

        <LoadAndViewProducts id={params.id} />
        <ProductsAuditHistory id={params.id} />
      </div>
    </PageBreadCrumb>
  );
};

export default Page;
