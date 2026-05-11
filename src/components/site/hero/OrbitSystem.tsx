import { Brain, Code2, Sparkles, Rocket, Cpu, Bot } from "lucide-react";
import coachPortrait from "@/assets/coach-rony-portrait.png";

type OrbitItem = {
  icon?: React.ReactNode;
  initials?: string;
  tone: "blue" | "purple" | "cyan";
};

const orbits: { size: number; counter: string; orbit: string; items: OrbitItem[] }[] = [
  {
    size: 220,
    orbit: "animate-orbit-cw-1",
    counter: "animate-counter-cw-1",
    items: [
      { icon: <Sparkles className="h-4 w-4" />, tone: "purple" },
      { icon: <Bot className="h-4 w-4" />, tone: "blue" },
    ],
  },
  {
    size: 340,
    orbit: "animate-orbit-ccw-1",
    counter: "animate-counter-ccw-1",
    items: [
      { initials: "RA", tone: "purple" },
      { icon: <Code2 className="h-4 w-4" />, tone: "cyan" },
      { initials: "MN", tone: "blue" },
    ],
  },
  {
    size: 460,
    orbit: "animate-orbit-cw-2",
    counter: "animate-counter-cw-2",
    items: [
      { icon: <Brain className="h-4 w-4" />, tone: "purple" },
      { initials: "SK", tone: "blue" },
      { icon: <Cpu className="h-4 w-4" />, tone: "cyan" },
      { initials: "TF", tone: "purple" },
    ],
  },
  {
    size: 580,
    orbit: "animate-orbit-ccw-2",
    counter: "animate-counter-ccw-2",
    items: [
      { icon: <Rocket className="h-4 w-4" />, tone: "blue" },
      { initials: "AI", tone: "purple" },
      { icon: <Sparkles className="h-4 w-4" />, tone: "cyan" },
    ],
  },
];

const toneStyles: Record<OrbitItem["tone"], string> = {
  blue: "bg-[oklch(0.2_0.06_240/70%)] text-[oklch(0.85_0.16_230)] shadow-neon-blue",
  purple: "bg-[oklch(0.2_0.06_290/70%)] text-[oklch(0.85_0.18_290)] shadow-neon-purple",
  cyan: "bg-[oklch(0.2_0.06_210/70%)] text-[oklch(0.88_0.14_210)] shadow-neon-blue",
};

export function OrbitSystem() {
  const max = orbits[orbits.length - 1].size;

  return (
    <div
      className="relative mx-auto"
      style={{ width: max, height: max, maxWidth: "100%", aspectRatio: "1 / 1" }}
    >
      {/* central moon / AI core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-44 w-44 sm:h-52 sm:w-52">
          <div className="absolute inset-0 rounded-full bg-gradient-orb shadow-moon animate-pulse-glow" />
          <div
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 70% 75%, oklch(0.15 0.05 270 / 55%), transparent 55%)",
            }}
          />
          <img
            src={coachPortrait}
            alt="CoachRony"
            className="absolute inset-3 rounded-full object-cover"
            style={{
              WebkitMaskImage:
                "radial-gradient(circle at 50% 45%, black 55%, transparent 78%)",
              maskImage:
                "radial-gradient(circle at 50% 45%, black 55%, transparent 78%)",
              opacity: 0.92,
            }}
            draggable={false}
          />
        </div>
      </div>

      {orbits.map((o, idx) => (
        <div
          key={idx}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
          style={{ width: o.size, height: o.size, maxWidth: "100%", maxHeight: "100%" }}
        >
          <div className={`absolute inset-0 ${o.orbit}`} style={{ transformOrigin: "50% 50%" }}>
            {o.items.map((item, i) => {
              const angle = (360 / o.items.length) * i;
              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `rotate(${angle}deg) translate(${o.size / 2}px) rotate(-${angle}deg)`,
                  }}
                >
                  <div
                    className={`${o.counter} grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-xs font-bold backdrop-blur-md ${toneStyles[item.tone]}`}
                    style={{ border: "1px solid oklch(1 0 0 / 18%)" }}
                  >
                    {item.icon ?? item.initials}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* tiny stationary planets */}
      <div
        aria-hidden
        className="absolute right-4 top-6 h-3 w-3 rounded-full bg-[oklch(0.78_0.16_240)] shadow-neon-blue animate-float"
      />
      <div
        aria-hidden
        className="absolute bottom-10 left-2 h-2 w-2 rounded-full bg-[oklch(0.85_0.18_290)] shadow-neon-purple animate-float"
        style={{ animationDelay: "-2s" }}
      />
    </div>
  );
}
