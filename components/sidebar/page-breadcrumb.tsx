import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export interface BreadcrumbData {
  title: string;
  url: string;
}

interface props {
  children: React.ReactNode;
  breadCrumbList?: BreadcrumbData[];
  pageTitle?: string;
}

const PageBreadCrumb: React.FC<props> = ({ children, breadCrumbList, pageTitle }) => {
  const { t } = useTranslation();

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link href="/">{t("home")}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadCrumbList && <BreadcrumbSeparator className="hidden md:block" />}

              {breadCrumbList?.map((bc) => (
                <Fragment key={`${bc.title}`}>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink asChild>
                      <Link href={bc.url}>{bc.title}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                </Fragment>
              ))}

              {pageTitle && breadCrumbList == null && <BreadcrumbSeparator className="hidden md:block" />}

              {pageTitle && (
                <BreadcrumbItem>
                  <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
                </BreadcrumbItem>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      {children}
    </>
  );
};

export default PageBreadCrumb;
