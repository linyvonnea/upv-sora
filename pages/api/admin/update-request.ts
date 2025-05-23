// pages/api/admin/update-request.ts
import { NextApiRequest, NextApiResponse } from "next";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id, status, comment, issues, progress, noaFile } = req.body;

  if (!id || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await updateDoc(doc(db, "eventRequests", id), {
      status,
      comment: comment || "",
      issues: issues || [],
      progress: progress || {},
      ...(noaFile && { noaFile }), // only add if defined
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to update request:", error);
    res.status(500).json({ error: "Failed to update request" });
  }
}