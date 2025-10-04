import ErrorMessage from "@/components/ErrorMessage";
import PageLoadingIcon from "@/components/PageLoadingIcon";
import SuccessMessage from "@/components/SuccessMessage";
import { serverAPIWithAuthPut } from "@/lib/ServerAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import useProductsLoader from "./api-hooks/useProduct";
import ProductsForm, { ProductsFormSchema } from "./form";
import { ProductsRequestDto } from "./types";

interface props {
  id: string;
  onUpdated?: () => void;
}

const ProductsUpdateForm: React.FC<props> = ({ id, onUpdated }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  //------------------------- Query: get Products info -----------------------------------
  const { data, isLoading, isError } = useProductsLoader(id);

  //------------------------- Mutations  -----------------------------------
  const mutation = useMutation({
    mutationFn: async (dataToServer: ProductsRequestDto) => {
      const response = await serverAPIWithAuthPut(`/api/v1/products/${id}`, {
        ...dataToServer,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", id] });
      if (onUpdated) {
        onUpdated();
      }
    },
  });

  const onSubmit = (data: ProductsFormSchema) => {
    const dataToServer: ProductsRequestDto = {
      productName: data.productName,
      department: data.department,
      category: data.category,
      material: data.material,
      color: data.color,
      description: data.description,
      size: data.size,
      price: data.price,
    };
    //console.log(dataToServer);
    mutation.mutate(dataToServer);
  };

  //---------------------------------- Render ----------------------------------
  if (isLoading) {
    return <PageLoadingIcon />;
  }

  if (isError) {
    return <ErrorMessage title="Error!">{t("err-loading-data")}</ErrorMessage>;
  }

  return (
    <>
      <ProductsForm
        defaultValues={{
          productName: data?.productName || "",
          department: data?.department || "",
          category: data?.category || "",
          material: data?.material || "",
          color: data?.color || "",
          description: data?.description || "",
          size: data?.size || "",
          price: data?.price || 0,
        }}
        submitButtonText={t("update")}
        onSubmit={onSubmit}
        isBusy={mutation.isPending}
      />
      <div className="mx-auto min-w-96">
        {mutation.isSuccess && <SuccessMessage title={t("success")}>{t("update-success")}</SuccessMessage>}
        {mutation.isError && <ErrorMessage title={t("failed")}>{t("update-failed")}</ErrorMessage>}
      </div>
    </>
  );
};

export default ProductsUpdateForm;
