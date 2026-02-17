"use client"

/**
 * SpiderWeb -- Realistic corner spider webs using only open-path strands.
 *
 * Key differences from the previous version:
 * - NO closed spiral loops (those created the triangular/polygon look)
 * - All spiral/capture strands are OPEN curves between spokes
 * - The bottom-right web has its own distinct hand-crafted geometry
 * - Natural sag, irregular spacing, and broken strands for realism
 */

interface SpiderWebProps {
  size?: number
  className?: string
  anchor?: "tl" | "br"
}

// ─── TOP-LEFT WEB ────────────────────────────────────────────────
// Orb-weaver web anchored into a top-left corner.
// Hub at roughly (22, 20). Spokes fan out unevenly.
// Capture strands are individual arcs between adjacent spoke intersections.
const TL_WEB = {
  // Anchor frame -- thick structural threads attaching to the wall/ceiling
  frame: [
    "M 0 6 Q 50 10, 110 28 Q 150 42, 190 68",
    "M 6 0 Q 12 48, 24 96 Q 38 140, 62 186",
    "M 190 68 Q 130 120, 62 186",
  ],
  // Radial spokes from the hub outward -- irregular angles
  spokes: [
    "M 22 20 L 0 6",
    "M 22 20 L 6 0",
    "M 22 20 Q 46 14, 78 12",
    "M 22 20 Q 58 20, 110 28",
    "M 22 20 Q 68 30, 148 48",
    "M 22 20 Q 58 44, 122 82",
    "M 22 20 Q 48 54, 88 116",
    "M 22 20 Q 34 60, 62 134",
    "M 22 20 Q 18 52, 24 96",
    "M 22 20 Q 52 38, 104 56",
  ],
  // Capture strands -- open arcs connecting adjacent spokes at various distances.
  // Each row is one "ring" moving outward from the hub.
  // Arcs sag slightly inward (like silk under gravity).
  capture: [
    // Ring 1 (close to hub, ~15px out)
    "M 10 14 Q 14 8, 22 10",
    "M 22 10 Q 30 10, 34 14",
    "M 34 14 Q 36 20, 34 26",
    "M 34 26 Q 28 30, 22 28",
    "M 22 28 Q 16 26, 12 22",
    "M 12 22 Q 8 18, 10 14",
    // Ring 2 (~30px out)
    "M 4 22 Q 8 6, 30 4",
    "M 30 4 Q 50 6, 56 16",
    "M 56 16 Q 62 28, 54 42",
    "M 54 42 Q 44 52, 30 48",
    "M 30 48 Q 16 42, 10 32",
    // Ring 3 (~55px out)
    "M 2 40 Q 6 12, 46 4",
    "M 46 4 Q 76 6, 86 22",
    "M 86 22 Q 96 40, 84 62",
    "M 84 62 Q 70 80, 44 78",
    "M 44 78 Q 22 70, 12 50",
    // Ring 4 (~85px out)
    "M 4 62 Q 6 22, 66 6",
    "M 66 6 Q 104 10, 118 34",
    "M 118 34 Q 130 56, 114 88",
    "M 114 88 Q 96 112, 60 110",
    "M 60 110 Q 28 100, 14 72",
    // Ring 5 (outer, ~120px, more visible sag)
    "M 6 86 Q 8 34, 90 10",
    "M 90 10 Q 138 16, 156 48",
    "M 156 48 Q 168 78, 148 118",
    "M 148 118 Q 122 148, 74 144",
    "M 74 144 Q 32 132, 16 96",
  ],
  // Dangling/broken strands
  loose: [
    "M 62 186 Q 58 194, 54 200",
    "M 190 68 Q 196 72, 200 74",
    "M 88 116 Q 92 126, 90 138",
  ],
}

