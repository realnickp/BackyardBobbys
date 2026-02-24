// ============================================================
// LEAD SCORING ALGORITHM — 0 to 100 points
// ============================================================

interface ScoreInput {
  phone?: string;
  email?: string;
  city_or_zip?: string;
  service?: string;
  description?: string;
  timeframe?: string;
  budget?: string;
  source?: string;
  utm_campaign?: string;
  chatbot_qualified?: boolean;
}

interface ScoreResult {
  score: number;
  factors: Record<string, number>;
  priority: "hot" | "warm" | "normal" | "cold";
  label: string;
}

export function calculateLeadScore(lead: ScoreInput): ScoreResult {
  let score = 0;
  const factors: Record<string, number> = {};

  // ── Contact Info (30 pts max) ──────────────────────────
  if (lead.phone && lead.phone.replace(/\D/g, "").length >= 10) {
    score += 15;
    factors.has_phone = 15;
  }
  if (lead.email && lead.email.includes("@")) {
    score += 10;
    factors.has_email = 10;
  }
  if (lead.city_or_zip && lead.city_or_zip.length >= 2) {
    score += 5;
    factors.has_location = 5;
  }

  // ── Project Details (30 pts max) ──────────────────────
  if (lead.service) {
    score += 10;
    factors.has_service = 10;
  }
  if (lead.description && lead.description.length > 20) {
    score += 10;
    factors.detailed_description = 10;
  }
  const timeframe = (lead.timeframe || "").toLowerCase();
  if (timeframe.includes("asap") || timeframe.includes("soon") || timeframe.includes("2 week")) {
    score += 10;
    factors.urgent_timeline = 10;
  } else if (timeframe.includes("month")) {
    score += 5;
    factors.near_term_timeline = 5;
  }

  // ── Budget (25 pts max) ───────────────────────────────
  if (lead.budget) {
    const budget = lead.budget.toLowerCase();
    if (budget.includes("25,000") || budget.includes("50,000") || budget.includes("50k")) {
      score += 25;
      factors.high_budget = 25;
    } else if (budget.includes("10,000") || budget.includes("10k")) {
      score += 18;
      factors.medium_budget = 18;
    } else if (budget.includes("5,000") || budget.includes("5k")) {
      score += 12;
      factors.low_medium_budget = 12;
    } else if (!budget.includes("not sure")) {
      score += 8;
      factors.budget_specified = 8;
    }
  }

  // ── Source Quality (15 pts max) ───────────────────────
  const source = lead.source || "website";
  if (lead.chatbot_qualified) {
    score += 15;
    factors.chatbot_qualified = 15;
  } else if (source === "referral") {
    score += 15;
    factors.referral_source = 15;
  } else if (source === "google_ads") {
    score += 12;
    factors.paid_search = 12;
  } else if (source === "organic") {
    score += 10;
    factors.organic_search = 10;
  } else {
    score += 5;
    factors.direct_source = 5;
  }

  // ── Bonus: Branded campaign ──────────────────────────
  if (lead.utm_campaign && lead.utm_campaign.toLowerCase().includes("brand")) {
    score += 5;
    factors.branded_campaign = 5;
  }

  const finalScore = Math.min(score, 100);

  let priority: ScoreResult["priority"];
  let label: string;

  if (finalScore >= 80) {
    priority = "hot";
    label = "Call within 1 hour";
  } else if (finalScore >= 60) {
    priority = "warm";
    label = "Call same day";
  } else if (finalScore >= 40) {
    priority = "normal";
    label = "Call within 24 hours";
  } else {
    priority = "cold";
    label = "Add to nurture sequence";
  }

  return { score: finalScore, factors, priority, label };
}
