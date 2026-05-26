import { NextRequest, NextResponse } from "next/server";
import { getLessonByDay } from "@/data/curriculum-loader";

// DeepSeek or OpenAI-compatible endpoint
const AI_API_KEY = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY || "";
const AI_BASE_URL = process.env.DEEPSEEK_API_KEY
  ? "https://api.deepseek.com/v1"
  : "https://api.openai.com/v1";
const AI_MODEL = process.env.DEEPSEEK_API_KEY
  ? "deepseek-chat"
  : "gpt-4o";

export async function POST(req: NextRequest) {
  try {
    const { day } = await req.json();
    const lesson = getLessonByDay(day);

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    if (!lesson.readingPrompt) {
      return NextResponse.json({ error: "No reading prompt for this lesson" }, { status: 400 });
    }

    if (!AI_API_KEY) {
      return NextResponse.json({ error: "AI API key not configured" }, { status: 500 });
    }

    const response = await fetch(`${AI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You write educational deep-dive guides for an AI operator training program called Turbo Academy. Write in clear, engaging English. Use markdown formatting. Include practical examples, analogies, and actionable takeaways. Target audience: beginners to intermediate AI users. Structure: introduction, core concepts (numbered sections), practical exercise, key takeaways.",
          },
          {
            role: "user",
            content: lesson.readingPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 3000,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("AI API error:", err);
      return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: "No content generated" }, { status: 500 });
    }

    return NextResponse.json({
      day,
      content,
      model: AI_MODEL,
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Reading generation error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
