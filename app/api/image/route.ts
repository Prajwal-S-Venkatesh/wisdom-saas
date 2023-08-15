import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!config.apiKey) {
      return new NextResponse("OpenAI API key not configured!", {
        status: 500,
      });
    }

    const body = await request.json();
    const { prompt, amount = "1", resolution = "512x512" } = body;

    if (!prompt) {
      return new NextResponse("A prompt is required!", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("An amount is required!", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("A resolution is required!", { status: 400 });
    }

    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return new NextResponse("Free trial limit reached!", { status: 403 });
    }

    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    await increaseApiLimit();

    const result = await response.json();

    return NextResponse.json(result.data);
  } catch (error) {
    console.error("[IMAGE_ERROR]", error);
    return new NextResponse("Internal Server Error...", { status: 500 });
  }
}
