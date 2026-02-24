import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const { content, author } = await request.json();

    if (!content) {
      return NextResponse.json({ error: "Note content required" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("lead_notes")
      .insert({ lead_id: id, content, author: author || "Admin" })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ note: data });
  } catch (err) {
    const error = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(_req: NextRequest, { params }: Params) {
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
    const error = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error }, { status: 500 });
  }
}
