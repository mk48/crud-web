import AuditTime from "@/components/AuditTime";
import AuditUserName from "@/components/AuditUserName";
import ErrorMessage from "@/components/ErrorMessage";
import PageLoadingIcon from "@/components/PageLoadingIcon";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { serverAPIwithAuthGetNoQuery } from "@/lib/ServerAPI";
import { SortedByAuditColumns, SortedByAuditTime } from "@/lib/sort";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { ProductsDto } from "./types";
import { AuditModel } from "../types";

interface props {
  id: string;
}

const ProductsAuditHistory: React.FC<props> = ({ id }) => {
  const { t } = useTranslation();

  //------------------------- Query: get Products audit history -----------------------------------
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products-audit-history", id],
    queryFn: async () => {
      const response = await serverAPIwithAuthGetNoQuery<ProductsDto[]>(`/api/v1/products/${id}/audit-history`);
      return response.data;
    },
  });

  //---------------------------------- Render ----------------------------------
  if (isLoading) {
    return <PageLoadingIcon />;
  }

  if (isError) {
    return <ErrorMessage title="Error!">{t("err-loading-data")}</ErrorMessage>;
  }

  return (
    <div className="mt-8 p-4">
      <h1 className="text-2xl">{t("translation:audit-history.audit-history-records")}</h1>
      <hr />
      <Table className="overflow-x-auto">
        <TableHeader>
          <TableRow>
            <TableHead>{t("products.productName")}</TableHead>
            <TableHead>{t("products.department")}</TableHead>
            <TableHead>{t("products.category")}</TableHead>
            <TableHead>{t("products.material")}</TableHead>
            <TableHead>{t("products.color")}</TableHead>
            <TableHead>{t("products.description")}</TableHead>
            <TableHead>{t("products.size")}</TableHead>
            <TableHead>{t("products.price")}</TableHead>

            <TableHead>{t("translation:audit-history.action-by")}</TableHead>
            <TableHead>{t("translation:audit-history.action-at")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.sort(SortedByAuditColumns).map((row, idx) => (
            <TableRow key={`products-history-${idx}`}>
              <TableCell>{row.productName}</TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.material}</TableCell>
              <TableCell>{row.color}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.size}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>
                <AuditUserName auditModel={row} />
              </TableCell>
              <TableCell>
                <AuditTime auditModel={row} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsAuditHistory;
