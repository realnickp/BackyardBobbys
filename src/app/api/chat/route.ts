import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Limits to prevent API abuse
const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function sanitizeString(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  // Strip null bytes and limit length
  return value.replace(/\0/g, "").slice(0, maxLen);
}

function buildSystemPrompt(userInfo?: {
  name: string;
  phone: string;
  email?: string;
  service: string;
}) {
  const base = `You are Max, the friendly digital assistant for Backyard Bobby's — a licensed outdoor construction company in Maryland (MHIC #05-163777). Bobby's team builds decks, patios, pergolas, fences, driveways, retaining walls, stamped concrete, gravel pads, and more across Anne Arundel County and surrounding areas.

YOUR #1 GOAL: Get the visitor to agree to a free estimate call from Bobby. Every response should move closer to that. Do NOT go on a long fact-finding mission — Bobby handles the details on the call.

CONVERSATION FLOW (keep it to 3–4 exchanges MAX before pushing for the call):
1. First message: Greet them, acknowledge their project, ask ONE quick qualifying question (size OR timeline — not both).
2. Second message: React to their answer, give a brief helpful insight, then pitch the free estimate: "Bobby can give you an exact number after a quick look at your space — want me to have him reach out today?"
3. If they keep chatting: Answer briefly, then gently redirect back to booking. Say things like "That's a great question — Bobby can walk you through that on the call. He's really good at explaining options in person."
4. If they say yes to the call: Confirm Bobby will reach out soon, thank them, and wrap up.

RULES:
- Keep responses to 1–2 sentences. Short and punchy.
- NEVER ask more than ONE question at a time.
- Do NOT ask for name, phone, email, or service — you already have all of that.
- Do NOT keep drilling into project specs. Ask 1–2 questions max, then push to book.
- Be warm and confident, not salesy or desperate.
- If they seem hesitant, remind them: estimate is 100% free, no obligation, no pressure.
- Financing is available if cost comes up — mention it casually.

PRICING (only if directly asked — keep it brief):
- Decks: $8k–$30k+ · Patios/Stamped Concrete: $5k–$20k+ · Fences: $3k–$12k+
- Driveways: $2k–$15k+ · Retaining Walls: $4k–$20k+
- Always say "exact pricing depends on your specific setup — that's why Bobby likes to see the space first."

If they ask about availability, timeline, materials, or anything detailed: "Bobby covers all of that on the estimate call — he's really thorough."

NEVER let the conversation drag past 5–6 exchanges without firmly saying something like: "I want to make sure I'm not holding you up — let me have Bobby reach out. He'll have answers to all of this."`;


  if (userInfo) {
    // Sanitize user-supplied fields before interpolating into the system prompt
    const safeName = sanitizeString(userInfo.name, 200);
    const safePhone = sanitizeString(userInfo.phone, 30);
    const safeEmail = userInfo.email ? sanitizeString(userInfo.email, 254) : "";
    const safeService = sanitizeString(userInfo.service, 100);

    return (
      base +
      `\n\nIMPORTANT — You already have this visitor's contact info. DO NOT ask for their name, phone, or email again:
- Name: ${safeName}
- Phone: ${safePhone}${safeEmail ? `\n- Email: ${safeEmail}` : ""}
- Interested in: ${safeService}

Greet ${safeName} by name in your first message and jump straight into asking about their ${safeService} project. Make them feel like you're already invested in their specific project.`
    );
  }

  return base;
}

// Extract structured fields from the conversation and save them to the lead
async function extractAndSaveLead(
  leadId: string,
  messages: { role: string; content: string }[]
) {
  try {
    const supabase = getSupabaseAdmin();

    // Build plain transcript for context
    const transcript = messages
      .filter((m) => m.role !== "system")
      .map((m) => `${m.role === "user" ? "Visitor" : "Max"}: ${m.content}`)
      .join("\n\n");

    // Run extraction in parallel with transcript save
    const [extractionResult] = await Promise.all([
      openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You extract structured lead information from a sales chat transcript.
Return a JSON object with ONLY the fields that were clearly mentioned in the conversation.
Fields to extract (omit any not mentioned):
- city_or_zip: string — their city, town, or zip code in Maryland
- description: string — detailed summary of the project they want (size, materials, features, conditions)
- budget: string — budget range if mentioned (e.g. "under $10k", "$15,000–$20,000")
- timeframe: string — when they want the project done (e.g. "this spring", "ASAP", "next summer")

Rules:
- Only include fields explicitly mentioned in the conversation
- Make description comprehensive — combine ALL project details into one clear paragraph
- Return {} if nothing extractable
- Return only valid JSON, no explanation`,
          },
          {
            role: "user",
            content: transcript,
          },
        ],
        response_format: { type: "json_object" },
        max_tokens: 300,
        temperature: 0,
      }),
      // Save transcript immediately
      supabase
        .from("leads")
        .update({ chat_transcript: transcript, updated_at: new Date().toISOString() })
        .eq("id", leadId),
    ]);

    // Parse extracted fields and update lead
    const extracted = JSON.parse(
      extractionResult.choices[0].message.content || "{}"
    );

    if (Object.keys(extracted).length > 0) {
      await supabase
        .from("leads")
        .update({ ...extracted, updated_at: new Date().toISOString() })
        .eq("id", leadId);
    }
  } catch {
    // Non-critical
  }
}

export async function POST(request: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "Chat not available" }, { status: 503 });
  }

  try {
    const body = await request.json();

    // Validate messages array
    if (!Array.isArray(body.messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Enforce message count limit
    if (body.messages.length > MAX_MESSAGES) {
      return NextResponse.json({ error: "Conversation too long" }, { status: 400 });
    }

    // Sanitize each message
    const messages: { role: string; content: string }[] = body.messages
      .filter(
        (m: unknown) =>
          m !== null &&
          typeof m === "object" &&
          typeof (m as Record<string, unknown>).role === "string" &&
          typeof (m as Record<string, unknown>).content === "string"
      )
      .map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: sanitizeString(m.content, MAX_MESSAGE_LENGTH),
      }));

    // Validate leadId if provided (must be a UUID)
    const leadId: string | null =
      typeof body.leadId === "string" && UUID_RE.test(body.leadId)
        ? body.leadId
        : null;

    // Sanitize userInfo fields before passing to system prompt
    const userInfo =
      body.userInfo && typeof body.userInfo === "object"
        ? {
            name: sanitizeString(body.userInfo.name, 200),
            phone: sanitizeString(body.userInfo.phone, 30),
            email: sanitizeString(body.userInfo.email, 254),
            service: sanitizeString(body.userInfo.service, 100),
          }
        : undefined;

    const systemPrompt = buildSystemPrompt(userInfo);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      max_tokens: 300,
      temperature: 0.7,
    });

    const reply = response.choices[0].message.content || "";

    // Save transcript + extract structured fields in background after every exchange
    const allMessages = [...messages, { role: "assistant", content: reply }];
    if (leadId) {
      extractAndSaveLead(leadId, allMessages).catch(() => {});
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("POST /api/chat error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
