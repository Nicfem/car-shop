import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params: { file } }: { params: { file: string } },
) {
  const filePath = path.join(process.cwd(), "public", file);

  try {
    const fileBuffer = await readFile(filePath);

    const mimeType = "image/jpg";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": mimeType,
      },
    });
  } catch (error) {
    return new NextResponse("File not found", { status: 404 });
  }
}
