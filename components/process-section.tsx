"use client"

import {
  Search,
  PenTool,
  Code,
  Sparkles,
  Rocket,
} from "lucide-react"
import React, { useRef } from "react"
import { useScroll, useTransform, motion, useInView } from "motion/react"
import { processSteps } from "@/lib/data"
import { SectionHeading } from "@/components/section-heading"
import { SpringReveal } from "@/components/spring-reveal"
import { SilkCard } from "@/components/silk-card"
import { useReducedMotion } from "@/lib/use-reduced-motion"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  PenTool,
  Code,
  Sparkles,
  Rocket,
}

/**
 * A vertical silk thread connecting the first timeline dot to the last.
 *
 * It measures the actual DOM positions of the first and last WebNode dots,
 * then absolutely positions the SVG to span exactly between them.
 * The path passes straight through each dot with subtle lateral drift.
 */
function SilkTimeline({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [bounds, setBounds] = React.useState<{ top: number; height: number } | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const pathLength = useTransform(scrollYProgress, [0.05, 0.85], [0, 1])

  // Measure from first dot to last dot on mount and resize
  React.useEffect(() => {
    function measure() {
      const container = containerRef.current
      if (!container) return
      const dots = container.querySelectorAll<HTMLElement>("[data-timeline-dot]")
      if (dots.length < 2) return
      const first = dots[0]
      const last = dots[dots.length - 1]
      const containerRect = container.getBoundingClientRect()
      const firstRect = first.getBoundingClientRect()
      const lastRect = last.getBoundingClientRect()
      // Centre of first dot relative to container
      const topOffset = firstRect.top + firstRect.height / 2 - containerRect.top
      // Centre of last dot relative to container
      const bottomCentre = lastRect.top + lastRect.height / 2 - containerRect.top
      setBounds({ top: topOffset, height: bottomCentre - topOffset })
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [containerRef])

  // Thread passes through 5 evenly-spaced dots (y = 0, 125, 250, 375, 500)
  const threadPath = [
    "M 50 0",
    "C 53 42, 47 83, 50 125",
    "C 53 167, 47 208, 50 250",
    "C 47 292, 53 333, 50 375",
    "C 47 417, 53 458, 50 500",
  ].join(" ")

  if (!bounds) return null

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute left-6 w-[100px] md:left-1/2 md:-translate-x-[50px]"
      style={{ top: bounds.top, height: bounds.height }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 500"
        preserveAspectRatio="none"
        fill="none"
        className="h-full w-full"
      >
        <defs>
          <filter id="timeline-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Faint ghost trail */}
        <path
          d={threadPath}
          stroke="var(--thread-color)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.08"
        />

        {/* Animated silk thread */}
        <motion.path
          d={threadPath}
          stroke="var(--node-color)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#timeline-glow)"
          style={{
            pathLength: reducedMotion ? 1 : pathLength,
            opacity: 0.55,
          }}
        />

        {/* Thicker glow behind */}
        <motion.path
          d={threadPath}
          stroke="var(--node-color)"
          strokeWidth="4"
          strokeLinecap="round"
          style={{
            pathLength: reducedMotion ? 1 : pathLength,
            opacity: 0.08,
          }}
          filter="url(#timeline-glow)"
        />
      </svg>
    </div>
  )
}

/**
 * A small web-like connector between the spine and the card,
 * rendered as a curved filament rather than a straight line.
 */
function WebFilament({
  direction,
  index,
}: {
  direction: "left" | "right"
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const reducedMotion = useReducedMotion()

  // Organic curving filament
  const path =
    direction === "right"
      ? "M 0 20 C 15 12, 40 28, 55 16 S 75 22, 90 20"
      : "M 90 20 C 75 12, 50 28, 35 16 S 15 22, 0 20"

  return (
    <div ref={ref} className="h-10 w-24" aria-hidden="true">
      <svg viewBox="0 0 90 40" fill="none" className="h-full w-full">
        <defs>
          <filter id={`fil-glow-${direction}-${index}`}>
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d={path}
          stroke="var(--node-color)"
          strokeWidth={0.6}
          strokeLinecap="round"
          fill="none"
          filter={`url(#fil-glow-${direction}-${index})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isInView
              ? { pathLength: 1, opacity: 0.25 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  pathLength: {
                    duration: 0.8,
                    delay: index * 0.12,
                    ease: "easeOut",
                  },
                  opacity: { duration: 0.3, delay: index * 0.12 },
                }
          }
        />
      </svg>
    </div>
  )
}

/**
 * A web-junction node that pulses when in view.
 */
function WebNode() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-15%" })

  return (
    <div ref={ref} className="relative h-4 w-4" aria-hidden="true">
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border"
        style={{ borderColor: "var(--node-color)" }}
        animate={isInView ? { scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] } : {}}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      />
      {/* Inner dot */}
      <div
        className="absolute inset-1 rounded-full"
        style={{
          background: "var(--node-color)",
          boxShadow: "var(--node-glow)",
        }}
      />
    </div>
  )
}

export function ProcessSection() {
  const timelineContainerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="process" className="relative px-6 py-24 md:px-12 md:py-32">
      <SpringReveal>
        <SectionHeading
          title="How We Spin Your Web"
          subtitle="Our process is deliberate and transparent -- five interlocking phases that transform your vision into a polished, production-ready interface."
        />
      </SpringReveal>

      <div ref={timelineContainerRef} className="relative mx-auto max-w-4xl">
        {/* Winding silk thread -- measured to span first dot to last dot */}
        <SilkTimeline containerRef={timelineContainerRef} />

        <div className="flex flex-col gap-16">
          {processSteps.map((step, index) => {
            const Icon = iconMap[step.icon]
            const isEven = index % 2 === 0

            return (
              <SpringReveal
                key={step.number}
                delay={index * 0.1}
                direction={isEven ? "left" : "right"}
              >
                <div
                  className={`relative flex items-start gap-6 pl-14 md:pl-0 ${
                    isEven
                      ? "md:flex-row md:pr-[calc(50%+2.5rem)]"
                      : "md:flex-row-reverse md:pl-[calc(50%+2.5rem)]"
                  }`}
                >
                  {/* Web-junction node on the spine */}
                  <div
                    data-timeline-dot
                    className="absolute left-4 top-4 md:left-1/2 md:-translate-x-1/2"
                    aria-hidden="true"
                  >
                    <WebNode />
                  </div>

                  {/* Web filament connector */}
                  <div
                    className={`hidden md:block absolute top-3 ${
                      isEven
                        ? "left-[calc(50%+8px)]"
                        : "right-[calc(50%+8px)] scale-x-[-1]"
                    }`}
                    aria-hidden="true"
                  >
                    <WebFilament
                      direction={isEven ? "right" : "left"}
                      index={index}
                    />
                  </div>

                  {/* Card */}
                  <SilkCard className="flex-1">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="text-xs font-bold uppercase tracking-widest"
                          style={{ color: "var(--node-color)" }}
                        >
                          {step.number}
                        </span>
                        {Icon && (
                          <Icon
                            className="h-5 w-5"
                            style={{ color: "var(--node-color)" }}
                          />
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                      <span className="text-xs italic text-muted-foreground/70">
                        {step.tagline}
                      </span>
                    </div>
                  </SilkCard>
                </div>
              </SpringReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
