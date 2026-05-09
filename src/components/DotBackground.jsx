export default function DotBackground({ children }) {
  return (
    <div
      className="relative min-h-screen w-full"
      style={{ backgroundColor: "#080808" }}
    >
      {/* dot pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff12 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      {/* glow top center */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, #ffffff08, transparent)",
        }}
      />
      {/* fade bottom */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 60%, #080808 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
