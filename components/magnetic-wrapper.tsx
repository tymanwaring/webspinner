"use client"

import { motion } from "motion/react"
import { type ReactNode } from "react"
import { useReducedMotion } from "@/lib/use-reduced-motion"

interface MagneticWrapperProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticWrapper({
  children,
  className = "",
  strength = 6,
}: MagneticWrapperProps) {
  const reducedMotion = useReducedMotion()

  // Keep "strength" as a backwards-compatible intensity control.
  const hoverScale = 1 + Math.max(0, Math.min(strength, 10)) * 0.003

  return (
    <motion.div
      className={`inline-block ${className}`}
      whileHover={reducedMotion ? undefined : { scale: hoverScale }}
      whileTap={reducedMotion ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
    >
      {children}
    </motion.div>
  )
}
