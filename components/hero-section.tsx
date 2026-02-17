"use client"

import { motion } from "motion/react"
import { ArrowDown, Github, Linkedin, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagneticWrapper } from "@/components/magnetic-wrapper"
import { HourglassIcon } from "@/components/hourglass-icon"
import { socialLinks } from "@/lib/data"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center"
    >
      {/* Large decorative hourglass motif behind content */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="relative"
          style={{ animation: "web-breathe 8s ease-in-out infinite" }}
        >
          <HourglassIcon size={420} animated={false} className="opacity-[0.04]" />
        </div>
      </div>

      {/* Radiating silk threads from center -- minimal decorative web strands */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 600 600"
          className="h-[500px] w-[500px] opacity-[0.03]"
          fill="none"
        >
          {/* Pre-computed endpoints to avoid SSR/client floating-point mismatch */}
          {[
            [300, 10], [551.07, 155], [590, 300], [551.07, 445],
            [300, 590], [48.93, 445], [10, 300], [48.93, 155],
          ].map(([x, y], i) => (
            <line
              key={i}
              x1="300"
              y1="300"
              x2={String(x)}
              y2={String(y)}
              stroke="var(--thread-color)"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex max-w-3xl flex-col items-center gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.4 }}
      >
        {/* Animated brand icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.3 }}
        >
          <HourglassIcon size={56} animated={false} />
        </motion.div>

        {/* Label */}
        <motion.span
          className="text-sm font-medium uppercase tracking-widest"
          style={{ color: "var(--node-color)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Webspinner
        </motion.span>

        {/* Heading */}
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
          We{" "}
          <span style={{ color: "var(--node-color)" }}>spin</span> digital
          experiences into reality
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground md:text-xl">
          Front-end consulting with 10+ years of craft
        </p>

        {/* Intro */}
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          We partner with ambitious companies to architect, build, and refine
          world-class web interfaces. Every strand of code is woven with purpose
          -- performance, accessibility, and delight baked into every pixel.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <MagneticWrapper>
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/85"
            >
              <a href="#process">See Our Process</a>
            </Button>
          </MagneticWrapper>
          <MagneticWrapper>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border text-foreground hover:bg-muted"
            >
              <a href="#contact">Start a Project</a>
            </Button>
          </MagneticWrapper>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4 pt-4">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon]
            return (
              <MagneticWrapper key={link.label} strength={5}>
                <a
                  href={link.href}
                  aria-label={link.label}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {Icon && <Icon className="h-5 w-5" />}
                </a>
              </MagneticWrapper>
            )
          })}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      >
        <ArrowDown className="h-5 w-5 text-muted-foreground" />
      </motion.div>
    </section>
  )
}
