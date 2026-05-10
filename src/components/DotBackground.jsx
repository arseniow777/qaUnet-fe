export default function PageBackground({ children }) {
  return (
    <div className="relative w-full bg-neutral-50 overflow-hidden">
      {/* siluet yellow kiri atas */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #eab30820 0%, transparent 70%)",
        }}
      />
      {/* siluet yellow kanan bawah */}
      <div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #eab30815 0%, transparent 70%)",
        }}
      />
      {/* siluet yellow tengah subtle */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #eab30808 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
