// src/components/ui/FilePreviewModal.tsx

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface FilePreviewModalProps {
  title: string; 
  url: string;
  onClose: () => void;
}

export function FilePreviewModal({ title, url, onClose }: FilePreviewModalProps) {
  const fileName = title || "Preview";

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-full">
        <DialogTitle className="text-xl font-bold">{fileName}</DialogTitle>
        <div className="aspect-video w-full border rounded overflow-hidden">
          <iframe
            src={url}
            className="w-full h-full"
            frameBorder="0"
            title={fileName}
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}