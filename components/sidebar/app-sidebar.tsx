"use client";

import { BrushCleaning, Component, LifeBuoy, PlugZap, Send } from "lucide-react";
import * as React from "react";

import { NavSecondary } from "@/components/sidebar/nav-secondary";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import NavMain from "./nav-main";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation();

  const data = {
    navProduction: [
      {
        title: t("translation:product.title"),
        url: "/products",
        icon: Component,
        isActive: false,
        items: [
          {
            title: t("translation:new"),
            url: "/products/new",
          },
        ],
      },
    ],
    navConfigs: [
      {
        title: "Nav 2",
        url: "#",
        icon: BrushCleaning,
        isActive: false,
      },
    ],
    navSecondary: [
      {
        title: t("translation:help"),
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: t("translation:feedback"),
        url: "#",
        icon: Send,
      },
    ],
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <PlugZap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">CRUD</span>
                  <span className="truncate text-xs">{t("product-description")}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain title={t("translation:mainLinks")} items={data.navProduction} />
        <NavMain title={t("translation:subLinks")} items={data.navConfigs} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
