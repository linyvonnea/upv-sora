"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useAuth } from "@/contexts/AuthContext"; 
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth(); // Note: profile, not role
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || profile?.role !== "organization")) {
      router.push("/");
    }
  }, [loading, user, profile, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (profile?.role !== "organization") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        403 - Forbidden: You are not authorized to view this page.
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}