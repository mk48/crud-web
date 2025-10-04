import { AuditColumn } from "../types";

export interface ProductsDto extends AuditColumn {
  id: string;
  productName: string;
  department: string | null;
  category: string | null;
  material: string | null;
  color: string | null;
  description: string | null;
  size: string | null;
  price: number;
}

export interface ProductsRequestDto {
  productName: string;
  department: string | null;
  category: string | null;
  material: string | null;
  color: string | null;
  description: string | null;
  size: string | null;
  price: number;
}
