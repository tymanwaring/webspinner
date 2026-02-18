"use client"

import {
  Search,
  PenTool,
  Code,
  Sparkles,
  Rocket,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useScroll, useTransform, motion, useInView } from "motion/react"
import { processSteps } from "@/lib/data"
import { SectionHeading } from "@/components/section-heading"
import { SpringReveal } from "@/components/spring-reveal"
import { SilkCard } from "@/components/silk-card"
import { useReducedMotion } from "@/lib/use-reduced-motion"

const iconMap: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  Search,
  PenTool,
  Code,
  Sparkles,
  Rocket,
}

/**
 * A vertical silk thread connecting dot 1 through dot 5.
 * The container is pinned to `top: 1.5rem` and `bottom: 1.5rem`
 * so the SVG stretches exactly from the first to the last dot.
 * The path stays at x=50 (dead centre) with extremely subtle
 * lateral waviness so it reads as organic silk, not a rigid ruler.
 *
 * 5 dots at equal spacing --> y positions 0, 125, 250, 375, 500
 * with tiny control-point drift of +/-3px max.
 */
function SilkTimeline({ topOffset, height }: { topOffset: number; height: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const pathLength = useTransform(scrollYProgress, [0.05, 0.85], [0, 1])

  // Thread passes exactly through each dot centre (x=50, y=0/125/250/375/500).
  // Subtle lateral drift in control points only -- never at the dot anchors.
  const threadPath = [
    "M 50 0",
    "C 53 42, 47 83, 50 125",
    "C 53 167, 47 208, 50 250",
    "C 47 292, 53 333, 50 375",
    "C 47 417, 53 458, 50 500",
  ].join(" ")

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute left-6 w-[100px] md:left-1/2 md:-translate-x-[50px]"
      style={{ top: `${topOffset}px`, height: `${height}px` }}
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
  const listRef = useRef<HTMLDivElement>(null)
  const firstNodeRef = useRef<HTMLDivElement>(null)
  const lastNodeRef = useRef<HTMLDivElement>(null)
  const [timelineBounds, setTimelineBounds] = useState({ top: 24, height: 0 })

  useEffect(() => {
    const updateTimelineBounds = () => {
      const list = listRef.current
      const firstNode = firstNodeRef.current
      const lastNode = lastNodeRef.current
      const timelineParent = list?.parentElement

      if (!timelineParent || !firstNode || !lastNode) return

      const parentRect = timelineParent.getBoundingClientRect()
      const firstRect = firstNode.getBoundingClientRect()
      const lastRect = lastNode.getBoundingClientRect()

      const firstCenter = firstRect.top - parentRect.top + firstRect.height / 2
      const lastCenter = lastRect.top - parentRect.top + lastRect.height / 2
      const measuredHeight = Math.max(lastCenter - firstCenter, 0)

      setTimelineBounds({ top: firstCenter, height: measuredHeight })
    }

    updateTimelineBounds()

    const resizeObserver = new ResizeObserver(updateTimelineBounds)
    if (listRef.current) resizeObserver.observe(listRef.current)
    if (firstNodeRef.current) resizeObserver.observe(firstNodeRef.current)
    if (lastNodeRef.current) resizeObserver.observe(lastNodeRef.current)
    window.addEventListener("resize", updateTimelineBounds)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", updateTimelineBounds)
    }
  }, [])

  return (
    <section id="process" className="relative px-6 py-24 md:px-12 md:py-32">
      <SpringReveal>
        <SectionHeading
          title="How We Remove Delivery Anxiety"
          subtitle="Our process is deliberate and transparent -- five practical phases that move your team from uncertainty to a polished, production-ready interface."
        />
      </SpringReveal>

      <div className="relative mx-auto max-w-4xl">
        {/* Winding silk thread timeline replacing the old straight line */}
        <SilkTimeline
          topOffset={timelineBounds.top}
          height={timelineBounds.height}
        />

        <div ref={listRef} className="flex flex-col gap-16">
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
                    className="absolute left-4 top-4 md:left-1/2 md:-translate-x-1/2"
                    aria-hidden="true"
                    ref={
                      index === 0
                        ? firstNodeRef
                        : index === processSteps.length - 1
                          ? lastNodeRef
                          : undefined
                    }
                  >
                    <WebNode />
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
