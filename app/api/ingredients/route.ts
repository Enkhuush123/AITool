import { NextResponse, NextRequest } from "next/server";
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});
export type IngredientsResponse = {
  title: string;
  description: string;
  ingredients: [];
};
export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        {
          error: "No text provided",
        },
        {
          status: 400,
        }
      );
    }

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        text: ` You will receive a food description: "${text}"
        Return ONLY a clean JSON in the format: 
        {
        "title: "Short readable food name",
        "description: "1-2 sentence explanation about the dish",
        "ingredients: ["ingdredients1", "ingredients2", "ingredients3"]
        }
              Do NOT include markdown fences. Do NOT include extra text`,
      },
    });

    const raw = response.text;
    let data: IngredientsResponse = {
      title: "",
      description: "",
      ingredients: [],
    };

    if (raw) {
      try {
        const cleaned = raw.replace(/```json\s*([\s\S]*?)\s*```/, "$1").trim();
        const parsed = JSON.parse(cleaned);
        data = parsed;
      } catch (e) {
        return NextResponse.json(
          { error: "Failed to parse response as JSON", raw },
          { status: 500 }
        );
      }
    }
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      {
        errro: err instanceof Error ? err.message : "server error",
      },
      {
        status: 500,
      }
    );
  }
}
