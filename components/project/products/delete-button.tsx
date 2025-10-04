import ConfirmDialog from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { serverAPIWithAuthDeleteNoBody } from "@/lib/ServerAPI";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface props {
  id: string;
  name: string;
  onSuccess: () => void;
}

const DeleteProductsButton: React.FC<props> = ({ id, name, onSuccess: deletedSuccessfully }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  // -------------------------- Mutations --------------------------------
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await serverAPIWithAuthDeleteNoBody(`/api/v1/products/${id}`);
      return response.data;
    },
    onSuccess: async () => {
      toast.success(
        t("translation:products.deleted-successfully", {
          Name: name,
        })
      );
      deletedSuccessfully();
    },
    onError: () => {
      toast.error(
        t("translation:products.delete-failed", {
          Name: name,
        })
      );
    },
  });

  const onConfirmedToDelete = () => {
    setOpen(false);

    mutation.mutate();
  };

  const onOpenClick = () => {
    setOpen(true);
  };

  const onClosed = () => {
    setOpen(false);
  };

  return (
    <ConfirmDialog
      title={t("translation:products.delete-confirm-title", {
        Name: name,
      })}
      key={`products-delete-${id}-${open}`} //included `open` state value so that it will re-render the confirm dialog
      open={open}
      onConfirmed={onConfirmedToDelete}
      onCancel={onClosed}
    >
      <Button variant="ghost" onClick={onOpenClick} disabled={mutation.isPending}>
        {mutation.isPending ? <Loader2 className="animate-spin" /> : <Trash2 className="size-4" />}
        {t("translation:delete")}
      </Button>
    </ConfirmDialog>
  );
};

export default DeleteProductsButton;
