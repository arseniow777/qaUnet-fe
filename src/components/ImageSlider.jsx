import { useRef, useState, useCallback } from "react";

const MODES = [
  {
    key: "original-mask",
    label: "Original / Mask",
    left: "original",
    right: "mask",
  },
  {
    key: "mask-overlay",
    label: "Mask / Overlay",
    left: "mask",
    right: "overlay",
  },
  {
    key: "original-overlay",
    label: "Original / Overlay",
    left: "original",
    right: "overlay",
  },
];

export default function ImageSlider({ original, mask, overlay }) {
  const [mode, setMode] = useState("original-mask");
  const [pos, setPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const images = { original, mask, overlay };
  const active = MODES.find((m) => m.key === mode);

  const onMove = useCallback((clientX) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos(
      Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 5), 95),
    );
  }, []);

  return (
    <div className="space-y-3">
      {/* toggle */}
      <div className="flex items-center gap-1 bg-neutral-100 border border-neutral-200 rounded-xs p-1">
        {MODES.map((m) => (
          <button
            key={m.key}
            onClick={() => {
              setMode(m.key);
              setPos(50);
            }}
            className={`flex-1 text-sm font-semibold h-10 rounded-xs transition-all ${
              mode === m.key
                ? "bg-yellow-500 text-neutral-900 border border-neutral-900"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* slider */}
      <div
        ref={containerRef}
        className="relative w-full aspect-square rounded-xs overflow-hidden select-none cursor-col-resize"
        onMouseDown={() => (dragging.current = true)}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
        onMouseMove={(e) => onMove(e.clientX)}
        onTouchStart={() => (dragging.current = true)}
        onTouchEnd={() => (dragging.current = false)}
        onTouchMove={(e) => onMove(e.touches[0].clientX)}
      >
        <img
          src={`data:image/png;base64,${images[active.right]}`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          alt={active.right}
          draggable="false"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <img
            src={`data:image/png;base64,${images[active.left]}`}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            alt={active.left}
            draggable="false"
          />
        </div>

        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/80 z-10 pointer-events-none"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-black text-xs font-bold">
            ⇔
          </div>
        </div>

        <span className="absolute bottom-2 left-2 text-xs bg-black/60 px-2 py-0.5 rounded text-white pointer-events-none capitalize">
          {active.left}
        </span>
        <span className="absolute bottom-2 right-2 text-xs bg-black/60 px-2 py-0.5 rounded text-white pointer-events-none capitalize">
          {active.right}
        </span>
      </div>
    </div>
  );
}
