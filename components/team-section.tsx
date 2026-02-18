"use client"

import { team } from "@/lib/data"
import { SectionHeading } from "@/components/section-heading"
import { SpringReveal } from "@/components/spring-reveal"
import { TeamMemberCard } from "@/components/team-member-card"

export function TeamSection() {
  return (
    <section id="team" className="relative px-6 py-24 md:px-12 md:py-32">
      <SpringReveal>
        <SectionHeading
          title="The Untanglit Team"
          subtitle="Senior specialists who combine product thinking, engineering rigor, and calm execution on every engagement."
        />
      </SpringReveal>

      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {team.map((member, index) => (
          <SpringReveal key={member.name} delay={index * 0.08}>
            <TeamMemberCard
              name={member.name}
              role={member.role}
              specialty={member.specialty}
              bio={member.bio}
              initials={member.initials}
              social={member.social}
            />
          </SpringReveal>
        ))}
      </div>
    </section>
  )
}
