import {
  streamText,
  convertToModelMessages,
  UIMessage,
} from "ai";
import { groq } from "@ai-sdk/groq";

export const maxDuration = 30;

const systemPrompt = `You are an expert API consultant and developer assistant.

Help developers find the best APIs.
Give structured, clear answers with examples.`;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: systemPrompt,

      // ✅ THIS handles parts[] automatically
      messages: await convertToModelMessages(messages),

    });

    // ✅ THIS is REQUIRED for useChat
    return result.toUIMessageStreamResponse();

  } catch (error) {
    console.error("API ERROR:", error);

    return new Response("Error", { status: 500 });
  }
}