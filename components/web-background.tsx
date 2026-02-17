"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useReducedMotion } from "@/lib/use-reduced-motion"

/**
 * WebBackground -- A full-page static spider web rendered as a fixed SVG,
 * with a scroll-driven hourglass icon that fills in at the centre.
 */
export function WebBackground() {
  const stroke = "var(--node-color)"
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  // Hourglass draws quickly within the first 25% of scroll -- kept subtle
  const iconPath = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const iconFill = useTransform(scrollYProgress, [0.1, 0.25], [0, 0.25])
  const iconGlow = useTransform(scrollYProgress, [0.12, 0.25], [0, 0.18])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      role="presentation"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <filter id="web-bg-glow">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feComposite in="blur" in2="SourceGraphic" operator="over" />
          </filter>
          {/* Radial mask: centre is transparent (black), fading to visible (white).
              This prevents overlapping spoke strokes from accumulating at the hub. */}
          <radialGradient id="centre-fade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="black" />
            <stop offset="12%" stopColor="#333" />
            <stop offset="22%" stopColor="white" />
            <stop offset="100%" stopColor="white" />
          </radialGradient>
          <mask id="hub-mask">
            <rect width="1000" height="1000" fill="url(#centre-fade)" />
          </mask>
        </defs>

        <g filter="url(#web-bg-glow)" mask="url(#hub-mask)">

          {/* ═══ RADIAL SPOKES ═══ */}
          {[
            { d: "M 500 500 Q 490 340, 470 60",  w: 0.7, o: 0.16 },
            { d: "M 500 500 Q 510 320, 540 20",   w: 0.6, o: 0.14 },
            { d: "M 500 500 Q 460 360, 360 30",   w: 0.6, o: 0.13 },
            { d: "M 500 500 Q 580 380, 740 80",   w: 0.7, o: 0.16 },
            { d: "M 500 500 Q 620 400, 860 180",  w: 0.6, o: 0.14 },
            { d: "M 500 500 Q 640 440, 950 290",  w: 0.6, o: 0.12 },
            { d: "M 500 500 Q 660 490, 960 470",  w: 0.7, o: 0.16 },
            { d: "M 500 500 Q 660 520, 980 560",  w: 0.6, o: 0.14 },
            { d: "M 500 500 Q 620 600, 870 840",  w: 0.7, o: 0.16 },
            { d: "M 500 500 Q 580 630, 740 940",  w: 0.6, o: 0.14 },
            { d: "M 500 500 Q 640 560, 960 720",  w: 0.6, o: 0.12 },
            { d: "M 500 500 Q 510 680, 530 960",  w: 0.7, o: 0.16 },
            { d: "M 500 500 Q 480 660, 440 980",  w: 0.6, o: 0.14 },
            { d: "M 500 500 Q 540 680, 620 970",  w: 0.6, o: 0.12 },
            { d: "M 500 500 Q 380 600, 140 830",  w: 0.7, o: 0.16 },
            { d: "M 500 500 Q 420 620, 260 920",  w: 0.6, o: 0.14 },
            { d: "M 500 500 Q 340 510, 40 540",   w: 0.7, o: 0.16 },
            { d: "M 500 500 Q 340 480, 20 440",   w: 0.6, o: 0.14 },
            { d: "M 500 500 Q 360 550, 60 680",   w: 0.6, o: 0.12 },
            { d: "M 500 500 Q 380 380, 120 120",  w: 0.7, o: 0.16 },
            { d: "M 500 500 Q 420 400, 200 200",  w: 0.6, o: 0.14 },
            { d: "M 500 500 Q 360 440, 50 320",   w: 0.6, o: 0.12 },
          ].map((s, i) => (
            <path
              key={`spoke-${i}`}
              d={s.d}
              stroke={stroke}
              strokeWidth={s.w}
              opacity={s.o}
              strokeLinecap="round"
            />
          ))}

          {/* ═══ RING 3 (~220px) ═══ */}
          {[
            "M 460 282 Q 352 276, 296 356",
            "M 296 356 Q 248 432, 260 530",
            "M 260 530 Q 278 622, 360 684",
            "M 360 684 Q 448 738, 556 710",
            "M 556 710 Q 656 678, 716 588",
            "M 716 588 Q 756 504, 724 408",
            "M 724 408 Q 684 316, 576 282",
            "M 576 282 Q 510 270, 460 282",
          ].map((d, i) => (
            <path
              key={`r3-${i}`}
              d={d}
              stroke={stroke}
              strokeWidth="0.5"
              opacity={0.11}
              strokeLinecap="round"
            />
          ))}

          {/* ═══ RING 4 (~340px) ═══ */}
          {[
            "M 442 164 Q 276 156, 186 286",
            "M 186 286 Q 108 406, 132 560",
            "M 132 560 Q 160 700, 298 792",
            "M 298 792 Q 436 870, 602 828",
            "M 602 828 Q 756 780, 834 646",
            "M 834 646 Q 896 520, 852 372",
            "M 852 372 Q 798 232, 636 168",
            "M 636 168 Q 530 136, 442 164",
          ].map((d, i) => (
            <path
              key={`r4-${i}`}
              d={d}
              stroke={stroke}
              strokeWidth="0.45"
              opacity={0.09}
              strokeLinecap="round"
            />
          ))}

          {/* ═══ RING 5 (outermost ~460px) ═══ */}
          {[
            "M 430 44  Q 208 38, 80 220",
            "M 80 220  Q -24 396, 20 600",
            "M 20 600  Q 64 792, 250 912",
            "M 250 912 Q 438 1006, 660 948",
            "M 660 948 Q 862 882, 948 702",
            "M 948 702 Q 1016 530, 962 334",
            "M 962 334 Q 898 148, 690 56",
            "M 690 56  Q 550 10, 430 44",
          ].map((d, i) => (
            <path
              key={`r5-${i}`}
              d={d}
              stroke={stroke}
              strokeWidth="0.4"
              opacity={0.07}
              strokeLinecap="round"
            />
          ))}

          {/* ═══ DANGLING WISPS ═══ */}
          {[
            "M 470 60  Q 466 30, 462 8",
            "M 960 470 Q 978 468, 996 472",
            "M 530 960 Q 534 978, 532 996",
            "M 40  540 Q 22  538, 4   542",
            "M 120 120 Q 100 100, 78  76",
            "M 870 840 Q 888 860, 904 882",
            "M 140 830 Q 118 854, 96  876",
            "M 740 80  Q 754 62,  770 42",
          ].map((d, i) => (
            <path
              key={`wisp-${i}`}
              d={d}
              stroke={stroke}
              strokeWidth="0.35"
              strokeDasharray="3 5"
              opacity={0.08}
              strokeLinecap="round"
            />
          ))}


        </g>

        {/* ═══ CENTRE HOURGLASS ICON -- draws in as user scrolls ═══ */}
        <defs>
          <linearGradient id="hw-bg-grad" x1="500" y1="460" x2="500" y2="540" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--node-color)" />
            <stop offset="50%" stopColor="var(--node-color)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--node-color)" />
          </linearGradient>
          <filter id="hw-bg-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer diamond frame */}
        <motion.path
          d="M 500 462 L 530 478 L 500 500 L 530 522 L 500 538 L 470 522 L 500 500 L 470 478 Z"
          stroke="var(--node-color)"
          strokeWidth="1.2"
          strokeLinejoin="round"
          fill="none"
          filter="url(#hw-bg-glow)"
          style={{
            pathLength: reducedMotion ? 1 : iconPath,
            opacity: reducedMotion ? 0.5 : iconGlow,
          }}
        />

        {/* Inner hourglass fill */}
        <motion.path
          d="M 500 470 L 518 480 L 500 500 L 518 520 L 500 530 L 482 520 L 500 500 L 482 480 Z"
          fill="url(#hw-bg-grad)"
          filter="url(#hw-bg-glow)"
          style={{
            opacity: reducedMotion ? 0.4 : iconFill,
            transformOrigin: "500px 500px",
          }}
        />

        {/* Centre dot */}
        <motion.circle
          cx="500"
          cy="500"
          r="2"
          fill="var(--color-foreground)"
          style={{ opacity: reducedMotion ? 0.5 : iconGlow }}
        />
      </svg>
    </div>
  )
}