// ─── BOTTOM-RIGHT WEB ────────────────────────────────────────────
// A distinctly different web -- fewer spokes, wider spiral spacing,
// slightly different proportions. Hub at roughly (178, 180).
const BR_WEB = {
  frame: [
    "M 200 192 Q 146 188, 86 172 Q 42 156, 8 132",
    "M 192 200 Q 186 150, 174 102 Q 160 60, 138 14",
    "M 8 132 Q 66 80, 138 14",
  ],
  spokes: [
    "M 178 180 L 200 192",
    "M 178 180 L 192 200",
    "M 178 180 Q 154 184, 118 188",
    "M 178 180 Q 140 176, 86 172",
    "M 178 180 Q 130 166, 46 148",
    "M 178 180 Q 144 152, 76 112",
    "M 178 180 Q 158 142, 118 78",
    "M 178 180 Q 168 138, 148 66",
    "M 178 180 Q 180 146, 174 102",
  ],
  capture: [
    // Ring 1
    "M 190 184 Q 186 190, 180 190",
    "M 180 190 Q 174 190, 170 186",
    "M 170 186 Q 168 180, 170 174",
    "M 170 174 Q 176 170, 182 172",
    "M 182 172 Q 188 176, 190 184",
    // Ring 2
    "M 196 176 Q 190 194, 170 196",
    "M 170 196 Q 150 194, 144 182",
    "M 144 182 Q 138 168, 148 156",
    "M 148 156 Q 160 146, 174 150",
    "M 174 150 Q 188 158, 194 172",
    // Ring 3
    "M 198 162 Q 192 196, 156 198",
    "M 156 198 Q 122 194, 112 172",
    "M 112 172 Q 102 150, 116 128",
    "M 116 128 Q 134 112, 160 120",
    "M 160 120 Q 184 132, 196 158",
    // Ring 4
    "M 196 144 Q 190 198, 136 200",
    "M 136 200 Q 90 192, 78 164",
    "M 78 164 Q 66 134, 84 104",
    "M 84 104 Q 106 78, 142 88",
    "M 142 88 Q 178 102, 194 140",
    // Ring 5 (outermost)
    "M 198 120 Q 192 200, 108 200",
    "M 108 200 Q 52 190, 38 152",
    "M 38 152 Q 24 114, 50 76",
    "M 50 76 Q 82 44, 128 58",
    "M 128 58 Q 172 76, 196 118",
  ],
  loose: [
    "M 138 14 Q 134 6, 130 0",
    "M 8 132 Q 2 128, 0 126",
    "M 118 78 Q 112 66, 116 54",
    "M 46 148 Q 38 152, 34 160",
  ],
}

export function SpiderWeb({
  size = 200,
  className = "",
  anchor = "tl",
}: SpiderWebProps) {
  const web = anchor === "tl" ? TL_WEB : BR_WEB
  const filterId = `rweb-glow-${anchor}`
  const hubX = anchor === "tl" ? "22" : "178"
  const hubY = anchor === "tl" ? "20" : "180"

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
        <filter id={filterId}>
          <feGaussianBlur stdDeviation="0.6" result="blur" />
          <feComposite in="blur" in2="SourceGraphic" operator="over" />
        </filter>
      </defs>

      <g filter={`url(#${filterId})`}>
        {/* Structural frame -- thickest threads */}
        {web.frame.map((d, i) => (
          <path
            key={`f-${i}`}
            d={d}
            stroke="var(--node-color)"
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity="0.5"
          />
        ))}

        {/* Radial spokes -- medium weight */}
        {web.spokes.map((d, i) => (
          <path
            key={`s-${i}`}
            d={d}
            stroke="var(--node-color)"
            strokeWidth="0.45"
            strokeLinecap="round"
            opacity="0.4"
          />
        ))}

        {/* Capture strands -- thin arcs between spokes */}
        {web.capture.map((d, i) => (
          <path
            key={`c-${i}`}
            d={d}
            stroke="var(--node-color)"
            strokeWidth="0.35"
            strokeLinecap="round"
            opacity={0.18 + (i % 6) * 0.03}
          />
        ))}

        {/* Loose / broken strands */}
        {web.loose.map((d, i) => (
          <path
            key={`l-${i}`}
            d={d}
            stroke="var(--node-color)"
            strokeWidth="0.25"
            strokeLinecap="round"
            strokeDasharray="2 4"
            opacity="0.18"
          />
        ))}

        {/* Hub dot */}
        <circle cx={hubX} cy={hubY} r="2" fill="var(--node-color)" opacity="0.3" />
        <circle cx={hubX} cy={hubY} r="0.8" fill="var(--node-color)" opacity="0.5" />
      </g>
    </svg>
  )
}
