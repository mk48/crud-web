"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { zodNullableNumber } from "@/lib/zod-validation";

const formSchema = z.object({
  productName: z.string().trim().min(1),
  department: z.string(),
  category: z.string(),
  material: z.string(),
  color: z.string(),
  description: z.string(),
  size: z.string(),
  price: z.coerce.number<number>(),
});
export type ProductsFormSchema = z.infer<typeof formSchema>;

//==================================== Props ==================================
type props = {
  defaultValues: ProductsFormSchema;
  submitButtonText: string;
  isBusy: boolean;
  onSubmit: (data: ProductsFormSchema) => void;
};

const ProductsForm: React.FC<props> = ({ defaultValues, onSubmit, submitButtonText, isBusy }) => {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto min-w-96 space-y-8 py-10">
        {/* ----------------- Product Name --------------------------- */}

        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("products.productName")}</FormLabel>
              <FormControl>
                <Input placeholder={t("products.productName-placeholder")} type="text" {...field} />
              </FormControl>
              <FormDescription>{t("products.productName-description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------------- Department --------------------------- */}

        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("products.department")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("products.department-placeholder")}
                  type="text"
                  {...field}
                  value={field.value === null ? "" : field.value}
                />
              </FormControl>
              <FormDescription>{t("products.department-description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------------- Category --------------------------- */}

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("products.category")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("products.category-placeholder")}
                  type="text"
                  {...field}
                  value={field.value === null ? "" : field.value}
                />
              </FormControl>
              <FormDescription>{t("products.category-description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------------- Material --------------------------- */}

        <FormField
          control={form.control}
          name="material"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("products.material")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("products.material-placeholder")}
                  type="text"
                  {...field}
                  value={field.value === null ? "" : field.value}
                />
              </FormControl>
              <FormDescription>{t("products.material-description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------------- Color --------------------------- */}

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("products.color")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("products.color-placeholder")}
                  type="text"
                  {...field}
                  value={field.value === null ? "" : field.value}
                />
              </FormControl>
              <FormDescription>{t("products.color-description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------------- Description --------------------------- */}

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("products.description")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("products.description-placeholder")}
                  type="text"
                  {...field}
                  value={field.value === null ? "" : field.value}
                />
              </FormControl>
              <FormDescription>{t("products.description-description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------------- Size --------------------------- */}

        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("products.size")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("products.size-placeholder")}
                  type="text"
                  {...field}
                  value={field.value === null ? "" : field.value}
                />
              </FormControl>
              <FormDescription>{t("products.size-description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------------- Price --------------------------- */}

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("products.price")}</FormLabel>
              <FormControl>
                <Input placeholder={t("products.price-placeholder")} type="number" {...field} />
              </FormControl>
              <FormDescription>{t("products.price-description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isBusy}>
          {isBusy && <Loader2 className="animate-spin" />}
          {submitButtonText}
        </Button>
      </form>
    </Form>
  );
};

export default ProductsForm;
