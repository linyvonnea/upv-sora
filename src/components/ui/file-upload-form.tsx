import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function FileUploadForm() {
  return (
    <div className="space-y-2 text-sm">
      <Label htmlFor="file" className="text-sm font-medium">
        File
      </Label>
      <Input id="file" type="file" placeholder="File" accept="image/*" />
    </div>
  );
}
