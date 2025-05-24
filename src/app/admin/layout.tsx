"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebarAdmin } from "@/components/app-sidebar-admin";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || profile?.role !== "admin")) {
      router.push("/login");
    }
  }, [user, profile, loading, router]);

  if (loading) return <div className="p-10 text-center">Checking access...</div>;
  if (!user || profile?.role !== "admin") return null;

  return <>{children}</>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminAuthGuard>
        <div className="flex h-screen w-screen">
          <AppSidebarAdmin />
          <main className="flex-1 flex items-center justify-center p-6">{children}</main>
        </div>
      </AdminAuthGuard>
    </SidebarProvider>
  );
}
