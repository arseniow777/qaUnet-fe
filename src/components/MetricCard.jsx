import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MetricCard({ metrics, isBest, elapsed }) {
  const floodPct = metrics.flood_percentage;

  return (
    <Card className="bg-white/5 border-white/10 p-5 space-y-4 text-white">
      {isBest && (
        <Badge className="bg-blue-600 hover:bg-blue-600 text-white text-xs">
          ★ Best Model
        </Badge>
      )}

      {/* flood area visual */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-white/50">
          <span>Flood Area</span>
          <span className="text-white font-semibold">{floodPct}%</span>
        </div>
        {/* custom progress dengan warna jelas */}
        <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-blue-500 transition-all duration-700"
            style={{ width: `${floodPct}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-white/30">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      {/* pixel stats */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 space-y-0.5">
          <p className="text-blue-400/70">Flood Pixels</p>
          <p className="text-white font-semibold text-sm">
            {metrics.flood_pixels.toLocaleString()}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-0.5">
          <p className="text-white/40">Non-Flood</p>
          <p className="text-white font-semibold text-sm">
            {metrics.non_flood_pixels.toLocaleString()}
          </p>
        </div>
      </div>

      {elapsed && (
        <p className="text-[10px] text-white/30 text-right">
          ⏱ {elapsed}s execution time
        </p>
      )}
    </Card>
  );
}
