"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { type ReactNode } from "react"

interface SilkCardProps {
  children: ReactNode
  className?: string
  hoverLift?: boolean
}

export function SilkCard({
  children,
  className = "",
  hoverLift = false,
}: SilkCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        y: hoverLift ? -6 : 0,
        boxShadow:
          "0 0 20px oklch(0.88 0.05 260 / 0.15), 0 0 40px oklch(0.65 0.15 290 / 0.08)",
      }}
      whileTap={{
        scaleX: 1.02,
        scaleY: 0.98,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      className={cn(
        "relative rounded-lg border border-border bg-card p-6 text-card-foreground",
        "transition-colors duration-300",
        "hover:border-primary/20",
        className
      )}
    >
      {/* Corner silk accents */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-4 w-4 rounded-tl-lg border-l border-t transition-opacity duration-300"
        style={{
          borderColor: "var(--thread-color)",
          opacity: hovered ? 0.5 : 0,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 rounded-br-lg border-b border-r transition-opacity duration-300"
        style={{
          borderColor: "var(--thread-color)",
          opacity: hovered ? 0.5 : 0,
        }}
        aria-hidden="true"
      />

      {children}
    </motion.div>
  )
}
