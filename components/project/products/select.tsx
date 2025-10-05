import { Check, ChevronsUpDown, CircleX, Loader, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { serverAPIwithAuthGet } from "@/lib/ServerAPI";
import { useTranslation } from "react-i18next";
import ErrorMessage from "@/components/ErrorMessage";
import { useDebounce } from "@/hooks/useDebounce";
import { ProductsDto } from "./types";
import useProduct from "./api-hooks/useProduct";
import { PaginationModel } from "../types";

interface props {
  id: string;
  name: string;
  onSelect: (id: string, name: string) => void;
}

const ProductsSelect: React.FC<props> = ({ id, name, onSelect }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  const debounceSearch = useDebounce((str: string) => {
    setDebouncedSearchValue(str);
  }, 250);

  const {
    data: internalData,
    isLoading: internalDataIsLoading,
    isError: internalDataIsError,
  } = useProduct(id!, id !== "" && name === ""); //we need to load only if name is not given.

  //------------------------- Query:List slim - site configuration -----------------------------------
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products-id-name-list", debouncedSearchValue],
    queryFn: async () => {
      const response = await serverAPIwithAuthGet<PaginationModel<ProductsDto>>("/api/v1/products/id-name", {
        searchText: debouncedSearchValue,
        pageIndex: 0,
        recordsPerPage: 50, //this is dropdown combo box, so by default list only 50 items
      });
      return response.data;
    },
  });

  const searchInputHandler = (enteredText: string) => {
    setSearchValue(enteredText);
    debounceSearch(enteredText);
  };

  const onSelectComponent = (selectedId: string) => {
    const selectedObj = data?.records.find((p) => p.id === selectedId);
    if (selectedObj) {
      onSelect(selectedObj.id, selectedObj.productName);
    }
    setOpen(false);
  };

  //------------------------- Render -----------------------------------
  const ShowSelectedItem = () => {
    if (name) {
      return <>{name}</>;
    }

    if (internalDataIsLoading) {
      return <Loader className="size-4 animate-spin" />;
    }

    if (internalDataIsError) {
      return <CircleX className="size-4 text-red-400" />;
    }

    if (internalData) {
      return <>{internalData.productName}</>;
    }

    return <>{t("translation:products.select-placeholder")}</>;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {isLoading ? <Loader2 className="size-2 animate-spin" /> : <ShowSelectedItem />}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        {isError ? (
          <ErrorMessage title="Error!">{t("err-loading-data")}</ErrorMessage>
        ) : (
          <Command shouldFilter={false}>
            <CommandInput
              value={searchValue}
              placeholder={t("translation:products.select-placeholder")}
              onValueChange={searchInputHandler}
            />
            <CommandEmpty>{t("translation:no-data")}</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {data?.records.map((row) => (
                  <CommandItem key={row.id} value={row.id} onSelect={onSelectComponent}>
                    <Check className={cn("mr-2 size-4", id === row.id ? "opacity-100" : "opacity-0")} />
                    {row.productName}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ProductsSelect;
