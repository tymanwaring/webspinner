"use client"

import { testimonials } from "@/lib/data"
import { SectionHeading } from "@/components/section-heading"
import { SpringReveal } from "@/components/spring-reveal"
import { TestimonialCard } from "@/components/testimonial-card"

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative px-6 py-24 md:px-12 md:py-32"
    >
      <SpringReveal>
        <SectionHeading
          title="What Clients Say"
          subtitle="Our clients' words carry more weight than our own. Here is what they have to say about working with Untanglit."
        />
      </SpringReveal>

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <SpringReveal key={testimonial.name} delay={index * 0.08}>
            <TestimonialCard
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              company={testimonial.company}
            />
          </SpringReveal>
        ))}
      </div>
    </section>
  )
}
