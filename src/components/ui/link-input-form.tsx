import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LinkInputForm() {
  return (
    <div className="space-y-2 text-sm">
      <Input id="link" type="url" placeholder="Paste URL" />
    </div>
  );
}
