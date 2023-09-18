import { readdir, unlink, stat, readFile } from "fs/promises";
import { NextResponse, NextRequest } from "next/server";
import { pdfUploadFolder } from "../../upload/route";

import PDFParser from "pdf2json";

export async function GET(
  req: NextRequest,
  { params }: { params: { pdfName: string } }
) {
  console.log(params.pdfName);
  const fileNameToDelete = String(params.pdfName);

  if (!params.pdfName) {
    let error_response = {
      status: "error",
      message: `File not valid`,
    };

    return new NextResponse(JSON.stringify(error_response), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  // check if the file exists

  return await stat(pdfUploadFolder + "/" + fileNameToDelete)
    .then(async (stats) => {
      if (stats.isFile()) {
        console.log("The path is a file");

        const data = new Promise((resolve, reject) => {
          const pdfParser = new (PDFParser as any)(null, 1);
          pdfParser.on("pdfParser_dataError", (errData: unknown) => {
            reject(errData);
          });
          pdfParser.on("pdfParser_dataReady", async () => {
            // write into a json file
            // fs.writeFile(pdfUploadFolder + "/" + "he.json", JSON.stringify(pdfParser.getRawTextContent()), () => {
            //   console.log("Done.");
            // });

            resolve((pdfParser as any).getRawTextContent());
          });
          return pdfParser.loadPDF(pdfUploadFolder + "/" + fileNameToDelete);
        });

        console.log(await data);

        return NextResponse.json(JSON.parse(JSON.stringify(await data)));
      }
    })
    .catch((err) => {
      console.log(err.message);
      let error_response = {
        status: "error",
        message: `File name: ${fileNameToDelete},does not exist:  ${err.message}`,
      };

      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    });
}

export async function DELETE(
  req: Request,
  { params }: { params: { pdfName: string } }
) {
  // const files = await fetch(`http://localhost:3000/api/v1/files/${params.slug}`);

  if (!params.pdfName) {
    let error_response = {
      status: "error",
      message: `File not valid`,
    };

    return new NextResponse(JSON.stringify(error_response), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const fileNameToDelete = String(params.pdfName);

  return await stat(pdfUploadFolder + "/" + fileNameToDelete)
    .then((stats) => {
      if (stats.isFile()) {
        console.log("The path is a file");

        unlink(pdfUploadFolder + "/" + fileNameToDelete);
        console.log(`${fileNameToDelete} has been deleted.`);

        return NextResponse.json({ success: "File deleted" });
      }
    })
    .catch((err) => {
      let error_response = {
        status: "error",
        message: `File not found: ${fileNameToDelete}, ${err}`,
      };

      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    });
}
