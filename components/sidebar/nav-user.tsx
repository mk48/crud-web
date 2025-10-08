"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n";
import { useEffect, useState } from "react";

export function NavUser() {
  const { t } = useTranslation();
  const { isMobile } = useSidebar();
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    var savedLocale = localStorage.getItem("locale");
    if (savedLocale) {
      setLanguage(savedLocale);
    }
  }, []);

  const email = "kumaran.veera@outlook.com"; // Get from auth context
  const emailInitial = email.substring(0, 2).toUpperCase();

  const changeLocale = (language: string) => {
    setLanguage(language);
    localStorage.setItem("locale", language);
    i18n.changeLanguage(language);
  };

  const logoutClick = () => {
    // Handle logout logic here
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="" alt={email} />
                <AvatarFallback className="rounded-lg">{emailInitial}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{emailInitial}</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="" alt={email} />
                  <AvatarFallback className="rounded-lg">{emailInitial}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{emailInitial}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuRadioGroup value={language} onValueChange={changeLocale}>
              <DropdownMenuRadioItem value="da">
                {t("language.danish")}
                <DropdownMenuShortcut>🇩🇰</DropdownMenuShortcut>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="en">
                {t("translation:language.english")}
                <DropdownMenuShortcut>🇺🇸</DropdownMenuShortcut>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="ta">
                {t("translation:language.tamil")}
                <DropdownMenuShortcut>🇮🇳</DropdownMenuShortcut>
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logoutClick}>
              <LogOut />
              {t("log-out")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
