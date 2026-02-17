"use client"

import { motion } from "motion/react"

interface HourglassIconProps {
  size?: number
  className?: string
  animated?: boolean
}

/**
 * Black Widow Hourglass -- the brand icon for Webspinner.
 * A stylised hourglass (the red marking on a black widow spider)
 * rendered in SVG with an optional entrance animation.
 */
export function HourglassIcon({
  size = 32,
  className = "",
  animated = true,
}: HourglassIconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
      initial={animated ? { opacity: 0, scale: 0.8 } : false}
      animate={animated ? { opacity: 1, scale: 1 } : false}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
    >
      <defs>
        <linearGradient id="hw-grad" x1="32" y1="8" x2="32" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--color-accent)" />
          <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--color-accent)" />
        </linearGradient>
        <filter id="hw-glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer diamond-like frame -- the body silhouette */}
      <motion.path
        d="M 32 4 L 52 20 L 32 32 L 52 44 L 32 60 L 12 44 L 32 32 L 12 20 Z"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
        filter="url(#hw-glow)"
        initial={animated ? { pathLength: 0 } : false}
        animate={animated ? { pathLength: 1 } : false}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      />

      {/* Inner hourglass fill -- the signature red marking */}
      <motion.path
        d="M 32 14 L 42 22 L 32 32 L 42 42 L 32 50 L 22 42 L 32 32 L 22 22 Z"
        fill="url(#hw-grad)"
        filter="url(#hw-glow)"
        initial={animated ? { opacity: 0, scale: 0.6 } : false}
        animate={animated ? { opacity: 1, scale: 1 } : false}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{ transformOrigin: "32px 32px" }}
      />

      {/* Centre node */}
      <motion.circle
        cx="32"
        cy="32"
        r="2"
        fill="var(--color-foreground)"
        initial={animated ? { opacity: 0 } : false}
        animate={animated ? { opacity: 0.8 } : false}
        transition={{ delay: 1.2 }}
      />
    </motion.svg>
  )
}
