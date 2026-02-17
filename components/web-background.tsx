"use client"

/**
 * WebBackground -- a minimal ambient radial gradient that adds depth
 * without the visual clutter of a full animated spider-web canvas.
 * A subtle crimson-tinged glow sits behind the hero area, fading out,
 * while faint concentric rings hint at the web motif at very low opacity.
 */
export function WebBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      role="presentation"
      aria-hidden="true"
    >
      {/* Primary ambient glow -- warm crimson center fading to black */}
      <div
        className="absolute left-1/2 top-[15%] h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.24 25 / 0.045) 0%, transparent 65%)",
        }}
      />

      {/* Secondary soft glow lower on page */}
      <div
        className="absolute left-1/3 top-[55%] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.24 25 / 0.025) 0%, transparent 60%)",
        }}
      />

      {/* Very faint concentric rings -- a ghost-web motif, static */}
      <svg
        viewBox="0 0 1000 1000"
        className="absolute left-1/2 top-[20%] h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-[0.018]"
        fill="none"
      >
        {[180, 280, 400, 500].map((r) => (
          <circle
            key={r}
            cx="500"
            cy="500"
            r={r}
            stroke="var(--thread-color)"
            strokeWidth="0.5"
          />
        ))}
        {/* A few radial spokes for the web feel */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180
          const x2 = (500 + Math.cos(rad) * 500).toFixed(2)
          const y2 = (500 + Math.sin(rad) * 500).toFixed(2)
          return (
            <line
              key={deg}
              x1="500"
              y1="500"
              x2={x2}
              y2={y2}
              stroke="var(--thread-color)"
              strokeWidth="0.3"
            />
          )
        })}
      </svg>
    </div>
  )
}
