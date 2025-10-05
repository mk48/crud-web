import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRightIcon, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

interface props {
  table: Table<any>;
}

const Pagination: React.FC<props> = ({ table }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-2 flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {t("translation:pagination.total-result")} {table.getRowCount()}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">{t("translation:pagination.result-per-page")}</p>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value: string) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {t("translation:pagination.page-n-of-total", {
            currentPage: table.getState().pagination.pageIndex + 1,
            totalPage: table.getPageCount(),
          })}
        </div>
        <div className="flex items-center space-x-2">
          {/* -------------- << --------------- */}
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="size-4" />
          </Button>

          {/* -------------- < --------------- */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="size-4" />
          </Button>

          {/* -------------- > --------------- */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="size-4" />
          </Button>

          {/* -------------- >> --------------- */}
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
