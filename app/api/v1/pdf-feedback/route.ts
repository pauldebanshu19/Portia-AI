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
      "Provide a summary based on the context and categorize them into a brief summary, strengths, improvements, next steps, and suggestions, keep it  short and precise.",
    ]);

    const summaryText = result.response.text();
    console.log("Raw Summary Text:", summaryText);

    // Define our categories with empty content
    const categories: { 
      briefSummary: string; 
      strengths: string; 
      improvements: string; 
      nextSteps: string; 
      suggestions: string; 
    } = {
      briefSummary: "",
      strengths: "",
      improvements: "",
      nextSteps: "",
      suggestions: "",
    };

    // Mapping from header text (in lowercase, without asterisks) to our keys
    const headerMap: Record<string, keyof typeof categories> = {
      "brief summary": "briefSummary",
      "strengths": "strengths",
      "improvements": "improvements",
      "next steps": "nextSteps",
      "suggestions": "suggestions",
    };

    // Split the text into lines
    const lines = summaryText.split(/\n/);
    let currentCategory: keyof typeof categories | null = null;

    for (const line of lines) {
      // Remove asterisks and trim the line
      const cleanedLine = line.replace(/\*/g, "").trim();
      // Check if the cleaned line starts with any of our known headers
      let foundHeader = false;
      for (const header in headerMap) {
        if (cleanedLine.toLowerCase().startsWith(header)) {
          currentCategory = headerMap[header];
          // Extract content after the colon (if any)
          const colonIndex = cleanedLine.indexOf(":");
          if (colonIndex !== -1 && colonIndex < cleanedLine.length - 1) {
            categories[currentCategory] += cleanedLine.substring(colonIndex + 1).trim() + " ";
          }
          foundHeader = true;
          break;
        }
      }
      // If no new header is found and we have an active category, append the line
      if (!foundHeader && currentCategory) {
        categories[currentCategory] += line.trim() + " ";
      }
    }

    // Trim the content of each category
    Object.keys(categories).forEach((key) => {
      const typedKey = key as keyof typeof categories;
      categories[typedKey] = categories[typedKey].trim();
    });

    console.log("Categorized Data:", categories);

    // Send categorized data to the frontend
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
