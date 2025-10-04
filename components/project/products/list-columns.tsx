import AuditTime from "@/components/AuditTime";
import AuditUserName from "@/components/AuditUserName";
import ToggleSortColumnHeader from "@/components/ToggleSortColumnHeader";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { createColumnHelper } from "@tanstack/react-table";
import i18next from "i18next";
import { Check, Pencil, View, X } from "lucide-react";
import Link from "next/link";
import { ProductsDto } from "./types";
import { AuditColumn } from "../types";

const columnHelper = createColumnHelper<ProductsDto>();

export const columns = [
  //----------------- Column: ProductName ---------------------------
  columnHelper.accessor("productName", {
    header: ({ column }) => {
      return <ToggleSortColumnHeader column={column}>{i18next.t("products.productName")}</ToggleSortColumnHeader>;
    },
    cell: (info) => info.getValue(),
  }),
  //----------------- Column: Department ---------------------------
  columnHelper.accessor("department", {
    header: ({ column }) => {
      return <ToggleSortColumnHeader column={column}>{i18next.t("products.department")}</ToggleSortColumnHeader>;
    },
    cell: (info) => info.getValue(),
  }),
  //----------------- Column: Category ---------------------------
  columnHelper.accessor("category", {
    header: ({ column }) => {
      return <ToggleSortColumnHeader column={column}>{i18next.t("products.category")}</ToggleSortColumnHeader>;
    },
    cell: (info) => info.getValue(),
  }),
  //----------------- Column: Material ---------------------------
  columnHelper.accessor("material", {
    header: ({ column }) => {
      return <ToggleSortColumnHeader column={column}>{i18next.t("products.material")}</ToggleSortColumnHeader>;
    },
    cell: (info) => info.getValue(),
  }),
  //----------------- Column: Color ---------------------------
  columnHelper.accessor("color", {
    header: ({ column }) => {
      return <ToggleSortColumnHeader column={column}>{i18next.t("products.color")}</ToggleSortColumnHeader>;
    },
    cell: (info) => info.getValue(),
  }),
  //----------------- Column: Description ---------------------------
  columnHelper.accessor("description", {
    header: ({ column }) => {
      return <ToggleSortColumnHeader column={column}>{i18next.t("products.description")}</ToggleSortColumnHeader>;
    },
    cell: (info) => info.getValue(),
  }),
  //----------------- Column: Size ---------------------------
  columnHelper.accessor("size", {
    header: ({ column }) => {
      return <ToggleSortColumnHeader column={column}>{i18next.t("products.size")}</ToggleSortColumnHeader>;
    },
    cell: (info) => info.getValue(),
  }),
  //----------------- Column: Price ---------------------------
  columnHelper.accessor("price", {
    header: ({ column }) => {
      return <ToggleSortColumnHeader column={column}>{i18next.t("products.price")}</ToggleSortColumnHeader>;
    },
    cell: (info) => info.getValue(),
  }),

  //----------------- Column: Action by ---------------------------
  columnHelper.display({
    id: "actionBy",
    header: ({ column }) => {
      return (
        <ToggleSortColumnHeader column={column}>
          {i18next.t("translation:audit-history.action-by")}
        </ToggleSortColumnHeader>
      );
    },
    cell: ({ row }) => {
      const audit: AuditColumn = {
        createdAt: row.original.createdAt,
        createdBy: row.original.createdBy,
        updatedAt: row.original.updatedAt,
        updatedBy: row.original.updatedBy,
        deletedAt: row.original.deletedAt,
        deletedBy: row.original.deletedBy,
      };
      return <AuditUserName auditModel={audit} />;
    },
  }),

  //----------------- Column: Action at ---------------------------
  columnHelper.display({
    id: "actionAt",
    header: ({ column }) => {
      return (
        <ToggleSortColumnHeader column={column}>
          {i18next.t("translation:audit-history.action-at")}
        </ToggleSortColumnHeader>
      );
    },
    size: 150,
    cell: ({ row }) => {
      const audit: AuditColumn = {
        createdAt: row.original.createdAt,
        createdBy: row.original.createdBy,
        updatedAt: row.original.updatedAt,
        updatedBy: row.original.updatedBy,
        deletedAt: row.original.deletedAt,
        deletedBy: row.original.deletedBy,
      };
      return <AuditTime auditModel={audit} />;
    },
  }),

  //----------------- Column: Action icons ---------------------------
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-end gap-x-8">
        {/* Edit is not allowed for deleted rows */}
        {row.original.deletedBy == null && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link href={`/products/${row.original.id}/edit`}>
                  <Pencil className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>{i18next.t("translation:edit")}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href={`/products/${row.original.id}${row.original.deletedBy == null ? "" : "/audit-history"}`}>
                <View className="size-4" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>{i18next.t("translation:view")}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  }),
];
