export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200 backdrop-blur-md bg-white/70">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-bold text-sm tracking-widest uppercase text-neutral-900">
          QA-UNet
        </span>
        <span className="text-xs text-neutral-400 tracking-widest uppercase">
          Flood Detection
        </span>
      </div>
    </header>
  );
}
