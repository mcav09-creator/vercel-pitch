import {
  streamText,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { gateway } from "@ai-sdk/gateway";
import { openai } from "@ai-sdk/openai";
import { ipAddress } from "@vercel/functions";
import { retrieveChunks, buildSystemPrompt } from "@/lib/rag";
import { checkInProcessRateLimit } from "@/lib/rate-limit";

// Fluid Compute is the default execution model for this project (created
// on Vercel after Fluid became standard), so this route already gets
// warm-instance reuse and Active CPU pricing with no extra config. The one
// thing that actually matters in code: stay on the default Node.js runtime
// rather than `runtime = "edge"` — streaming/SSE works natively on Node.js
// with Fluid Compute, and Edge buys nothing here while losing the AI SDK's
// full Node.js compatibility. maxDuration is generous for a chat response;
// Fluid Compute supports up to 800s on Pro/Enterprise if ever needed.
export const maxDuration = 30;

function resolveModel() {
  // AI Gateway auths via AI_GATEWAY_API_KEY, or falls back to the
  // VERCEL_OIDC_TOKEN that `vercel link` / `vercel env pull` provisions.
  // Either is sufficient, no manual key required once the project is linked.
  if (process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN) {
    return gateway("anthropic/claude-sonnet-5");
  }
  if (process.env.OPENAI_API_KEY) {
    return openai("gpt-5.1");
  }
  return null;
}

export async function POST(req: Request) {
  const key = ipAddress(req) ?? "unknown";
  const { limited } = checkInProcessRateLimit(key);
  if (limited) {
    return new Response("Too many requests, slow down a moment and try again.", {
      status: 429,
      headers: { "Retry-After": "60" },
    });
  }

  const { messages }: { messages: UIMessage[] } = await req.json();

  const model = resolveModel();
  if (!model) {
    return new Response("AI Gateway is not configured for this deployment yet.", {
      status: 503,
    });
  }

  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
  const query = lastUserMessage?.parts
    ?.filter((p) => p.type === "text")
    .map((p) => (p as { text: string }).text)
    .join(" ") ?? "";

  const retrieved = await retrieveChunks(query, 6);

  const result = streamText({
    model,
    system: buildSystemPrompt(retrieved),
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onError: (error) => {
        if (error instanceof Error) return error.message;
        return "Something went wrong generating a response.";
      },
    }),
  });
}
