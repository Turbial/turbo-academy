import { NextRequest, NextResponse } from "next/server";
import { getLessonByDay } from "@/data/curriculum-loader";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const TTS_VOICE = process.env.TTS_VOICE || "nova"; // Nova: warm, natural female voice
const TTS_MODEL = "tts-1"; // tts-1-hd for higher quality

export async function POST(req: NextRequest) {
  try {
    const { day } = await req.json();
    const lesson = getLessonByDay(day);

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    if (!lesson.audioPrompt) {
      return NextResponse.json({ error: "No audio prompt for this lesson" }, { status: 400 });
    }

    if (!OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

    // Generate TTS audio
    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: TTS_MODEL,
        voice: TTS_VOICE,
        input: lesson.audioPrompt,
        speed: 1.0,
        response_format: "mp3",
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("TTS API error:", err);
      return NextResponse.json({ error: "TTS generation failed" }, { status: 500 });
    }

    // Return audio directly
    const audioBuffer = await response.arrayBuffer();
    const base64Audio = Buffer.from(audioBuffer).toString("base64");

    return NextResponse.json({
      day,
      audioBase64: base64Audio,
      format: "mp3",
      voice: TTS_VOICE,
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Audio generation error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
