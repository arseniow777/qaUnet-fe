import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImageSlider from "./ImageSlider";
import MetricCard from "./MetricCard";

const MODEL_LABELS = {
  unet: "U-Net Baseline",
  attention: "Attention U-Net",
  quantum: "Quantum U-Net",
};

export default function ResultSection({ results, elapsed }) {
  const modelKeys = Object.keys(results);
  const [activeIdx, setActiveIdx] = useState(0);

  if (modelKeys.length === 0) return null;

  const activeKey = modelKeys[activeIdx];
  const activeResult = results[activeKey];

  const bestModel = Object.entries(results).sort(
    (a, b) =>
      (b[1]?.metrics?.flood_percentage ?? 0) -
      (a[1]?.metrics?.flood_percentage ?? 0),
  )[0]?.[0];

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = `data:image/png;base64,${activeResult.overlay}`;
    a.download = `${activeKey}_overlay.png`;
    a.click();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* kiri: slider + navigator */}
      <Card className="bg-white border-neutral-200 p-4 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Button
            size="sm"
            variant="ghost"
            className="text-neutral-400 hover:text-neutral-900"
            onClick={() => setActiveIdx((i) => Math.max(i - 1, 0))}
            disabled={activeIdx === 0}
          >
            ‹
          </Button>
          <span className="text-sm font-semibold text-neutral-900">
            {MODEL_LABELS[activeKey]}
          </span>
          <Button
            size="sm"
            variant="ghost"
            className="text-neutral-400 hover:text-neutral-900"
            onClick={() =>
              setActiveIdx((i) => Math.min(i + 1, modelKeys.length - 1))
            }
            disabled={activeIdx === modelKeys.length - 1}
          >
            ›
          </Button>
        </div>

        <ImageSlider mask={activeResult.mask} overlay={activeResult.overlay} />

        <p className="text-xs text-neutral-400 text-center">
          Geser untuk bandingkan Mask ↔ Overlay
        </p>

        <Button
          size="sm"
          variant="outline"
          className="w-full border-neutral-200 text-neutral-700 hover:bg-neutral-50 text-xs"
          onClick={handleDownload}
        >
          ↓ Download Overlay
        </Button>
      </Card>

      {/* kanan: metrics */}
      <div className="space-y-3">
        <MetricCard
          metrics={activeResult.metrics}
          isBest={activeKey === bestModel}
          elapsed={elapsed[activeKey]}
        />

        {modelKeys.length > 1 && (
          <Card className="bg-white border-neutral-200 p-4 space-y-2 shadow-sm">
            <p className="text-xs text-neutral-400 uppercase tracking-wider">
              Semua Model
            </p>
            {modelKeys.map((k) => (
              <button
                key={k}
                onClick={() => setActiveIdx(modelKeys.indexOf(k))}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all ${
                  k === activeKey
                    ? "bg-yellow-50 border border-yellow-300 text-neutral-900 font-medium"
                    : "bg-neutral-50 border border-neutral-200 text-neutral-500 hover:text-neutral-900"
                }`}
              >
                <span>{MODEL_LABELS[k]}</span>
                <span>{results[k].metrics.flood_percentage}%</span>
              </button>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
}
