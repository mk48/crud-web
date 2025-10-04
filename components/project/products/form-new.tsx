import ErrorMessage from "@/components/ErrorMessage";
import ProductsForm, { ProductsFormSchema } from "@/components/project/products/form";
import { ProductsRequestDto } from "@/components/project/products/types";
import SuccessMessage from "@/components/SuccessMessage";
import { serverAPIWithAuthPost } from "@/lib/ServerAPI";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface props {
  onCreated?: () => void;
}

const ProductsNewForm: React.FC<props> = ({ onCreated }) => {
  const { t } = useTranslation();
  const [keyUpdate, setKeyUpdate] = useState(0);

  // Mutations
  const mutation = useMutation({
    mutationFn: async (dataToServer: ProductsRequestDto) => {
      const response = await serverAPIWithAuthPost("/api/v1/products", {
        ...dataToServer,
      });
      return response.data;
    },
    onSuccess: () => {
      setKeyUpdate((k) => k + 1);

      if (onCreated) {
        onCreated();
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

  return (
    <>
      <ProductsForm
        key={keyUpdate}
        defaultValues={{
          productName: "",
          department: "",
          category: "",
          material: "",
          color: "",
          description: "",
          size: "",
          price: 0,
        }}
        submitButtonText={t("create")}
        onSubmit={onSubmit}
        isBusy={mutation.isPending}
      />
      <div className="mx-auto min-w-96">
        {mutation.isSuccess && <SuccessMessage title={t("success")}>{t("translation:create-success")}</SuccessMessage>}
        {mutation.isError && <ErrorMessage title={t("failed")}>{t("translation:create-failed")}</ErrorMessage>}
      </div>
    </>
  );
};

export default ProductsNewForm;
