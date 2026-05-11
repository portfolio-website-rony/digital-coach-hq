import { motion } from "framer-motion";

export function MissionOrb({
  current = 125000,
  goal = 1000000,
}: {
  current?: number;
  goal?: number;
}) {
  const pct = Math.min(1, current / goal);
  const r = 78;
  const c = 2 * Math.PI * r;
  const dash = c * pct;
  const fmt = (n: number) => n.toLocaleString("en-IN");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.4 }}
      className="relative mx-auto h-52 w-52"
    >
      {/* outer rotating ring */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full animate-orbit-cw-2"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, oklch(0.78 0.2 290 / 70%) 90deg, transparent 180deg, oklch(0.68 0.2 240 / 70%) 270deg, transparent 360deg)",
          mask: "radial-gradient(circle, transparent 92px, black 93px, black 100px, transparent 101px)",
          WebkitMask:
            "radial-gradient(circle, transparent 92px, black 93px, black 100px, transparent 101px)",
        }}
      />

      {/* SVG progress ring */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 -rotate-90">
        <defs>
          <linearGradient id="orb-grad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.2 290)" />
            <stop offset="100%" stopColor="oklch(0.78 0.16 240)" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r={r} stroke="oklch(1 0 0 / 8%)" strokeWidth="3" fill="none" />
        <circle
          cx="100"
          cy="100"
          r={r}
          stroke="url(#orb-grad)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          style={{ filter: "drop-shadow(0 0 8px oklch(0.78 0.2 290 / 70%))" }}
        />
      </svg>

      {/* glass core */}
      <div className="absolute inset-6 flex flex-col items-center justify-center rounded-full glass-strong text-center animate-pulse-glow">
        <div className="text-[9px] uppercase tracking-[0.2em] text-primary-glow">Mission</div>
        <div className="mt-1 px-3 font-display text-[13px] font-semibold leading-tight">
          Teach AI to <span className="text-gradient">1M</span> People
        </div>
        <div className="mt-2 font-display text-base font-bold text-gradient">{fmt(current)}</div>
        <div className="text-[10px] text-muted-foreground">/ {fmt(goal)}</div>
      </div>
    </motion.div>
  );
}
