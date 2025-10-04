import { serverAPIwithAuthGetNoQuery } from "@/lib/ServerAPI";
import { useQuery } from "@tanstack/react-query";
import { ProductsDto } from "../types";

export default function useProducts(id: string, enabled: boolean = true) {
  //------------------------- Query: Get Products -----------------------------------
  const result = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const response = await serverAPIwithAuthGetNoQuery<ProductsDto>(`/api/v1/products/${id}`);
      return response.data;
    },
    enabled: enabled,
  });

  return result;
}
