import { useState, useRef } from "react";
import { toast } from "sonner";
import PageBackground from "@/components/DotBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
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
  const eksperimenRef = useRef(null);

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
    } finally {
      setLoading(false);
    }
  };

  const SectionLabel = ({ children }) => (
    <div className="border-t-2 border-b-2 border-neutral-400 py-3 mb-8">
      <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-wide">
        {children}
      </h2>
    </div>
  );

  return (
    <PageBackground>
      <Header />
      <HeroSection
        onExplore={() => {
          const el = eksperimenRef.current;
          if (!el) return;
          const headerHeight = 56;
          const top =
            el.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top, behavior: "smooth" });
        }}
      />

      {/* Eksperimen */}
      <section ref={eksperimenRef}>
        <div className="max-w-7xl mx-auto px-6 pb-16 space-y-6">
          <SectionLabel>Eksperimen</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-semibold text-neutral-700">
                  Unggah Gambar
                </h3>
                <p className="text-neutral-400">
                  Format JPG / PNG dari foto UAV area banjir
                </p>
              </div>
              <UploadZone onFile={handleFile} />
              {file && <ModelDock onSelect={handleAnalyze} loading={loading} />}
            </div>
            <GuideAccordion />
          </div>
        </div>
      </section>

      {/* Hasil */}
      {Object.keys(results).length > 0 && (
        <section>
          <div className="max-w-7xl mx-auto px-6 py-16 space-y-6">
            <SectionLabel>Hasil</SectionLabel>
            <ResultSection results={results} elapsed={elapsed} />
          </div>
        </section>
      )}
    </PageBackground>
  );
}
