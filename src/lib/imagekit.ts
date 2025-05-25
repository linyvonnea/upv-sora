// src/lib/imagekit.ts

export async function uploadFileToServer(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("Upload failed:", data.error);
    return null;
  }

  return data.url; // public ImageKit URL
}