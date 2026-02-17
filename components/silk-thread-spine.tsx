"use client"

import { useScroll, useTransform, motion } from "motion/react"
import { useReducedMotion } from "@/lib/use-reduced-motion"

export function SilkThreadSpine() {
  const { scrollYProgress } = useScroll()
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  const reducedMotion = useReducedMotion()

  const mainPath =
    "M 400 0 C 400 200, 600 300, 400 500 S 200 700, 400 900 S 600 1100, 400 1300 S 200 1500, 400 1700 S 600 1900, 400 2100 S 200 2300, 400 2500 S 600 2700, 400 2900 S 200 3100, 400 3300"

  const branchPaths = [
    "M 400 500 C 350 480, 280 470, 220 490",
    "M 400 500 C 450 480, 520 470, 580 490",
    "M 400 900 C 350 880, 260 870, 200 890",
    "M 400 900 C 450 880, 540 870, 600 890",
    "M 400 1300 C 350 1280, 280 1270, 220 1290",
    "M 400 1300 C 450 1280, 520 1270, 580 1290",
    "M 400 1700 C 350 1680, 260 1670, 200 1690",
    "M 400 1700 C 450 1680, 540 1670, 600 1690",
    "M 400 2100 C 350 2080, 280 2070, 220 2090",
    "M 400 2100 C 450 2080, 520 2070, 580 2090",
    "M 400 2500 C 350 2480, 260 2470, 200 2490",
    "M 400 2500 C 450 2480, 540 2470, 600 2490",
    "M 400 2900 C 350 2880, 280 2870, 220 2890",
    "M 400 2900 C 450 2880, 520 2870, 580 2890",
  ]

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] hidden lg:block"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 3600"
        fill="none"
        preserveAspectRatio="none"
        className="h-full w-full"
        style={{ opacity: 0.35 }}
      >
        <defs>
          <filter id="silk-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="silk-glow-sm">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main spine thread -- neon red to match spider formations */}
        <motion.path
          d={mainPath}
          stroke="var(--node-color)"
          strokeWidth={1.2}
          strokeLinecap="round"
          fill="none"
          filter="url(#silk-glow)"
          style={{
            pathLength: reducedMotion ? 1 : pathLength,
          }}
          strokeDashoffset={0}
        />

        {/* Ghost trail behind for extra glow */}
        <motion.path
          d={mainPath}
          stroke="var(--node-color)"
          strokeWidth={4}
          strokeLinecap="round"
          fill="none"
          style={{
            pathLength: reducedMotion ? 1 : pathLength,
            opacity: 0.06,
          }}
          filter="url(#silk-glow)"
          strokeDashoffset={0}
        />

        {/* Branch filaments -- subtle red silk strands */}
        {branchPaths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="var(--node-color)"
            strokeWidth={0.6}
            strokeLinecap="round"
            fill="none"
            filter="url(#silk-glow-sm)"
            style={{
              pathLength: reducedMotion ? 1 : pathLength,
              opacity: 0.25,
            }}
            strokeDashoffset={0}
          />
        ))}
      </svg>
    </div>
  )
}
