"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Home,
  Image as LucideImage,
  User,
  Megaphone,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export function AppSidebar() {
  const pathname = usePathname();

  const mainLinks = [
    { label: "Home", href: "/user/home", icon: Home },
    { label: "Event Requests", href: "/user/event-requests", icon: Calendar },
    { label: "Pubmat Request", href: "/user/pubmat-requests", icon: LucideImage },
    { label: "Information Board", href: "/user/information", icon: Megaphone },
    // { label: "Settings", href: "/user/settings", icon: Settings },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="inline-flex items-center gap-2 text-lg font-bold">
          <Image src="/images/logo_green.png" alt="UPV Sora Logo" width={45} height={45} />
          UPV-SORA
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {mainLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium",
                  isActive
                    ? "bg-[#8E1537] text-white"
                    : "text-muted-foreground hover:bg-[#531212]/10 hover:text-[#8E1537]"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center justify-between w-full p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>UP</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                  <p className="text-sm font-medium leading-none">shadcn</p>
                  <p className="text-xs text-muted-foreground">m@example.com</p>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="top" align="start" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/user/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                console.log("Log out clicked");
                // insert firebase auth sign out here
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
