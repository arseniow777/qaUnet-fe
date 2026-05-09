import { useState } from "react";
import { toast } from "sonner";
import DotBackground from "@/components/DotBackground";
import Header from "@/components/Header";
import UploadZone from "@/components/UploadZone";
import ModelDock from "@/components/ModelDock";
import GuideAccordion from "@/components/GuideAccordion";
import ResultSection from "@/components/ResultCard";
import { predictModel } from "@/api/predict";

export default function Home() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [elapsed, setElapsed] = useState({});

  const handleFile = (f) => {
    setFile(f);
    setResults({});
    setElapsed({});
  };

  const handleAnalyze = async (modelKey) => {
    if (!file) {
      toast.error("Upload gambar dulu");
      return;
    }
    setLoading(true);
    try {
      const { data, elapsed: time } = await predictModel(file, modelKey);
      const modelResult = {
        mask: data.mask,
        overlay: data.overlay,
        metrics: data.metrics,
        original: data.original,
      };
      setResults((p) => ({ ...p, [modelKey]: modelResult }));
      setElapsed((p) => ({ ...p, [modelKey]: time }));
      toast.success(
        `${modelKey === "unet" ? "U-Net Baseline" : modelKey === "attention" ? "Attention U-Net" : "Quantum U-Net"} selesai`,
      );
    } catch (e) {
      toast.error("Prediksi gagal, coba lagi");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DotBackground>
      <Header />
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 space-y-16">
        {/* upload + guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* kiri */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-white">
                Unggah Gambar
              </h2>
              <p className="text-xs text-white/40">
                Format JPG / PNG dari foto UAV area banjir
              </p>
            </div>
            <UploadZone onFile={handleFile} />
            {file && <ModelDock onSelect={handleAnalyze} loading={loading} />}
          </div>

          {/* kanan */}
          <div className="space-y-4">
            <GuideAccordion />
          </div>
        </div>

        {/* results */}
        {Object.keys(results).length > 0 && (
          <ResultSection results={results} elapsed={elapsed} />
        )}
      </div>
    </DotBackground>
  );
}
