"use client"

/**
 * SpiderWeb -- A realistic, intricate spider web rendered as SVG.
 * All geometry is pre-computed outside render to avoid SSR/client
 * floating-point hydration mismatches. Values are rounded to 1 decimal.
 */

interface SpiderWebProps {
  size?: number
  className?: string
  spokes?: number
  rings?: number
  anchor?: "tl" | "tr" | "bl" | "br"
}

// Pre-compute all geometry outside of render
function buildWeb(spokes: number, rings: number, anchor: "tl" | "tr" | "bl" | "br") {
  const cx = anchor === "tl" || anchor === "bl" ? 0 : 200
  const cy = anchor === "tl" || anchor === "tr" ? 0 : 200
  const maxRadius = 190

  const baseAngle =
    anchor === "tl" ? 0 :
    anchor === "tr" ? Math.PI / 2 :
    anchor === "bl" ? (3 * Math.PI) / 2 :
    Math.PI

  const sweep = Math.PI / 2
  const spokeAngles: number[] = []
  for (let i = 0; i <= spokes; i++) {
    spokeAngles.push(baseAngle + (sweep * i) / spokes)
  }

  // Ring radii with organic irregularity
  const ringRadii: number[] = []
  for (let r = 1; r <= rings; r++) {
    const base = (maxRadius * r) / rings
    const jitter = r % 2 === 0 ? 2 : -1.5
    ringRadii.push(Math.round((base + jitter) * 10) / 10)
  }

  // Spoke lines -- use string coords to prevent hydration mismatch
  const spokeLines = spokeAngles.map((angle) => ({
    x1: String(cx),
    y1: String(cy),
    x2: String(Math.round((cx + Math.cos(angle) * maxRadius) * 10) / 10),
    y2: String(Math.round((cy + Math.sin(angle) * maxRadius) * 10) / 10),
  }))

  // Ring paths
  const ringPaths = ringRadii.map((radius) => {
    const points = spokeAngles.map((angle) => ({
      x: Math.round((cx + Math.cos(angle) * radius) * 10) / 10,
      y: Math.round((cy + Math.sin(angle) * radius) * 10) / 10,
    }))

    let d = `M ${points[0].x} ${points[0].y}`
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      const midX = (prev.x + curr.x) / 2
      const midY = (prev.y + curr.y) / 2
      const pullX = Math.round((midX + (cx - midX) * 0.12) * 10) / 10
      const pullY = Math.round((midY + (cy - midY) * 0.12) * 10) / 10
      d += ` Q ${pullX} ${pullY}, ${curr.x} ${curr.y}`
    }
    return d
  })

  // Anchor wisps
  const wisps = spokeAngles
    .filter((_, i) => i % 3 === 0)
    .map((angle) => {
      const sx = Math.round((cx + Math.cos(angle) * maxRadius) * 10) / 10
      const sy = Math.round((cy + Math.sin(angle) * maxRadius) * 10) / 10
      const ex = Math.round((cx + Math.cos(angle) * (maxRadius + 18)) * 10) / 10
      const ey = Math.round((cy + Math.sin(angle) * (maxRadius + 18)) * 10) / 10
      const cpx = Math.round(((sx + ex) / 2 + 3) * 10) / 10
      const cpy = Math.round(((sy + ey) / 2 + 5) * 10) / 10
      return `M ${sx} ${sy} Q ${cpx} ${cpy}, ${ex} ${ey}`
    })

  return { spokeLines, ringPaths, wisps, cx, cy }
}

// Cache web geometries by key
const webCache = new Map<string, ReturnType<typeof buildWeb>>()
function getWeb(spokes: number, rings: number, anchor: "tl" | "tr" | "bl" | "br") {
  const key = `${spokes}-${rings}-${anchor}`
  if (!webCache.has(key)) {
    webCache.set(key, buildWeb(spokes, rings, anchor))
  }
  return webCache.get(key)!
}

export function SpiderWeb({
  size = 200,
  className = "",
  spokes = 12,
  rings = 7,
  anchor = "tl",
}: SpiderWebProps) {
  const { spokeLines, ringPaths, wisps, cx, cy } = getWeb(spokes, rings, anchor)

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

        {/* Anchor wisps */}
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

        {/* Centre dewdrop */}
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
