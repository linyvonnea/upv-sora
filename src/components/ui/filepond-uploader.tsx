// src/components/ui/filepond-uploader.tsx
"use client";

import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import type { FilePondInitialFile } from "filepond";

import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileEncode);

interface FilePondUploaderProps {
  onUpload: (data: { url: string; size: number }) => void;
  onRemove?: () => void;
  initialUrl?: string;
}

export function FilePondUploader({ onUpload, onRemove, initialUrl }: FilePondUploaderProps) {
  const [files, setFiles] = useState<FilePondInitialFile[]>(
    initialUrl
      ? [
          {
            source: initialUrl,
            options: { type: "local" },
          },
        ]
      : []
  );

  return (
    <FilePond
      files={files}
      onupdatefiles={(items) => {
        setFiles(items as unknown as FilePondInitialFile[]);
      }}
      onremovefile={() => {
        if (onRemove) onRemove();
      }}
      allowMultiple={false}
      maxFiles={1}
      acceptedFileTypes={["application/pdf"]}
      labelIdle='Drag & Drop your PDF or <span class="filepond--label-action">Browse</span>'
      name="file"
      server={{
        process: {
          url: "/api/upload",
          method: "POST",
          onload: (res) => {
            const parsed = JSON.parse(res);
            onUpload({ url: parsed.url, size: parsed.size });
            return parsed.url;
          },
          onerror: (err) => {
            console.error("Upload error:", err);
            return "Upload failed";
          },
        },
      }}
    />
  );
}
