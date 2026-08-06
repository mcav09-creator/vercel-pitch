"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

const STARTER_PROMPTS = [
  "How would you approach REA Group?",
  "Walk me through your MEDDPICC on the K-12 deal",
  "Why Vercel over staying technical-adjacent at monō ai?",
  "What's your honest gap for this role?",
];

export function ChatPanel({ aiConfigured }: { aiConfigured: boolean }) {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  if (!aiConfigured) {
    return (
      <div className="card flex min-h-[320px] flex-col items-center justify-center gap-3 p-8 text-center">
        <p className="section-label">Chat disabled in this deployment</p>
        <p className="max-w-sm text-sm text-muted">
          This panel runs on the Vercel AI SDK, routed through AI Gateway. Add an{" "}
          <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs">
            AI_GATEWAY_API_KEY
          </code>{" "}
          to the project&apos;s environment variables to enable a live, grounded
          conversation.
        </p>
      </div>
    );
  }

  const submit = (text: string) => {
    if (!text.trim()) return;
    sendMessage({ text });
    setInput("");
  };

  return (
    <div className="card flex min-h-[420px] flex-col overflow-hidden">
      <div className="chat-scroll flex-1 space-y-4 overflow-y-auto p-5">
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {STARTER_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => submit(prompt)}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted transition hover:border-border-hover hover:text-foreground"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className="text-sm leading-relaxed">
            <span
              className={`font-mono text-xs ${
                message.role === "user" ? "text-accent-dim" : "text-foreground"
              }`}
            >
              {message.role === "user" ? "you" : "matt"}
            </span>
            <div className="mt-1 whitespace-pre-wrap text-foreground">
              {message.parts.map((part, i) =>
                part.type === "text" ? <span key={i}>{part.text}</span> : null,
              )}
            </div>
          </div>
        ))}

        {(status === "submitted" || status === "streaming") && (
          <div className="font-mono text-xs text-accent-dim">
            matt is typing<span className="animate-pulse">…</span>
          </div>
        )}

        {error && (
          <div className="text-xs text-red-400">
            Something went wrong. Try again in a moment.
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
        className="flex items-center gap-2 border-t border-border p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={status !== "ready"}
          placeholder="Ask about a deal, an account, or the gap..."
          className="flex-1 bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-accent-dim focus:outline-none"
        />
        <button
          type="submit"
          disabled={status !== "ready" || !input.trim()}
          className="rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  );
}
