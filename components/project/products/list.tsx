import AdvancedQueryBuilder from "@/components/AdvancedQueryBuilder";
import ErrorMessage from "@/components/ErrorMessage";
import PageLoadingIcon from "@/components/PageLoadingIcon";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDebounce } from "@/hooks/useDebounce";
import { serverAPIwithAuthGet } from "@/lib/ServerAPI";
import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Loader, Plus, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { columns } from "./list-columns";
import { ProductsDto } from "./types";
import { PaginationModel } from "../types";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProductsList() {
  const { t } = useTranslation();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  //default search
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [includeDeletedRecords, setIncludeDeletedFiles] = useState(false);

  //advanced query
  const [queryType, setQueryType] = useState("search"); //search or advancedQuery
  const [whereCondition, setwhereCondition] = useState("");
  const [whereConditionParameters, setwhereConditionParameters] = useState("");

  const debounceSearch = useDebounce((str: string) => {
    setDebouncedSearchValue(str);
    table.firstPage();
  }, 500);

  //------------------------- Query: get all products list -----------------------------------
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "products",
      sorting,
      pagination.pageIndex,
      pagination.pageSize,
      debouncedSearchValue,
      includeDeletedRecords,
    ],
    queryFn: async () => {
      //get sorting col & order
      let sortingTextWithDirection = "";
      if (sorting && sorting.length >= 1) {
        const sortingDirection = sorting[0].desc ? "desc" : "asc";
        sortingTextWithDirection = sorting[0].id + ":" + sortingDirection;
      }

      const response = await serverAPIwithAuthGet<PaginationModel<ProductsDto>>("/api/v1/products", {
        pageIndex: pagination.pageIndex,
        recordsPerPage: pagination.pageSize,
        searchText: debouncedSearchValue,
        sortBy: sortingTextWithDirection,
        includeDeleted: includeDeletedRecords,
      });
      return response.data;
    },
    enabled: queryType === "search",
  });

  //------------------------- Query: advanced -----------------------------------
  const {
    data: advancedQueryData,
    isLoading: advancedQueryIsLoading,
    isError: advancedQueryIsError,
  } = useQuery({
    queryKey: [
      "products-advanced-query",
      pagination.pageIndex,
      pagination.pageSize,
      whereCondition,
      whereConditionParameters,
      sorting,
    ],
    queryFn: async () => {
      //get sorting col & order
      let sortingTextWithDirection = "";
      if (sorting && sorting.length >= 1) {
        const sortingDirection = sorting[0].desc ? "desc" : "asc";
        sortingTextWithDirection = sorting[0].id + ":" + sortingDirection;
      }

      const response = await serverAPIwithAuthGet<PaginationModel<ProductsDto>>("/api/v1/products/query", {
        pageIndex: pagination.pageIndex,
        recordsPerPage: pagination.pageSize,
        whereCondition: whereCondition,
        whereConditionParametersJson: whereConditionParameters,
        sortBy: sortingTextWithDirection,
      });
      return response.data;
    },
    enabled: queryType === "advancedQuery" && whereCondition !== "",
  });

  const table = useReactTable({
    data: (queryType == "search" ? data?.records : advancedQueryData?.records) || [],
    columns,
    manualPagination: true, //turn off client-side pagination
    rowCount: queryType == "search" ? data?.totalRecords : advancedQueryData?.totalRecords,

    getRowCanExpand: (row: Row<ProductsDto>) => true,
    getCoreRowModel: getCoreRowModel(),

    manualSorting: true,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    manualFiltering: true, //turn off built-in client-side filtering

    getExpandedRowModel: getExpandedRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    state: {
      sorting,
      pagination,
    },
  });

  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredText = event.target.value;
    setSearchValue(enteredText);
    debounceSearch(enteredText);
  };

  const clearSearchText = () => {
    setSearchValue("");
    setDebouncedSearchValue("");
    table.firstPage();
  };

  const searchIncludeDeletedChange = (include: boolean) => {
    setIncludeDeletedFiles(include);
    table.firstPage();
  };

  const onAdvancedQuery = (where: string, parameters: string) => {
    setwhereCondition(where);
    setwhereConditionParameters(parameters);
  };

  //----------------- Render
  return (
    <div>
      <Tabs defaultValue="search" value={queryType} onValueChange={setQueryType} className="mb-4">
        <TabsList>
          <TabsTrigger value="search">{t("translation:search")}</TabsTrigger>
          <TabsTrigger value="advancedQuery">{t("translation:advancedQuery.advanced-query")}</TabsTrigger>
        </TabsList>

        {/*------------------------- Search -------------------------*/}
        <TabsContent forceMount value="search" className="data-[state=inactive]:hidden">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
              {/*------------------------- Search by: product_name -------------------------*/}
              <div className="relative w-full">
                {isLoading ? (
                  <Loader className="absolute left-2 top-2.5 size-4 animate-spin" />
                ) : (
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                )}
                <Input
                  placeholder={t("translation:products.search-by-productName")}
                  value={searchValue}
                  onChange={searchInputHandler}
                  className="w-full pl-8"
                />
                <Button
                  className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground"
                  variant="ghost"
                  onClick={clearSearchText}
                >
                  <X />
                </Button>
              </div>

              {/*------------------------- Search by: Include deleted records -------------------------*/}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeDeleted"
                  defaultChecked={false}
                  checked={includeDeletedRecords}
                  onCheckedChange={searchIncludeDeletedChange}
                />
                <label
                  htmlFor="includeDeleted"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("translation:include-deleted-records")}
                </label>
              </div>
            </div>
            <Button asChild className="ml-2">
              <Link href="/products/new">
                <Plus className="mr-2 h-4 w-4" />
                {t("products.create-new-products")}
              </Link>
            </Button>
          </div>
          {isError && (
            <ErrorMessage title="Error!" className="mb-4 mt-4">
              {t("err-loading-data")}
            </ErrorMessage>
          )}
        </TabsContent>
        <TabsContent forceMount value="advancedQuery" className="data-[state=inactive]:hidden">
          <AdvancedQueryBuilder
            isBusy={advancedQueryIsLoading}
            columnMetaDataUrl="/api/v1/products/meta-data"
            onSearch={onAdvancedQuery}
          />
          {advancedQueryIsError && (
            <ErrorMessage title="Error!" className="mb-4 mt-4">
              {t("err-loading-data")}
            </ErrorMessage>
          )}
        </TabsContent>
      </Tabs>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {isLoading ? <PageLoadingIcon /> : t("translation:no-data")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination table={table} />
    </div>
  );
}
