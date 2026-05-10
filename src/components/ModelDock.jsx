import { FloatingDock } from "@/components/ui/floating-dock";
import { Layers, Zap, Atom } from "lucide-react";
import { useState, useEffect } from "react";

export default function ModelDock({ onSelect, loading }) {
  const iconClass =
    "w-full h-full flex items-center justify-center text-neutral-900";

  const items = [
    {
      title: "U-Net Baseline",
      icon: (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            !loading && onSelect("unet");
          }}
          className={iconClass}
        >
          <Layers size={18} />
        </button>
      ),
      href: "javascript:void(0)",
    },
    {
      title: "Attention U-Net",
      icon: (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            !loading && onSelect("attention");
          }}
          className={iconClass}
        >
          <Zap size={18} />
        </button>
      ),
      href: "javascript:void(0)",
    },
    {
      title: "Quantum U-Net",
      icon: (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            !loading && onSelect("quantum");
          }}
          className={iconClass}
        >
          <Atom size={18} />
        </button>
      ),
      href: "javascript:void(0)",
    },
  ];

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setShowLoader(true), 500);
      return () => clearTimeout(timer);
    }
    setShowLoader(false);
  }, [loading]);

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs text-neutral-400 tracking-widest uppercase">
        Choose Model
      </p>
      <FloatingDock items={items} desktopClassName="rounded-xs" />
      {showLoader && (
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div
              className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
          <p className="text-xs text-yellow-500 font-medium">Memproses...</p>
        </div>
      )}
    </div>
  );
}
