"use client";

interface SourceEntry { source: string; count: number; percentage: number; }

const SOURCE_COLORS: Record<string, string> = {
  website: "bg-blue-500",
  google_ads: "bg-green-500",
  organic: "bg-teal-500",
  referral: "bg-purple-500",
  facebook: "bg-indigo-500",
  chatbot: "bg-orange-500",
};

export function SourceChart({ data }: { data: SourceEntry[] }) {
  if (!data?.length) return <p className="text-sm text-gray-400 text-center py-4">No data yet</p>;

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.source}>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="font-medium text-gray-700 capitalize">{item.source.replace(/_/g, " ")}</span>
            <span className="text-gray-500">{item.count} · {item.percentage}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${SOURCE_COLORS[item.source] || "bg-gray-400"}`}
              style={{ width: `${item.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
