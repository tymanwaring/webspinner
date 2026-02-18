"use client"

import { useInView, useSpring, motion } from "motion/react"
import { useRef, useEffect, useState } from "react"
import { stats, technologies } from "@/lib/data"
import { SectionHeading } from "@/components/section-heading"
import { SpringReveal } from "@/components/spring-reveal"
import { SilkCard } from "@/components/silk-card"
import { useReducedMotion } from "@/lib/use-reduced-motion"

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const reducedMotion = useReducedMotion()
  const spring = useSpring(0, { stiffness: 50, damping: 30 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, spring, value])

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(value)
      return
    }
    const unsubscribe = spring.on("change", (v) => {
      setDisplay(Math.round(v))
    })
    return unsubscribe
  }, [spring, value, reducedMotion])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-24 md:px-12 md:py-32">
      <SpringReveal>
        <SectionHeading title="About Untanglit" />
      </SpringReveal>

      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16">
        {/* Narrative */}
        <SpringReveal delay={0.1}>
          <div className="flex flex-col gap-6 text-base leading-relaxed text-muted-foreground">
            <p>
              Untanglit exists for teams that feel blocked by unclear requirements,
              fragile front-end code, or delivery chaos. We bring senior
              engineering leadership and a calm, structured process that removes
              guesswork from product delivery.
            </p>
            <p>
              We do not just write components -- we reduce risk. Our work focuses
              on architecture clarity, measurable performance, and accessible user
              flows your team can maintain long after launch.
            </p>
            <p>
              From enterprise dashboards to startup launches, we help clients ship
              with confidence through practical planning, transparent communication,
              and consistent execution.
            </p>
          </div>
        </SpringReveal>

        {/* Stats grid */}
        <SpringReveal delay={0.2}>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <SilkCard key={stat.label}>
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-3xl font-bold text-foreground md:text-4xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              </SilkCard>
            ))}
          </div>
        </SpringReveal>
      </div>

      {/* Technology badges */}
      <SpringReveal delay={0.3}>
        <div className="mx-auto mt-16 flex max-w-3xl flex-wrap items-center justify-center gap-3">
          {technologies.map((tech) => (
            <motion.span
              key={tech}
              whileHover={{
                boxShadow: "0 0 12px oklch(0.55 0.24 25 / 0.2)",
              }}
              className="rounded-full border border-border bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </SpringReveal>
    </section>
  )
}
