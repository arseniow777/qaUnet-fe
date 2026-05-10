import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImageSlider from "./ImageSlider";
import MetricCard from "./MetricCard";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

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

  const handleDownloadMask = () => {
    const a = document.createElement("a");
    a.href = `data:image/png;base64,${activeResult.mask}`;
    a.download = `${activeKey}_mask.png`;
    a.click();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* kiri: slider + navigator */}
      <div className="p-x-4 pb-4 space-y-4 border-none">
        <div className="flex items-center justify-between px-50">
          <Button
            size="sm"
            variant="ghost"
            className="text-neutral-900 hover:text-neutral-900"
            onClick={() => setActiveIdx((i) => Math.max(i - 1, 0))}
            disabled={activeIdx === 0}
          >
            <ChevronLeft />
          </Button>
          <span className="text-md font-semibold text-neutral-800">
            {MODEL_LABELS[activeKey]}
          </span>
          <Button
            size="sm"
            variant="ghost"
            className="text-neutral-900"
            onClick={() =>
              setActiveIdx((i) => Math.min(i + 1, modelKeys.length - 1))
            }
            disabled={activeIdx === modelKeys.length - 1}
          >
            <ChevronRight />
          </Button>
        </div>

        <ImageSlider
          original={activeResult.original}
          mask={activeResult.mask}
          overlay={activeResult.overlay}
        />
      </div>

      {/* kanan: metrics */}

      <div className="p-x-4 pb-4 space-y-5 border-none">
        <div className="flex items-center justify-center px-50 font-semibold">
          Keterangan
        </div>
        <MetricCard
          metrics={activeResult.metrics}
          isBest={activeKey === bestModel}
          elapsed={elapsed[activeKey]}
        />

        {modelKeys.length > 1 && (
          <Card className="p-4 space-y-2 rounded-xs">
            <p className="text-sm text-neutral-900 font-semibold">
              Semua Model
            </p>
            {modelKeys.map((k) => (
              <button
                key={k}
                onClick={() => setActiveIdx(modelKeys.indexOf(k))}
                className={`w-full flex items-center justify-between px-3 py-4 rounded-lg text-sm transition-all ${
                  k === activeKey
                    ? "bg-yellow-500 border border-netural-900 text-neutral-900 font-bold rounded-xs"
                    : "bg-neutral-50 border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:text-lg rounded-xs"
                }`}
              >
                <span>{MODEL_LABELS[k]}</span>
                <span>{results[k].metrics.flood_percentage}%</span>
              </button>
            ))}
          </Card>
        )}

        <div className="flex justify-center gap-3">
          <Button
            size="sm"
            variant="outline"
            className="w-40 h-10 rounded-xs bg-yellow-500 font-bold border-neutral-900 text-neutral-900 hover:bg-neutral-50"
            onClick={handleDownload}
          >
            <Download /> Overlay
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-40 h-10 rounded-xs bg-yellow-500 font-bold border-neutral-900 text-neutral-900 hover:bg-neutral-50"
            onClick={handleDownloadMask}
          >
            <Download /> Mask
          </Button>
        </div>
      </div>
    </div>
  );
}
