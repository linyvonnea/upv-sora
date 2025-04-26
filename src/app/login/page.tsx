import { LoginFormAdmin } from "@/components/login-form-admin";
import { LoginFormUser } from "@/components/login-form-user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Tabs defaultValue="organization" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
          <TabsContent value="organization">
            <LoginFormUser />
          </TabsContent>
          <TabsContent value="admin">
            <LoginFormAdmin />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
