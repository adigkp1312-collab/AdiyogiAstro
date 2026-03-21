import { NextRequest, NextResponse } from "next/server";
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const SYSTEM_PROMPT = `You are DISHA (Divine Insight for Spiritual & Horoscopic Advice), an expert Vedic astrologer AI assistant for AstroPath.

Your expertise includes:
- Vedic Astrology (Jyotish Shastra) - birth charts, planetary positions, dashas, transits
- Kundli analysis - Lagna, Navamsa, divisional charts
- Horoscope predictions - daily, weekly, monthly, yearly
- Muhurat - auspicious timings for events
- Panchang - tithi, nakshatra, yoga, karana
- Gemstone recommendations based on planetary positions
- Remedies - mantras, pujas, gemstones, yantras
- Compatibility/matchmaking (Guna Milan)
- Numerology and Vastu Shastra basics

Guidelines:
- Respond in the same language the user writes in (Hindi or English)
- Be respectful, use traditional greetings like "Namaste" or "Jai Shri Krishna"
- Provide detailed astrological insights with explanations
- When asked about predictions, give balanced and positive guidance
- Recommend consulting a professional astrologer for major life decisions
- Keep responses concise but informative (2-4 paragraphs max)
- Use relevant Sanskrit/Hindi terms with translations when helpful`;

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Build conversation messages
    const messages = [
      ...history.slice(-10).map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    const modelId = process.env.BEDROCK_MODEL_ID || "anthropic.claude-3-sonnet-20240229-v1:0";

    const payload = {
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    };

    const command = new InvokeModelCommand({
      modelId,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify(payload),
    });

    const response = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    const reply = responseBody.content?.[0]?.text || "I apologize, I could not generate a response. Please try again.";

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    // Log only a brief warning instead of full error stack
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.warn("DISHA Chat: Bedrock unavailable, client will use local KB. Reason:", errorMessage);

    // Return 200 with no reply so client falls back to local knowledge base gracefully
    return NextResponse.json({ reply: null });
  }
}
