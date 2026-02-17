"use client"

import { SpiderWeb } from "@/components/spider-web"

/**
 * WebBackground -- Two elegant spider webs at opposite corners,
 * each with smooth, silky bezier curves. Minimalist and unobtrusive.
 */
export function WebBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      role="presentation"
      aria-hidden="true"
    >
      {/* Subtle ambient glow */}
      <div
        className="absolute left-1/2 top-[12%] h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.24 25 / 0.03) 0%, transparent 60%)",
        }}
      />

      {/* Web 1: top-left corner */}
      <div
        className="absolute -left-2 -top-2 opacity-[0.28]"
        style={{ animation: "web-breathe 12s ease-in-out infinite" }}
      >
        <SpiderWeb size={300} spokes={12} rings={7} anchor="tl" />
      </div>

      {/* Web 2: bottom-right corner */}
      <div
        className="absolute -bottom-2 -right-2 opacity-[0.22]"
        style={{ animation: "web-breathe 14s ease-in-out infinite 3s" }}
      >
        <SpiderWeb size={340} spokes={14} rings={8} anchor="br" />
      </div>
    </div>
  )
}
