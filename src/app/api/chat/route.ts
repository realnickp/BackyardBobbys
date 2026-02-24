import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function buildSystemPrompt(userInfo?: {
  name: string;
  phone: string;
  email?: string;
  service: string;
}) {
  const base = `You are Max, the friendly digital assistant for Backyard Bobby's — a licensed outdoor construction company in Maryland (MHIC #05-163777). Bobby's team builds decks, patios, pergolas, fences, driveways, retaining walls, stamped concrete, gravel pads, and more across Anne Arundel County and surrounding areas.

YOUR GOAL: Have a helpful, natural conversation that learns about their project so Bobby can give them the best possible estimate. You want them to feel heard and understood — then guide them toward scheduling a free on-site estimate.

CONVERSATION FLOW:
1. First message: Greet them warmly, acknowledge their project type, and ask about what they have in mind (size, area, style — whatever fits the service).
2. Next 2–3 messages: Ask helpful follow-up questions ONE at a time. Good questions include:
   - Roughly how big is the area / how many square feet?
   - Do you have a style or material preference?
   - What's the space like now — flat yard, slope, existing structure?
   - Is there a timeline you're working toward?
   - Have you gotten any other quotes?
3. After gathering a few details (3–5 exchanges): Naturally transition to booking. Say something like "This sounds like a great project — Bobby would love to take a look and get you an exact number. Want me to have him reach out to set up a free estimate?"
4. If they say yes: Confirm Bobby will reach out within one business day, thank them warmly, and wrap up.
5. If they keep chatting after you've suggested the call: Answer their question helpfully, then circle back to booking gently.

RULES:
- Keep responses to 2–3 sentences. Conversational but not long-winded.
- NEVER ask more than ONE question per message.
- Do NOT ask for name, phone, email, or service — you already have all of that.
- Be warm, knowledgeable, and confident — like a helpful friend who knows construction.
- If they seem hesitant about booking, remind them: the estimate is 100% free, no obligation, no pressure.
- Financing is available if cost comes up — mention it casually.
- Don't rush them, but don't let the conversation go in circles either.

PRICING (only if directly asked — keep it brief):
- Decks: $8k–$30k+ · Patios/Stamped Concrete: $5k–$20k+ · Fences: $3k–$12k+
- Driveways: $2k–$15k+ · Retaining Walls: $4k–$20k+
- Always say "exact pricing depends on your specific setup — that's why Bobby likes to come take a look."

If they ask about availability, timeline, materials, or anything really detailed: Give a brief, helpful answer from what you know, then add "Bobby can go deeper on that when he sees your space."

After 6–7 exchanges without booking, gently wrap up: "I don't want to keep you — let me have Bobby give you a call. He'll have all the answers and can get you a real number."`;


  if (userInfo) {
    return (
      base +
      `\n\nIMPORTANT — You already have this visitor's contact info. DO NOT ask for their name, phone, or email again:
- Name: ${userInfo.name}
- Phone: ${userInfo.phone}${userInfo.email ? `\n- Email: ${userInfo.email}` : ""}
- Interested in: ${userInfo.service}

Greet ${userInfo.name} by name in your first message and jump straight into asking about their ${userInfo.service} project. Make them feel like you're already invested in their specific project.`
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
    return NextResponse.json({ error: "OpenAI not configured" }, { status: 503 });
  }

  const { messages, leadId, userInfo } = await request.json();

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
}
