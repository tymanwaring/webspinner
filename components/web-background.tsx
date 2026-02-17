"use client"

import { SpiderWeb } from "@/components/spider-web"

/**
 * WebBackground -- Realistic intricate spider webs positioned at strategic
 * corners/edges of the viewport. Three webs anchored to different corners
 * with a gentle breathing animation. No full-screen clutter; webs sit at
 * the periphery in delicate neon red, complementing the black widow theme.
 */
export function WebBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      role="presentation"
      aria-hidden="true"
    >
      {/* Subtle ambient glow -- warm crimson centre */}
      <div
        className="absolute left-1/2 top-[12%] h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.24 25 / 0.03) 0%, transparent 60%)",
        }}
      />

      {/* --- Web 1: top-left corner -- the most visible, elegant web --- */}
      <div
        className="absolute -left-2 -top-2 opacity-[0.30]"
        style={{ animation: "web-breathe 12s ease-in-out infinite" }}
      >
        <SpiderWeb size={300} spokes={14} rings={8} anchor="tl" />
      </div>

      {/* Delicate trailing silk thread drifting from web 1 */}
      <svg
        className="absolute left-[220px] top-[40px] h-[120px] w-[160px] opacity-[0.06]"
        viewBox="0 0 160 120"
        fill="none"
      >
        <path
          d="M 0 10 Q 40 5, 80 20 Q 120 40, 150 80"
          stroke="var(--node-color)"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeDasharray="4 6"
        />
      </svg>

      {/* --- Web 2: bottom-right corner -- large, atmospheric --- */}
      <div
        className="absolute -bottom-2 -right-2 opacity-[0.25]"
        style={{ animation: "web-breathe 14s ease-in-out infinite 3s" }}
      >
        <SpiderWeb size={340} spokes={16} rings={9} anchor="br" />
      </div>

      {/* Trailing thread from web 2 */}
      <svg
        className="absolute bottom-[260px] right-[240px] h-[100px] w-[140px] opacity-[0.05]"
        viewBox="0 0 140 100"
        fill="none"
      >
        <path
          d="M 140 90 Q 100 85, 60 60 Q 30 40, 5 10"
          stroke="var(--node-color)"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeDasharray="3 5"
        />
      </svg>

      {/* --- Web 3: top-right corner -- smaller, delicate accent --- */}
      <div
        className="absolute -right-2 -top-2 opacity-[0.18]"
        style={{ animation: "web-breathe 10s ease-in-out infinite 1.5s" }}
      >
        <SpiderWeb size={220} spokes={10} rings={6} anchor="tr" />
      </div>

      {/* --- Web 4: bottom-left corner -- subtle balancing accent --- */}
      <div
        className="absolute -bottom-2 -left-2 opacity-[0.15]"
        style={{ animation: "web-breathe 11s ease-in-out infinite 5s" }}
      >
        <SpiderWeb size={200} spokes={10} rings={5} anchor="bl" />
      </div>
    </div>
  )
}
