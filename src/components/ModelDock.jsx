import { FloatingDock } from "@/components/ui/floating-dock";

export default function ModelDock({ onSelect, loading }) {
  const items = [
    {
      title: "U-Net Baseline",
      icon: (
        <button
          onClick={() => !loading && onSelect("unet")}
          className="w-full h-full flex items-center justify-center text-white font-bold text-xs"
        >
          UN
        </button>
      ),
      href: "#",
    },
    {
      title: "Attention U-Net",
      icon: (
        <button
          onClick={() => !loading && onSelect("attention")}
          className="w-full h-full flex items-center justify-center text-white font-bold text-xs"
        >
          AT
        </button>
      ),
      href: "#",
    },
    {
      title: "Quantum U-Net",
      icon: (
        <button
          onClick={() => !loading && onSelect("quantum")}
          className="w-full h-full flex items-center justify-center text-white font-bold text-xs"
        >
          QA
        </button>
      ),
      href: "#",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs text-white/40 tracking-widest uppercase">
        Choose Model
      </p>
      <FloatingDock
        items={items}
        desktopClassName="bg-white/10 border border-white/20"
      />
    </div>
  );
}
