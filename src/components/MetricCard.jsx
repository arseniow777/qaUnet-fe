import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconClockHour2 as Clock } from "@tabler/icons-react";

export default function MetricCard({ metrics, isBest, elapsed }) {
  const floodPct = metrics.flood_percentage;

  return (
    <Card className="p-5 space-y-4 text-neutral-900 rounded-xs">
      {isBest && (
        <Badge className="text-neutral-900 text-sm font-semibold pl-0">
          Best Model
        </Badge>
      )}

      {/* flood area */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-neutral-700">
          <span>Flood Area</span>
          <span className="text-neutral-900 font-semibold">{floodPct}%</span>
        </div>
        <div className="relative h-2 rounded-full bg-neutral-100 overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-yellow-500 transition-all duration-700"
            style={{ width: `${floodPct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-neutral-700">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      {/* pixel stats */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-neutral-50 border border-neutral-200 rounded-xs p-3 space-y-0.5">
          <p className="text-neutral-900 text-md">Flood Pixels</p>
          <p className="text-neutral-900 text-sm font-semibold">
            {metrics.flood_pixels.toLocaleString()}
          </p>
        </div>
        <div className="bg-neutral-50 border border-neutral-200 rounded-xs p-3 space-y-0.5">
          <p className="text-neutral-400">Non-Flood</p>
          <p className="text-neutral-900 font-semibold text-sm">
            {metrics.non_flood_pixels.toLocaleString()}
          </p>
        </div>
      </div>

      {elapsed && (
        <p className="text-sm text-neutral-900 text-right flex items-center justify-end gap-1">
          <Clock className="w-4 h-4" /> {elapsed}s execution time
        </p>
      )}
    </Card>
  );
}
