import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
};

/**
 * Canvas-based starfield. Renders all stars on a single <canvas> element so the
 * DOM stays tiny and mobile scrolling/animation stays smooth. Respects
 * prefers-reduced-motion and pauses when the tab is hidden or the section is
 * off-screen.
 */
export function Starfield({
  desktopCount = 110,
  mobileCount = 45,
}: {
  desktopCount?: number;
  mobileCount?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    const count = isMobile ? mobileCount : desktopCount;

    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let rafId = 0;
    let visible = true;
    let inView = true;
    let lastFrame = 0;
    const targetFps = isMobile ? 24 : 40;
    const frameInterval = 1000 / targetFps;

    const seed = (n: number) => {
      const x = Math.sin(n) * 10000;
      return x - Math.floor(x);
    };

    const buildStars = () => {
      stars = Array.from({ length: count }).map((_, i) => ({
        x: seed(i + 1) * width,
        y: seed(i + 99) * height,
        r: 0.4 + seed(i + 7) * 1.4,
        baseAlpha: 0.35 + seed(i + 55) * 0.65,
        twinkleSpeed: 0.6 + seed(i + 21) * 1.6,
        phase: seed(i + 33) * Math.PI * 2,
      }));
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        ctx.globalAlpha = s.baseAlpha;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const render = (t: number) => {
      if (!visible || !inView) {
        rafId = requestAnimationFrame(render);
        return;
      }
      if (t - lastFrame < frameInterval) {
        rafId = requestAnimationFrame(render);
        return;
      }
      lastFrame = t;

      ctx.clearRect(0, 0, width, height);
      const time = t / 1000;
      for (const s of stars) {
        const a = s.baseAlpha * (0.55 + 0.45 * Math.sin(time * s.twinkleSpeed + s.phase));
        ctx.globalAlpha = Math.max(0, Math.min(1, a));
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(render);
    };

    resize();

    if (reduceMotion) {
      drawStatic();
    } else {
      rafId = requestAnimationFrame(render);
    }

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window && canvas.parentElement) {
      observer = new IntersectionObserver(
        (entries) => {
          inView = entries[0]?.isIntersecting ?? true;
        },
        { threshold: 0 },
      );
      observer.observe(canvas.parentElement);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      observer?.disconnect();
    };
  }, [desktopCount, mobileCount]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
