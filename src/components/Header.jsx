import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-neutral-200 backdrop-blur-md bg-white/70"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <span
          className={`font-bold text-sm tracking-widest uppercase transition-all duration-500 ${
            scrolled ? "opacity-100 text-neutral-900" : "opacity-0"
          }`}
        >
          QA-UNet
        </span>
        <span
          className={`text-xs tracking-widest uppercase transition-all duration-500 ${
            scrolled ? "opacity-100 text-neutral-400" : "opacity-0"
          }`}
        >
          Flood Detection
        </span>
      </div>
    </header>
  );
}
