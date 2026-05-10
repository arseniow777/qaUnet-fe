import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Button } from "@/components/ui/button";

export default function HeroSection({ onExplore }) {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden pt-14">
      <BackgroundRippleEffect />
      <div className="relative z-10 text-center space-y-6 px-4">
        <p className="text-xs text-neutral-400 tracking-[0.3em] uppercase">
          Quantum AI · UAV · Flood Detection
        </p>
        <h1 className="text-7xl md:text-9xl font-black tracking-tight text-neutral-900">
          QA-UNet
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto text-sm leading-relaxed">
          Segmentasi area banjir dari foto UAV menggunakan arsitektur hybrid
          Variational Quantum Circuit dan Attention Gate — lebih ringan, tetap
          akurat.
        </p>
        <Button
          onClick={onExplore}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-5 rounded-full text-sm"
        >
          Eksplorasi →
        </Button>
      </div>
    </section>
  );
}
