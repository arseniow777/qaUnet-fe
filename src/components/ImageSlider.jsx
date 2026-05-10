import { useState, useRef, useCallback } from "react";

export default function ImageSlider({ mask, overlay }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const onMove = useCallback((clientX) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(
      Math.max(((clientX - rect.left) / rect.width) * 100, 5),
      95,
    );
    setPos(pct);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square rounded-xl overflow-hidden select-none cursor-col-resize"
      onMouseDown={() => (dragging.current = true)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onMouseMove={(e) => onMove(e.clientX)}
      onTouchStart={() => (dragging.current = true)}
      onTouchEnd={() => (dragging.current = false)}
      onTouchMove={(e) => onMove(e.touches[0].clientX)}
    >
      {/* kanan: overlay merah */}
      <img
        src={`data:image/png;base64,${overlay}`}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        alt="overlay"
        draggable="false"
      />
      {/* kiri: mask biru-putih */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <img
          src={`data:image/png;base64,${mask}`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          alt="mask"
          draggable="false"
        />
      </div>
      {/* divider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/80 z-10 pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-black text-xs font-bold">
          ⇔
        </div>
      </div>
      <span className="absolute bottom-2 left-2 text-xs bg-black/60 px-2 py-0.5 rounded text-white pointer-events-none">
        Mask
      </span>
      <span className="absolute bottom-2 right-2 text-xs bg-black/60 px-2 py-0.5 rounded text-white pointer-events-none">
        Overlay
      </span>
    </div>
  );
}
