export function NebulaLayer() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-32 -left-24 h-[620px] w-[620px] rounded-full blur-3xl animate-nebula-drift"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.24 290 / 55%), transparent 65%)" }}
      />
      <div
        className="absolute top-32 -right-24 h-[680px] w-[680px] rounded-full blur-3xl animate-nebula-drift"
        style={{
          background: "radial-gradient(circle, oklch(0.55 0.22 240 / 50%), transparent 65%)",
          animationDelay: "-12s",
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full blur-3xl animate-nebula-drift"
        style={{
          background: "radial-gradient(circle, oklch(0.6 0.2 210 / 35%), transparent 65%)",
          animationDelay: "-20s",
        }}
      />
    </div>
  );
}
