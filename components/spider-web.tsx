"use client"

/**
 * SpiderWeb -- A realistic, intricate spider web rendered as SVG.
 * Features radial spokes from a centre point with concentric spiral
 * silk strands connecting them, plus tiny anchor-thread wisps at the
 * outer edges. Glows faintly in neon red via an SVG filter.
 * Designed to sit at corners/edges as an elegant decorative motif.
 */

interface SpiderWebProps {
  size?: number
  className?: string
  /** Number of radial spokes */
  spokes?: number
  /** Number of concentric rings */
  rings?: number
  /** Anchor the web to a specific corner: tl, tr, bl, br */
  anchor?: "tl" | "tr" | "bl" | "br"
}

export function SpiderWeb({
  size = 200,
  className = "",
  spokes = 12,
  rings = 7,
  anchor = "tl",
}: SpiderWebProps) {
  // Centre of the web is at the anchor corner
  const cx = anchor === "tl" || anchor === "bl" ? 0 : 200
  const cy = anchor === "tl" || anchor === "tr" ? 0 : 200
  const maxRadius = 190

  // Pre-compute spoke angles -- spread into the quadrant opposite the anchor
  const baseAngle =
    anchor === "tl" ? 0 :
    anchor === "tr" ? Math.PI / 2 :
    anchor === "bl" ? (3 * Math.PI) / 2 :
    Math.PI

  const spokeAngles: number[] = []
  const sweep = Math.PI / 2 // 90-degree quadrant
  for (let i = 0; i <= spokes; i++) {
    spokeAngles.push(baseAngle + (sweep * i) / spokes)
  }

  // Pre-compute ring radii with slight organic irregularity
  const ringRadii: number[] = []
  for (let r = 1; r <= rings; r++) {
    const base = (maxRadius * r) / rings
    // Alternate slight expansion/contraction for organic feel
    const jitter = r % 2 === 0 ? 2 : -1.5
    ringRadii.push(Math.round((base + jitter) * 10) / 10)
  }

  // Build spoke lines
  const spokeLines = spokeAngles.map((angle) => {
    const x2 = Math.round((cx + Math.cos(angle) * maxRadius) * 10) / 10
    const y2 = Math.round((cy + Math.sin(angle) * maxRadius) * 10) / 10
    return { x1: cx, y1: cy, x2, y2 }
  })

  // Build spiral ring paths -- each ring connects points on adjacent spokes
  // with slight catenary sag between them (quadratic bezier dipping inward)
  const ringPaths = ringRadii.map((radius) => {
    const points = spokeAngles.map((angle) => ({
      x: Math.round((cx + Math.cos(angle) * radius) * 10) / 10,
      y: Math.round((cy + Math.sin(angle) * radius) * 10) / 10,
    }))

    // Connect points with subtle inward-sagging curves
    let d = `M ${points[0].x} ${points[0].y}`
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      // Control point pulled slightly toward centre for natural sag
      const midX = (prev.x + curr.x) / 2
      const midY = (prev.y + curr.y) / 2
      const pullX = Math.round((midX + (cx - midX) * 0.12) * 10) / 10
      const pullY = Math.round((midY + (cy - midY) * 0.12) * 10) / 10
      d += ` Q ${pullX} ${pullY}, ${curr.x} ${curr.y}`
    }
    return d
  })

  // Tiny anchor wisps -- short silk threads dangling from outer ring points
  const wisps = spokeAngles
    .filter((_, i) => i % 3 === 0)
    .map((angle) => {
      const startX = Math.round((cx + Math.cos(angle) * maxRadius) * 10) / 10
      const startY = Math.round((cy + Math.sin(angle) * maxRadius) * 10) / 10
      const endX = Math.round((cx + Math.cos(angle) * (maxRadius + 18)) * 10) / 10
      const endY = Math.round((cy + Math.sin(angle) * (maxRadius + 18)) * 10) / 10
      // slight droop
      const cpX = Math.round(((startX + endX) / 2 + 3) * 10) / 10
      const cpY = Math.round(((startY + endY) / 2 + 5) * 10) / 10
      return `M ${startX} ${startY} Q ${cpX} ${cpY}, ${endX} ${endY}`
    })

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <filter id={`web-glow-${anchor}`}>
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="blur" in2="SourceGraphic" operator="over" />
        </filter>
      </defs>

      <g filter={`url(#web-glow-${anchor})`}>
        {/* Radial spokes */}
        {spokeLines.map((line, i) => (
          <line
            key={`spoke-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="var(--node-color)"
            strokeWidth="0.6"
            opacity="0.7"
          />
        ))}

        {/* Concentric spiral rings */}
        {ringPaths.map((d, i) => (
          <path
            key={`ring-${i}`}
            d={d}
            stroke="var(--node-color)"
            strokeWidth={i < 2 ? "0.4" : "0.55"}
            strokeLinecap="round"
            opacity={0.35 + i * 0.06}
          />
        ))}

        {/* Anchor wisps -- tiny dangling threads at the edge */}
        {wisps.map((d, i) => (
          <path
            key={`wisp-${i}`}
            d={d}
            stroke="var(--node-color)"
            strokeWidth="0.35"
            strokeLinecap="round"
            strokeDasharray="3 4"
            opacity="0.3"
          />
        ))}

        {/* Centre dewdrop -- tiny glowing dot at the web hub */}
        <circle
          cx={cx}
          cy={cy}
          r="2"
          fill="var(--node-color)"
          opacity="0.5"
        />
      </g>
    </svg>
  )
}
