"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebarAdmin } from "@/components/app-sidebar-admin";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || role !== "admin")) {
      router.push("/login"); 
    }
  }, [user, role, loading, router]);

  if (loading) return <div className="p-10 text-center">Checking access...</div>;
  if (!user || role !== "admin") return null;

  return <>{children}</>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AdminAuthGuard>
          <div className="flex min-h-screen">
            <AppSidebarAdmin />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </AdminAuthGuard>
      </SidebarProvider>
    </AuthProvider>
  );
}