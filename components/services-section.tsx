"use client"

import {
  Layers,
  Palette,
  Gauge,
  FileCode,
  SearchCheck,
  Users,
} from "lucide-react"
import { services } from "@/lib/data"
import { SectionHeading } from "@/components/section-heading"
import { SpringReveal } from "@/components/spring-reveal"
import { SilkCard } from "@/components/silk-card"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  Palette,
  Gauge,
  FileCode,
  SearchCheck,
  Users,
}

export function ServicesSection() {
  return (
    <section id="services" className="relative px-6 py-24 md:px-12 md:py-32">
      <SpringReveal>
        <SectionHeading
          title="Threads of Expertise"
          subtitle="Each service we offer is a strand of deep specialization -- woven together, they form a complete web of front-end capability."
        />
      </SpringReveal>

      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = iconMap[service.icon]
          return (
            <SpringReveal key={service.title} delay={index * 0.08}>
              <SilkCard hoverLift className="h-full">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    {Icon && (
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-md"
                        style={{
                          backgroundColor: "oklch(0.55 0.24 25 / 0.08)",
                        }}
                      >
                        <Icon
                          className="h-5 w-5"
                          style={{ color: "var(--node-color)" }}
                        />
                      </div>
                    )}
                    <h3 className="font-semibold text-foreground">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </SilkCard>
            </SpringReveal>
          )
        })}
      </div>
    </section>
  )
}
