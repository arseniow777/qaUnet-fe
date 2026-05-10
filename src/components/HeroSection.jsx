import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection({ onExplore }) {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden pt-14">
      <BackgroundRippleEffect />
      <div className="relative z-10 text-center space-y-6 px-4">
        <h1 className="text-7xl md:text-9xl font-black text-neutral-900">
          QA-UNet
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto text-sm leading-relaxed">
          Segmentasi area banjir dari foto UAV menggunakan arsitektur hybrid
          Variational Quantum Circuit dan Attention Gate ringan, tepat, akurat
        </p>

        <Button
          onClick={onExplore}
          className="bg-yellow-500 hover:bg-yellow-600 text-neutral-900 font-semibold px-8 py-5 rounded-xs border border-neutral-900"
        >
          Eksplorasi
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
}
