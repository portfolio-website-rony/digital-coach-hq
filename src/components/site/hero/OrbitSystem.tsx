import { useEffect, useState } from "react";
import coachPortrait from "@/assets/coach-rony-portrait.webp";
import { RINGS, type AiTool } from "./ai-tools";
import { AiToolChip } from "./AiToolChip";

type RingConfig = {
  size: number;
  mobileSize: number;
  orbit: string;
  counter: string;
  /** Cap items on mobile to keep DOM light. */
  mobileCap: number;
};

const RING_CONFIGS: RingConfig[] = [
  { size: 260, mobileSize: 180, orbit: "animate-orbit-cw-1", counter: "animate-counter-cw-1", mobileCap: 4 },
  { size: 380, mobileSize: 270, orbit: "animate-orbit-ccw-2", counter: "animate-counter-ccw-2", mobileCap: 5 },
  { size: 500, mobileSize: 360, orbit: "animate-orbit-cw-3", counter: "animate-counter-cw-3", mobileCap: 5 },
  { size: 620, mobileSize: 460, orbit: "animate-orbit-ccw-4", counter: "animate-counter-ccw-4", mobileCap: 0 }, // hidden on mobile
];

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return m;
}

function Ring({
  items,
  cfg,
  size,
  chipSize,
  dashed,
}: {
  items: AiTool[];
  cfg: RingConfig;
  size: number;
  chipSize: number;
  dashed?: boolean;
}) {
  if (items.length === 0) return null;
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        width: size,
        height: size,
        maxWidth: "100%",
        maxHeight: "100%",
        border: `1px ${dashed ? "dashed" : "solid"} oklch(1 0 0 / ${dashed ? 8 : 10}%)`,
      }}
    >
      <div
        className={`absolute inset-0 ${cfg.orbit} hover:[animation-play-state:paused]`}
        style={{ transformOrigin: "50% 50%" }}
      >
        {items.map((tool, i) => {
          const angle = (360 / items.length) * i;
          return (
            <div
              key={tool.name}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${angle}deg) translate(${size / 2}px) rotate(-${angle}deg)`,
              }}
            >
              <AiToolChip tool={tool} size={chipSize} counterClass={cfg.counter} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function OrbitSystem() {
  const isMobile = useIsMobile();
  const max = isMobile ? RING_CONFIGS[2].mobileSize : RING_CONFIGS[3].size;
  const chipSize = isMobile ? 32 : 40;

  return (
    <div
      className="relative mx-auto"
      style={{ width: max, height: max, maxWidth: "100%", aspectRatio: "1 / 1" }}
    >
      {/* Brand-tinted ambient particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="absolute left-[12%] top-[18%] h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.16_240)] shadow-neon-blue animate-float" />
        <span
          className="absolute right-[14%] top-[28%] h-1 w-1 rounded-full bg-[oklch(0.85_0.18_290)] shadow-neon-purple animate-float"
          style={{ animationDelay: "-2s" }}
        />
        <span
          className="absolute right-[8%] bottom-[22%] h-2 w-2 rounded-full bg-[oklch(0.88_0.14_210)] shadow-neon-blue animate-float"
          style={{ animationDelay: "-4s" }}
        />
        <span
          className="absolute left-[6%] bottom-[14%] h-1 w-1 rounded-full bg-[oklch(0.85_0.18_290)] shadow-neon-purple animate-float"
          style={{ animationDelay: "-1s" }}
        />
      </div>

      {/* Center portrait */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-44 w-44 sm:h-52 sm:w-52">
          {/* Glow halo behind */}
          <div className="absolute -inset-3 rounded-full bg-gradient-orb opacity-60 blur-2xl animate-pulse-glow" />
          {/* Portrait */}
          <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white/20 shadow-moon">
            <img
              src={coachPortrait}
              alt="CoachRony"
              className="h-full w-full object-cover"
              draggable={false}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={600}
              height={600}
            />
          </div>
        </div>
      </div>

      {/* Orbit rings */}
      {RINGS.map((items, idx) => {
        const cfg = RING_CONFIGS[idx];
        const ringSize = isMobile ? cfg.mobileSize : cfg.size;
        const ringItems = isMobile ? items.slice(0, cfg.mobileCap) : items;
        if (isMobile && cfg.mobileCap === 0) return null;
        return (
          <Ring
            key={idx}
            items={ringItems}
            cfg={cfg}
            size={ringSize}
            chipSize={chipSize}
            dashed={idx >= 2}
          />
        );
      })}
    </div>
  );
}
