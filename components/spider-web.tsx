"use client"

/**
 * SpiderWeb -- Smooth, silky spider web with soft bezier curves.
 * All geometry is pre-computed at module scope and cached to avoid
 * SSR/client floating-point hydration mismatches.
 */

interface SpiderWebProps {
  size?: number
  className?: string
  spokes?: number
  rings?: number
  anchor?: "tl" | "tr" | "bl" | "br"
}

function buildWeb(
  spokes: number,
  rings: number,
  anchor: "tl" | "tr" | "bl" | "br"
) {
  const cx = anchor === "tl" || anchor === "bl" ? 0 : 200
  const cy = anchor === "tl" || anchor === "tr" ? 0 : 200
  const maxR = 190

  const base =
    anchor === "tl"
      ? 0
      : anchor === "tr"
        ? Math.PI / 2
        : anchor === "bl"
          ? (3 * Math.PI) / 2
          : Math.PI
  const sweep = Math.PI / 2

  // Spoke angles
  const angles: number[] = []
  for (let i = 0; i <= spokes; i++) {
    angles.push(base + (sweep * i) / spokes)
  }

  // Ring radii with tiny organic jitter
  const radii: number[] = []
  for (let r = 1; r <= rings; r++) {
    const v = (maxR * r) / rings + (r % 2 === 0 ? 1.5 : -1)
    radii.push(Math.round(v * 10) / 10)
  }

  const r2 = (n: number) => Math.round(n * 10) / 10

  // Spoke lines
  const spokeLines = angles.map((a) => ({
    x1: String(cx),
    y1: String(cy),
    x2: String(r2(cx + Math.cos(a) * maxR)),
    y2: String(r2(cy + Math.sin(a) * maxR)),
  }))

  // Smooth ring paths using cubic bezier curves (C command)
  // instead of quadratic (Q) for silkier connections
  const ringPaths = radii.map((radius) => {
    const pts = angles.map((a) => ({
      x: r2(cx + Math.cos(a) * radius),
      y: r2(cy + Math.sin(a) * radius),
    }))

    let d = `M ${pts[0].x} ${pts[0].y}`
    for (let i = 1; i < pts.length; i++) {
      const p = pts[i - 1]
      const c = pts[i]
      // Pull control points gently inward for the classic silk sag
      const mx = (p.x + c.x) / 2
      const my = (p.y + c.y) / 2
      const inwardX = r2(mx + (cx - mx) * 0.08)
      const inwardY = r2(my + (cy - my) * 0.08)
      // Two smooth control points for a cubic bezier
      const cp1x = r2(p.x + (inwardX - p.x) * 0.6)
      const cp1y = r2(p.y + (inwardY - p.y) * 0.6)
      const cp2x = r2(c.x + (inwardX - c.x) * 0.6)
      const cp2y = r2(c.y + (inwardY - c.y) * 0.6)
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${c.x} ${c.y}`
    }
    return d
  })

  // Gentle wisp ends on every 3rd spoke
  const wisps = angles
    .filter((_, i) => i % 3 === 0)
    .map((a) => {
      const sx = r2(cx + Math.cos(a) * maxR)
      const sy = r2(cy + Math.sin(a) * maxR)
      const ex = r2(cx + Math.cos(a) * (maxR + 16))
      const ey = r2(cy + Math.sin(a) * (maxR + 16))
      const cpx = r2((sx + ex) / 2 + 2)
      const cpy = r2((sy + ey) / 2 + 3)
      return `M ${sx} ${sy} Q ${cpx} ${cpy}, ${ex} ${ey}`
    })

  return { spokeLines, ringPaths, wisps, cx, cy }
}

const cache = new Map<string, ReturnType<typeof buildWeb>>()
function getWeb(
  spokes: number,
  rings: number,
  anchor: "tl" | "tr" | "bl" | "br"
) {
  const k = `${spokes}-${rings}-${anchor}`
  if (!cache.has(k)) cache.set(k, buildWeb(spokes, rings, anchor))
  return cache.get(k)!
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
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feComposite in="blur" in2="SourceGraphic" operator="over" />
        </filter>
      </defs>

      <g filter={`url(#web-glow-${anchor})`}>
        {/* Radial spokes */}
        {spokeLines.map((l, i) => (
          <line
            key={`s-${i}`}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="var(--node-color)"
            strokeWidth="0.5"
            opacity="0.6"
          />
        ))}

        {/* Silky concentric rings */}
        {ringPaths.map((d, i) => (
          <path
            key={`r-${i}`}
            d={d}
            stroke="var(--node-color)"
            strokeWidth={i < 2 ? "0.35" : "0.5"}
            strokeLinecap="round"
            opacity={0.3 + i * 0.06}
          />
        ))}

        {/* Wisps */}
        {wisps.map((d, i) => (
          <path
            key={`w-${i}`}
            d={d}
            stroke="var(--node-color)"
            strokeWidth="0.3"
            strokeLinecap="round"
            strokeDasharray="3 4"
            opacity="0.25"
          />
        ))}

        {/* Centre node */}
        <circle cx={cx} cy={cy} r="1.8" fill="var(--node-color)" opacity="0.45" />
      </g>
    </svg>
  )
}
