"use client"

import { SpiderWeb } from "@/components/spider-web"

/**
 * WebBackground -- A single large realistic spider web draped from the
 * top-centre of the viewport, spanning roughly halfway down the page.
 * Replaces the previous two corner-anchored webs for a cleaner,
 * more balanced visual.
 */
export function WebBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      role="presentation"
      aria-hidden="true"
    >
      {/* Subtle ambient red glow centred behind the web */}
      <div
        className="absolute left-1/2 top-[18%] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.24 25 / 0.025) 0%, transparent 55%)",
        }}
      />

      {/* Single centred web -- top-left geometry rotated 135deg so it
          drapes downward from top-centre, spanning ~50vh */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 opacity-[0.22]"
        style={{
          width: "min(700px, 85vw)",
          height: "50vh",
          animation: "web-breathe 14s ease-in-out infinite",
        }}
      >
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 origin-top"
          style={{
            transform: "translateX(-50%) rotate(135deg)",
            width: "min(700px, 85vw)",
            height: "min(700px, 85vw)",
          }}
        >
          <SpiderWeb size={700} anchor="tl" />
        </div>
      </div>
    </div>
  )
}
