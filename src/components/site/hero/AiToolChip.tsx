import { memo } from "react";
import type { AiTool } from "./ai-tools";

type Props = {
  tool: AiTool;
  size?: number;
  /** Counter-rotation animation utility class so the chip stays upright. */
  counterClass?: string;
};

function AiToolChipBase({ tool, size = 40, counterClass }: Props) {
  const hex = `#${tool.color}`;
  const iconSize = Math.round(size * 0.5);

  return (
    <div
      className={`group/chip ${counterClass ?? ""} -translate-x-1/2 -translate-y-1/2`}
      style={{ width: size, height: size }}
    >
      <div
        className={[
          "relative grid h-full w-full place-items-center rounded-full",
          "bg-[oklch(0.16_0.04_270/72%)] backdrop-blur-md",
          "border border-white/15",
          "transition-transform duration-300 ease-out",
          "group-hover/chip:scale-[1.18]",
          tool.featured ? "animate-pulse-glow" : "",
        ].join(" ")}
        style={{
          boxShadow: `0 0 14px ${hex}55, 0 0 28px ${hex}22, inset 0 0 10px ${hex}22`,
        }}
      >
        {tool.icon ? (
          <svg
            viewBox="0 0 24 24"
            width={iconSize}
            height={iconSize}
            aria-hidden
            style={{ filter: `drop-shadow(0 0 4px ${hex}cc)` }}
          >
            <path d={tool.icon.path} fill={hex} />
          </svg>
        ) : (
          <span
            className="font-display text-[11px] font-bold leading-none"
            style={{ color: hex, textShadow: `0 0 8px ${hex}aa` }}
          >
            {tool.initials}
          </span>
        )}

        {/* Tooltip */}
        <span
          className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[oklch(0.12_0.04_270/90%)] px-2 py-0.5 text-[10px] font-medium text-foreground/90 opacity-0 shadow-lg transition-opacity duration-200 group-hover/chip:opacity-100"
        >
          {tool.name}
        </span>
      </div>
    </div>
  );
}

export const AiToolChip = memo(AiToolChipBase);
