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
  Image,
  User,
  Megaphone,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AppSidebar() {
  const pathname = usePathname();

  const mainLinks = [
    { label: "Home", href: "/user/home", icon: Home },
    { label: "Event Requests", href: "/user/event-requests", icon: Calendar },
    { label: "Pubmat Request", href: "/user/pubmat-requests", icon: Image },
    { label: "Information Board", href: "/user/information", icon: Megaphone },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="text-lg font-bold pl-4">UPV-SORA</div>
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
                    ? "bg-[#531212] text-white"
                    : "text-muted-foreground hover:bg-[#531212]/10 hover:text-[#531212]"
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
            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>UP</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-left">
                <p className="text-sm font-medium">shadcn</p>
                <p className="text-xs text-muted-foreground">m@example.com</p>
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="top" align="start" className="w-56">
            <DropdownMenuItem
              onClick={() => {
                console.log("Log out clicked");
                // insertttt firebase auth sign out
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