import { serverAPIwithAuthGet } from "@/lib/ServerAPI";
import { useQuery } from "@tanstack/react-query";
import { ProductsDto } from "../types";

const MINUTE = 1000 * 60;

//this hook is mainly used in audit history and deleted records list
export default function useProductsIncludingDeleted(id: string) {
  //------------------------- Query: Get Products, including deleted records -----------------------------------
  const result = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const response = await serverAPIwithAuthGet<ProductsDto>(`/api/v1/products/${id}`, { includeDeleted: true });
      return response.data;
    },
    staleTime: 10 * MINUTE,
  });

  return result;
}
