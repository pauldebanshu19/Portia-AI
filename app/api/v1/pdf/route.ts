import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const { driveLink } = await req.json();

    if (!driveLink || !driveLink.includes("drive.google.com")) {
      return NextResponse.json({ error: "Invalid Google Drive link." }, { status: 400 });
    }

    const fileIdMatch = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)\/view/);
    if (!fileIdMatch || fileIdMatch.length < 2) {
      return NextResponse.json({ error: "Unable to extract file ID from the link." }, { status: 400 });
    }

    const fileId = fileIdMatch[1];
    const downloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`;

    const response = await fetch(downloadLink);
    if (!response.ok) {
      throw new Error("Failed to fetch the PDF from the provided link.");
    }

    const pdfBuffer = await response.arrayBuffer();
    const pdfBase64 = Buffer.from(pdfBuffer).toString("base64");

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-thinking-exp-1219" });

    const result = await model.generateContent([
      {
        inlineData: {
          data: pdfBase64,
          mimeType: "application/pdf",
        },
      },
      "Provide a grade values clarity, coherence, and engagement for the writing context on a scale of 1 to 100 , keep it  short and precise .",
    ]);

    const summary = result.response.text();

    // Extract only numeric values
    const numericValues = summary.match(/\d+/g) || [];

    return NextResponse.json({ numericValues }, { status: 200 });
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

