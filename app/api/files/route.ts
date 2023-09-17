import { readdir } from "fs/promises";
import { NextResponse } from "next/server";
import { pdfUploadFolder } from "../upload/route";

export async function GET(req: Request) {
  const pdfFiles = await readdir(pdfUploadFolder);

  if (!pdfFiles) {
    return NextResponse.error();
  }

  pdfFiles.map((file) => {
    console.log(file);
  });

  return NextResponse.json(pdfFiles);
}
