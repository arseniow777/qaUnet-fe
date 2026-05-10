"use client";
import { motion } from "motion/react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection({ onExplore }) {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden pt-14">
      <BackgroundRippleEffect />

      <div className="relative z-10 flex flex-col items-center text-center space-y-6 px-4 w-full">
        <LampEffect />

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
          className="text-7xl md:text-9xl font-black text-neutral-900"
        >
          QA-UNet
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8, ease: "easeInOut" }}
          className="text-neutral-500 max-w-lg mx-auto text-sm leading-relaxed"
        >
          Segmentasi area banjir dari foto UAV menggunakan arsitektur hybrid
          Variational Quantum Circuit dan Attention Gate ringan, tepat, akurat
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: "easeInOut" }}
        >
          <Button
            onClick={onExplore}
            className="bg-yellow-500 hover:bg-yellow-600 text-neutral-900 font-semibold px-8 py-5 rounded-xs border border-neutral-900"
          >
            Eksplorasi
            <ArrowRight />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function LampEffect() {
  return (
    <div className="relative flex w-full max-w-3xl flex-col items-center justify-center mb-24">
      {/* kiri */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "22rem", opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.9, ease: "easeInOut" }}
        className="absolute z-20 h-[1.5px] top-0 right-1/2"
        style={{
          background: "linear-gradient(to left, #eab308, transparent)",
          boxShadow: "0 0 8px 2px rgba(234,179,8,0.5)",
        }}
      />

      {/* kanan */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "22rem", opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.9, ease: "easeInOut" }}
        className="absolute z-20 h-[1.5px] top-0 left-1/2"
        style={{
          background: "linear-gradient(to right, #eab308, transparent)",
          boxShadow: "0 0 8px 2px rgba(234,179,8,0.5)",
        }}
      />

      {/* glow utama — kuat di tengah atas, fade sempurna ke bawah & samping */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.4, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        style={{
          width: "56rem",
          height: "18rem",
          background: `
            radial-gradient(ellipse 50% 100% at 50% 0%,
              rgba(234,179,8,0.35) 0%,
              rgba(234,179,8,0.18) 30%,
              rgba(234,179,8,0.06) 60%,
              transparent 100%
            )
          `,
        }}
      />

      {/* spacer buat tinggi container */}
      <div className="h-1 w-full" />
    </div>
  );
}
