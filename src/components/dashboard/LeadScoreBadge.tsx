export function LeadScoreBadge({ score }: { score: number }) {
  let color = "bg-gray-100 text-gray-600";
  let label = "Cold";
  if (score >= 80) { color = "bg-red-100 text-red-700"; label = "🔥 Hot"; }
  else if (score >= 60) { color = "bg-orange-100 text-orange-700"; label = "⚡ Warm"; }
  else if (score >= 40) { color = "bg-yellow-100 text-yellow-700"; label = "Normal"; }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}>
      {score} · {label}
    </span>
  );
}
