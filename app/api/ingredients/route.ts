import { NextResponse, NextRequest } from "next/server";
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});
export type IngredientsList = string[];
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
        text: ` I will give you a food name: "${text}".
        Extract ONLY the list of ingredients for this food. 
              Return strictly a JSON array like:
[*"egg", "milk", "flour"]`,
      },
    });

    const raw = response.text;
    let ingredients: string[] = [];

    if (raw) {
      try {
        const cleaned = raw.replace(/```json\s*([\s\S]*?)\s*```/, "$1").trim();
        const parsed = JSON.parse(cleaned);
        if (Array.isArray(parsed)) {
          ingredients = parsed;
        }
      } catch (e) {
        return NextResponse.json(
          { error: "Failed to parse response as JSON", raw },
          { status: 500 }
        );
      }
    }
    return NextResponse.json({ ingredients });
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
