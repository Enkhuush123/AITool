import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

const HF_TOKEN = process.env.HF_TOKEN || "";
const client = new InferenceClient(HF_TOKEN);

export const POST = async (req: NextRequest) => {
  try {
    const { prompt } = await req.json();
    if (!prompt)
      return NextResponse.json(
        { error: "No prompt provided" },
        { status: 400 }
      );

    const result = await client.textToImage({
      provider: "nscale",
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: prompt,

      binary: true,
    });

    const blob = result as unknown as Blob;
    const arrayBuffer = await blob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUrl = `data:image/png;base64,${base64}`;

    return NextResponse.json({ image: dataUrl });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error" },
      { status: 500 }
    );
  }
};
