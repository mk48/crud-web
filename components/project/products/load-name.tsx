import { CircleX, Loader2, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import useProductsIncludingDeleted from "./api-hooks/useProductsIncludingDeleted";

interface props {
  id: string;
}

const LoadAndShowProductsName: React.FC<props> = ({ id }) => {
  const { t } = useTranslation();

  //------------------------- Query: Get Products -----------------------------------
  const { data, isLoading, isError } = useProductsIncludingDeleted(id);

  //---------------------------------- Render ----------------------------------
  if (isLoading) {
    return <Loader2 className="size-4 animate-spin" />;
  }

  if (isError || !data) {
    return <div className="text-red-400">{t("err-loading-data")}</div>;
  }

  if (data.deletedBy) {
    return (
      <Link className="text-red-400 hover:underline" href={`/products/${data.id}/audit-history`}>
        <CircleX className="size-4 inline-block" /> {data.productName} <LinkIcon className="inline-block size-4" />
      </Link>
    );
  }

  return (
    <Link className="hover:underline" href={`/products/${data.id}`}>
      {data.productName} <LinkIcon className="inline-block size-4 text-muted-foreground" />
    </Link>
  );
};

export default LoadAndShowProductsName;
