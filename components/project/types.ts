export interface UserModel {
  userId: string;
  email: string;
  name: string;
}

export interface AuditColumn {
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
  deletedAt: string | null;
  deletedBy: string | null;
}

export interface AuditModel<T> extends AuditColumn {
  record: T;
}

export interface ColumnMetaDataResponseModel {
  name: string;
  dataType: string;
  isNullable: boolean;
}

export interface ListMetaDataResponseModel {
  columns: ColumnMetaDataResponseModel[];
  sortableColumns: string[];
}

export interface PaginationModel<T> {
  pageIndex: number;
  recordsPerPage: number;
  totalRecords: number;
  records: T[];
}
