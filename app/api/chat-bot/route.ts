import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                "Please answer in clean, structured Markdwon format." +
                "Use clear titles (##), bullet points, and short paragraphs.\n\n" +
                message,
            },
          ],
        },
      ],
    });

    const reply =
      result.response?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text || "")
        .join(" ")
        .trim() || "No response";

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("Chat API Error:", err);
    return NextResponse.json(
      { error: err?.message || "FAILED" },
      { status: 500 }
    );
  }
}
