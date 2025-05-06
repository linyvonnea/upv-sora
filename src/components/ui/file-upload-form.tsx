import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function FileUploadForm() {
  return (
    <div className="flex items-center gap-4">
      {/* File Upload */}
      <div className="flex flex-col space-y-2 text-sm w-40">
        <Input id="file" type="file" placeholder="Upload File" />
      </div>

      <div className="text-gray-500 text-sm font-medium">OR</div>

      {/* Link Upload */}
      <div className="flex flex-col space-y-2 text-sm w-40">
        <Input id="link" type="url" placeholder="Paste URL" />
      </div>
    </div>
  );
}
