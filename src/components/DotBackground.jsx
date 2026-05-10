export default function PageBackground({ children }) {
  return (
    <div className="relative w-full bg-neutral-50 overflow-hidden">
      <div className="relative z-10">{children}</div>
    </div>
  );
}
