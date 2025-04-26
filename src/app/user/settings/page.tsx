"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { EditNameDialog } from "@/components/settings/edit-name-dialog";
import { EditEmailDialog } from "@/components/settings/edit-email-dialog";
import { EditPasswordDialog } from "@/components/settings/edit-password-dialog"; 

export default function UserSettingsPage() {
  const [orgName, setOrgName] = useState("UPV Org Name");
  const [email, setEmail] = useState("org@example.com");
  const [logo, setLogo] = useState("/placeholder-avatar.jpg");
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setLogo(reader.result.toString());
          toast.success("Profile picture updated successfully!", {
            style: { background: "#e6fbe9", color: "#0c4a1f" },
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-8 items-center px-6 pt-20">
      {/* ORG PROFILE CARD */}
      <Card className="w-[720px] p-6">
        <CardHeader>
          <h1 className="text-xl font-semibold">Organization Profile</h1>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-10 items-start">
          {/* Avatar */}
          <div className="relative cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <Avatar className="h-24 w-24">
              <AvatarImage src={logo} />
              <AvatarFallback>UP</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-muted p-1 rounded-full shadow">
              <Camera className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Editable Fields */}
          <div className="flex-1 space-y-4 w-full">
            <EditNameDialog value={orgName} onSave={setOrgName} />
            <EditEmailDialog value={email} onSave={setEmail} />
          </div>
        </CardContent>
      </Card>

      {/* PASSWORD SETTINGS CARD */}
      <Card className="w-[720px] p-6">
        <CardHeader>
          <h2 className="text-lg font-semibold">Password Settings</h2>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div
            onClick={() => setOpenPasswordDialog(true)}
            className="flex items-center justify-between border rounded-md px-6 py-4 hover:bg-muted cursor-pointer w-full"
          >
            <div>
              <p className="text-sm text-muted-foreground">Password</p>
              <p className="text-sm font-medium text-foreground">••••••••</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <EditPasswordDialog open={openPasswordDialog} setOpen={setOpenPasswordDialog} />
        </CardContent>
      </Card>
    </div>
  );
}