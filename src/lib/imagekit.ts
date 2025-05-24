// src/lib/imagekit.ts
import ImageKit from "imagekit";

export const imagekit = new ImageKit({
  publicKey: "public_1fxuVUUGABnaryoSMj/JQhgpJQU=",
  privateKey: "private_dc9/rfY4ptve05YDSPFvam7fYs4=",
  urlEndpoint: "https://ik.imagekit.io/upvsora",
});

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