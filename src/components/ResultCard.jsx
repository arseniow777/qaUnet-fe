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
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center text-white">
        Hasil Segmentasi
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* kiri: image slider + navigator */}
        <Card className="bg-white/5 border-white/10 p-4 space-y-4">
          {/* model navigator */}
          <div className="flex items-center justify-between">
            <Button
              size="sm"
              variant="ghost"
              className="text-white/50 hover:text-white"
              onClick={() => setActiveIdx((i) => Math.max(i - 1, 0))}
              disabled={activeIdx === 0}
            >
              ‹
            </Button>
            <span className="text-sm font-medium text-white">
              {MODEL_LABELS[activeKey]}
            </span>
            <Button
              size="sm"
              variant="ghost"
              className="text-white/50 hover:text-white"
              onClick={() =>
                setActiveIdx((i) => Math.min(i + 1, modelKeys.length - 1))
              }
              disabled={activeIdx === modelKeys.length - 1}
            >
              ›
            </Button>
          </div>

          <ImageSlider
            mask={activeResult.mask}
            overlay={activeResult.overlay}
          />

          <p className="text-xs text-white/30 text-center">
            Geser untuk bandingkan Mask ↔ Overlay
          </p>

          <Button
            size="sm"
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10 text-xs"
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

          {/* semua model summary */}
          {modelKeys.length > 1 && (
            <Card className="bg-white/5 border-white/10 p-4 space-y-2">
              <p className="text-xs text-white/40 uppercase tracking-wider">
                Semua Model
              </p>
              {modelKeys.map((k) => (
                <button
                  key={k}
                  onClick={() => setActiveIdx(modelKeys.indexOf(k))}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all ${
                    k === activeKey
                      ? "bg-blue-500/20 border border-blue-500/30 text-white"
                      : "bg-white/5 border border-white/10 text-white/50 hover:text-white"
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
    </div>
  );
}
