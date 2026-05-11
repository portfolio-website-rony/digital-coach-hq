import { useMemo } from "react";

export function Starfield({ count = 110 }: { count?: number }) {
  const stars = useMemo(() => {
    // deterministic pseudo-random for SSR stability
    const rand = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: count }).map((_, i) => ({
      top: rand(i + 1) * 100,
      left: rand(i + 99) * 100,
      size: 0.6 + rand(i + 7) * 1.8,
      delay: rand(i + 33) * 4,
      duration: 2.5 + rand(i + 21) * 4,
      opacity: 0.3 + rand(i + 55) * 0.7,
    }));
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: "0 0 6px rgba(255,255,255,0.8)",
          }}
        />
      ))}
    </div>
  );
}
