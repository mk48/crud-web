import { AuditColumn, AuditModel } from "@/components/project/types";

// Priority: deleted_at > updated_at > created_at
const getAuditTime = (item: AuditModel<any>): number => {
  if (item.deletedAt) return new Date(item.deletedAt).getTime();
  if (item.updatedAt) return new Date(item.updatedAt).getTime();
  return new Date(item.createdAt).getTime();
};

export const SortedByAuditTime = <T>(a: AuditModel<T>, b: AuditModel<T>) => {
  const timeA = getAuditTime(a);
  const timeB = getAuditTime(b);

  return timeB - timeA;
};

// Priority: deleted_at > updated_at > created_at
const getAuditTimeFromAuditColumn = (item: AuditColumn): number => {
  if (item.deletedAt) return new Date(item.deletedAt).getTime();
  if (item.updatedAt) return new Date(item.updatedAt).getTime();
  return new Date(item.createdAt).getTime();
};

export const SortedByAuditColumns = (a: AuditColumn, b: AuditColumn) => {
  const timeA = getAuditTimeFromAuditColumn(a);
  const timeB = getAuditTimeFromAuditColumn(b);

  return timeB - timeA;
};
