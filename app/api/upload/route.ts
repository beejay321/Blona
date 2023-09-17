import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
const randomID = randomUUID();

export const pdfUploadFolder = join(process.cwd(), "public/files/pdfs");

export async function POST(req: Request) {
  const data = await req.formData();
  console.log(data);

  const dataName = String(data.get("pdf-file"));

  console.log(dataName);

  const file = data.get("pdf-file") as unknown as File;

  if (!file) {
    return NextResponse.json({
      success: false,
      message: "File not found or Uploaded",
    });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const pathDir = join(pdfUploadFolder, `${randomID}-${file.name}`);

  console.log(pathDir);

  await writeFile(pathDir, buffer);

  console.log(`open ${pathDir} to view file`);

  return NextResponse.json({ success: true, message: pathDir });
}
