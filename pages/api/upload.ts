// pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import ImageKit from "imagekit";

export const config = {
  api: {
    bodyParser: false,
  },
};

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const form = formidable({ multiples: false, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err || !files.file) {
      return res.status(500).json({ error: "File parsing failed" });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    try {
      const buffer = fs.readFileSync(file.filepath);
      const uploaded = await imagekit.upload({
        file: buffer,
        fileName: file.originalFilename || `${uuidv4()}.pdf`,
      });

      res.status(200).json({ url: uploaded.url, size: file.size });
    } catch (uploadErr) {
      console.error("Upload error:", uploadErr);
      res.status(500).json({ error: "Upload failed" });
    }
  });
}
