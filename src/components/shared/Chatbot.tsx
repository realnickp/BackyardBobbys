"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, ChevronRight } from "lucide-react";

type Phase = "idle" | "form" | "chat";

interface UserInfo {
  name: string;
  phone: string;
  email: string;
  service: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SERVICES = [
  "Deck",
  "Patio / Stamped Concrete",
  "Fence",
  "Driveway / Gravel",
  "Pergola / Shade Structure",
  "Retaining Wall",
  "Something else",
];

function openingMessage(name: string, service: string): Message {
  const first = name.split(" ")[0];
  const serviceMap: Record<string, string> = {
    "Deck": "a deck",
    "Patio / Stamped Concrete": "a patio or stamped concrete",
    "Fence": "a fence",
    "Driveway / Gravel": "a driveway or gravel pad",
    "Pergola / Shade Structure": "a pergola",
    "Retaining Wall": "a retaining wall",
  };
  const project = serviceMap[service] || service.toLowerCase();
  return {
    role: "assistant",
    content: `Hey ${first}! Great choice — Bobby does amazing work on ${project} projects. Are you looking to get started soon, or still in the planning phase?`,
  };
}

export function Chatbot() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: "", phone: "", email: "", service: "" });
  const [customService, setCustomService] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [leadId, setLeadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (phase === "form") setTimeout(() => nameRef.current?.focus(), 100);
    if (phase === "chat") setTimeout(() => inputRef.current?.focus(), 100);
  }, [phase]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatLoading]);

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    const service = userInfo.service === "Something else" ? customService : userInfo.service;
    if (!userInfo.name.trim() || !userInfo.phone.trim() || !service.trim()) {
      setFormError("Please fill in your name, phone, and what you're interested in.");
      return;
    }

    setFormLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userInfo.name.trim(),
          phone: userInfo.phone.trim(),
          email: userInfo.email.trim() || undefined,
          service,
          source: "chatbot",
          message: `Chatbot lead — interested in: ${service}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Something went wrong. Please try again.");
        return;
      }

      if (data.leadId) setLeadId(data.leadId);

      const resolvedInfo = { ...userInfo, service };
      setMessages([openingMessage(resolvedInfo.name, resolvedInfo.service)]);
      setUserInfo(resolvedInfo);
      setPhase("chat");
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setFormLoading(false);
    }
  }

  async function sendMessage(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || chatLoading) return;

    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setChatLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          leadId,
          userInfo: {
            name: userInfo.name,
            phone: userInfo.phone,
            email: userInfo.email || undefined,
            service: userInfo.service,
          },
        }),
      });

      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. You can reach Bobby directly at (443) 875-8550.",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function close() {
    setPhase("idle");
  }

  const panelOpen = phase === "form" || phase === "chat";

  return (
    <>
      {/* Panel */}
      {panelOpen && (
        <div
          className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          style={{ height: phase === "form" ? "auto" : "min(520px, calc(100dvh - 7rem))" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-orange-500 text-white shrink-0">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold select-none">
              M
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm leading-tight">Max</p>
              <p className="text-xs text-orange-100 leading-tight">Backyard Bobby&apos;s Assistant</p>
            </div>
            {phase === "chat" && leadId && (
              <span className="text-xs bg-green-400 text-green-900 font-semibold px-2 py-0.5 rounded-full shrink-0">
                ✓ Bobby notified
              </span>
            )}
            <button
              onClick={close}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* PRE-CHAT FORM */}
          {phase === "form" && (
            <form onSubmit={handleFormSubmit} className="p-4 space-y-3">
              <p className="text-sm text-gray-600">
                Quick intro before we chat — Bobby&apos;s team will reach out to confirm your estimate.
              </p>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Your name *</label>
                <input
                  ref={nameRef}
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo((p) => ({ ...p, name: e.target.value }))}
                  placeholder="First and last name"
                  required
                  className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Phone number *</label>
                <input
                  ref={phoneRef}
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="(443) 000-0000"
                  required
                  className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Email <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo((p) => ({ ...p, email: e.target.value }))}
                  placeholder="you@email.com"
                  className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  What are you interested in? *
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {SERVICES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setUserInfo((p) => ({ ...p, service: s }))}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-colors ${
                        userInfo.service === s
                          ? "bg-orange-500 text-white border-orange-500"
                          : "border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {userInfo.service === "Something else" && (
                  <input
                    type="text"
                    value={customService}
                    onChange={(e) => setCustomService(e.target.value)}
                    placeholder="Tell us what you have in mind..."
                    className="mt-2 w-full text-sm px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    autoFocus
                  />
                )}
              </div>

              {formError && (
                <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{formError}</p>
              )}

              <button
                type="submit"
                disabled={formLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-60"
              >
                {formLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Chat with Max <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-gray-400">
                Free estimate · No obligation · Licensed MHIC #05-163777
              </p>
            </form>
          )}

          {/* CHAT */}
          {phase === "chat" && (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-orange-500 text-white rounded-br-sm"
                          : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-100 shadow-sm px-3 py-2.5 rounded-2xl rounded-bl-sm flex items-center gap-1">
                      <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <form
                onSubmit={sendMessage}
                className="flex items-center gap-2 px-3 py-3 border-t border-gray-100 bg-white shrink-0"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  disabled={chatLoading}
                  className="flex-1 text-sm px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent disabled:opacity-50 bg-gray-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || chatLoading}
                  className="p-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  aria-label="Send"
                >
                  {chatLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </form>

              <p className="text-center text-[10px] text-gray-400 pb-2 bg-white shrink-0">
                Free estimate · No obligation · Licensed MHIC #05-163777
              </p>
            </>
          )}
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setPhase((p) => (p === "idle" ? "form" : "idle"))}
        className="fixed bottom-6 right-4 z-50 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
        aria-label={panelOpen ? "Close chat" : "Chat with us"}
      >
        {panelOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
        {!panelOpen && <span>Have a Question? Ask Max</span>}
      </button>
    </>
  );
}
