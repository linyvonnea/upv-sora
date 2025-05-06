import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebarAdmin } from "@/components/app-sidebar-admin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebarAdmin />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}