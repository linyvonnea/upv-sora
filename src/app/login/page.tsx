import { LoginFormAdmin } from "@/components/login-form-admin";
import { LoginFormUser } from "@/components/login-form-user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex w-screen h-screen font-sans bg-background overflow-hidden min-h-0 min-w-0">
      {/* Left Side: Image */}
      <div className="relative w-1/2 h-full min-h-0 min-w-0">
        <Image
          src="/images/login.png"
          alt="UPV SORA Illustration"
          fill
          className="object-cover" // or object-contain for no cropping
          priority
          sizes="50vw"
        />
      </div>
      {/* Right Side: Login and Branding */}
      <div className="flex flex-col w-1/2 h-full bg-white relative min-h-0 min-w-0">
        {/* Top Right Branding */}
        <div className="flex justify-end items-center gap-3 p-6 md:p-10">
          <Image
            src="/images/logo_maroonwhite.png"
            alt="UPV SORA Logo"
            width={40}
            height={40}
            className="rounded-full"
            priority
          />
          <span className="text-3xl md:text-2xl font-bold text-[#8B1832] tracking-tight" style={{ fontFamily: "Instrument Sans, sans-serif" }}>
            UPV SORA
          </span>
        </div>
        {/* Welcome Text */}
        <div className="flex flex-col items-center mt-2 mb-2 px-6">
          <h2 className="text-lg md:text-xl font-medium text-[#284b3e] mb-1" style={{ fontFamily: "Instrument Sans, sans-serif" }}>
            Welcome to
          </h2>
          <h1 className="text-3xl md:text-5xl font-bold text-[#8B1832] mb-2" style={{ fontFamily: "Instrument Sans, sans-serif" }}>
            UPV SORA
          </h1>
          <p className="text-base md:text-lg text-[#284b3e] font-normal" style={{ fontFamily: "Instrument Sans, sans-serif" }}>
            Student Organization Request Assistance
          </p>
        </div>
        {/* Login Tabs */}
        <div className="flex flex-1 items-start justify-center min-h-0 min-w-0">
          <div className="w-full max-w-[400px] mt-0">
            <Tabs defaultValue="organization" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted">
                <TabsTrigger value="organization" className="font-semibold text-[#284b3e]">
                  Organization
                </TabsTrigger>
                <TabsTrigger value="admin" className="font-semibold text-[#284b3e]">
                  Admin
                </TabsTrigger>
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
      </div>
    </div>
  );
}
