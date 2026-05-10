import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MetricCard({ metrics, isBest, elapsed }) {
  const floodPct = metrics.flood_percentage;

  return (
    <Card className="bg-white border-neutral-200 p-5 space-y-4 text-neutral-900 shadow-sm">
      {isBest && (
        <Badge className="bg-yellow-500 hover:bg-yellow-500 text-black text-xs font-semibold">
          ★ Best Model
        </Badge>
      )}

      {/* flood area */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-neutral-500">
          <span>Flood Area</span>
          <span className="text-neutral-900 font-semibold">{floodPct}%</span>
        </div>
        <div className="relative h-2 rounded-full bg-neutral-100 overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-yellow-500 transition-all duration-700"
            style={{ width: `${floodPct}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-neutral-300">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      {/* pixel stats */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 space-y-0.5">
          <p className="text-yellow-600">Flood Pixels</p>
          <p className="text-neutral-900 font-semibold text-sm">
            {metrics.flood_pixels.toLocaleString()}
          </p>
        </div>
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 space-y-0.5">
          <p className="text-neutral-400">Non-Flood</p>
          <p className="text-neutral-900 font-semibold text-sm">
            {metrics.non_flood_pixels.toLocaleString()}
          </p>
        </div>
      </div>

      {elapsed && (
        <p className="text-[10px] text-neutral-300 text-right">
          ⏱ {elapsed}s execution time
        </p>
      )}
    </Card>
  );
}
