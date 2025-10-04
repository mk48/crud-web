import ErrorMessage from "@/components/ErrorMessage";
import PageLoadingIcon from "@/components/PageLoadingIcon";
import { useTranslation } from "react-i18next";
import useProduct from "./api-hooks/useProduct";
import ProductsView from "./view";

interface props {
  id: string;
}

const LoadAndViewProducts: React.FC<props> = ({ id }) => {
  const { t } = useTranslation();

  //------------------------- Query: Get Products -----------------------------------
  const { data, isLoading, isError } = useProduct(id);

  //---------------------------------- Render ----------------------------------
  if (isLoading) {
    return <PageLoadingIcon />;
  }

  if (isError || !data) {
    return <ErrorMessage title="Error!">{t("err-loading-data")}</ErrorMessage>;
  }

  return <ProductsView data={data} />;
};

export default LoadAndViewProducts;
