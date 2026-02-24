import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { requireAuth } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: Params) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const { content, author } = await request.json();

    if (!content || typeof content !== "string") {
      return NextResponse.json({ error: "Note content required" }, { status: 400 });
    }

    const safeContent = content.slice(0, 10000);
    const safeAuthor = typeof author === "string" ? author.slice(0, 100) : "Admin";

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("lead_notes")
      .insert({ lead_id: id, content: safeContent, author: safeAuthor })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ note: data });
  } catch (err) {
    console.error("POST /api/leads/:id/notes error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: Params) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("lead_notes")
      .select("*")
      .eq("lead_id", id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ notes: data });
  } catch (err) {
    console.error("GET /api/leads/:id/notes error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
