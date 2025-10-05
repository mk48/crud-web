import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";
import ProductsSelect from "../products/select";

const formSchema = z.object({
  address: z.string().trim().min(1),
  product: z.object({
    id: z.string().trim().min(1),
    name: z.string().optional().default(""),
  }),
});
export type LocationFormSchema = z.infer<typeof formSchema>;

//==================================== Props ==================================
type props = {
  defaultValues: LocationFormSchema;
  submitButtonText: string;
  isBusy: boolean;
  onSubmit: (data: LocationFormSchema) => void;
};

const AnotherForm: React.FC<props> = ({ defaultValues, onSubmit, submitButtonText, isBusy }) => {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto min-w-96 space-y-8 py-10">
        {/* ----------------- Address --------------------------- */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("translation:another.address")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ----------------- Product  --------------------------- */}
        <FormField
          control={form.control}
          name="product"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("translation:products.productName")}</FormLabel>
              <FormControl>
                <ProductsSelect
                  id={field.value.id}
                  name={field.value.name ?? ""}
                  onSelect={(selId, selName) => field.onChange({ id: selId, name: selName })}
                />
              </FormControl>
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

export default AnotherForm;
