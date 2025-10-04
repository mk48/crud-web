
import AuditTime from "@/components/AuditTime";
import AuditUserName from "@/components/AuditUserName";
import { ProductsDto } from "./types";
import { useTranslation } from "react-i18next";

interface props {
  data: ProductsDto;
}

const ProductsView: React.FC<props> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-start">
      <div className="overflow-hidden rounded-lg border">
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            
                        
            {/*----------------- Product Name -----------------*/}
            <div className="py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
              <dt className="text-sm font-medium text-gray-500">
                {t("products.productName")}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {data?.productName}
              </dd>
            </div>

              
            {/*----------------- Department -----------------*/}
            <div className="py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
              <dt className="text-sm font-medium text-gray-500">
                {t("products.department")}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {data?.department}
              </dd>
            </div>

              
            {/*----------------- Category -----------------*/}
            <div className="py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
              <dt className="text-sm font-medium text-gray-500">
                {t("products.category")}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {data?.category}
              </dd>
            </div>

              
            {/*----------------- Material -----------------*/}
            <div className="py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
              <dt className="text-sm font-medium text-gray-500">
                {t("products.material")}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {data?.material}
              </dd>
            </div>

              
            {/*----------------- Color -----------------*/}
            <div className="py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
              <dt className="text-sm font-medium text-gray-500">
                {t("products.color")}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {data?.color}
              </dd>
            </div>

              
            {/*----------------- Description -----------------*/}
            <div className="py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
              <dt className="text-sm font-medium text-gray-500">
                {t("products.description")}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {data?.description}
              </dd>
            </div>

              
            {/*----------------- Size -----------------*/}
            <div className="py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
              <dt className="text-sm font-medium text-gray-500">
                {t("products.size")}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {data?.size}
              </dd>
            </div>

              
            {/*----------------- Price -----------------*/}
            <div className="py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
              <dt className="text-sm font-medium text-gray-500">
                {t("products.price")}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {data?.price}
              </dd>
            </div>


            {/*----------------- Action By -----------------*/}
            <div className="py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
              <dt className="text-sm font-medium text-gray-500">
                {t("audit-history.action-by")}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {data && (
                  <AuditUserName
                    auditModel={{
                      createdAt: data?.createdAt,
                      createdBy: data?.createdBy,
                      updatedAt: data?.updatedAt,
                      updatedBy: data?.updatedBy,
                      deletedAt: data?.deletedAt,
                      deletedBy: data?.deletedBy,
                    }}
                  />
                )}
              </dd>
            </div>

            {/*----------------- Action At -----------------*/}
            <div className="py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
              <dt className="text-sm font-medium text-gray-500">
                {t("audit-history.action-at")}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {data && (
                  <AuditTime
                    auditModel={{
                      createdAt: data?.createdAt,
                      createdBy: data?.createdBy,
                      updatedAt: data?.updatedAt,
                      updatedBy: data?.updatedBy,
                      deletedAt: data?.deletedAt,
                      deletedBy: data?.deletedBy,
                    }}
                  />
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ProductsView;