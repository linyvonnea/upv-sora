"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface EditNameDialogProps {
  value: string;
  onSave: (newName: string) => void;
}

export function EditNameDialog({ value, onSave }: EditNameDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(value);

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Organization name cannot be empty.", {
        style: { background: "#ffe5e5", color: "#8E1537" },
      });
      return;
    }
    onSave(name);
    toast.success("Organization name updated successfully!", {
      style: { background: "#e6fbe9", color: "#0c4a1f" },
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center justify-between cursor-pointer border rounded-md px-4 py-3 hover:bg-muted">
          <div>
            <p className="text-sm text-muted-foreground">Organization Name</p>
            <p className="text-sm font-medium text-foreground">{value}</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Organization Name</DialogTitle>
          <DialogDescription>
            Change your organization name as it appears to others.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter new name"
          />
        </div>
        <DialogFooter>
          <Button
            onClick={handleSave}
            className="bg-[#284b3e] hover:bg-[#284b3e]/90"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
