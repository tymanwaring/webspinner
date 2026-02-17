"use client"

import { Github, Linkedin, Twitter } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SilkCard } from "@/components/silk-card"
import { MagneticWrapper } from "@/components/magnetic-wrapper"

interface TeamMemberCardProps {
  name: string
  role: string
  specialty: string
  bio: string
  initials: string
  social: { github?: string; linkedin?: string; x?: string }
}

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  x: Twitter,
}

export function TeamMemberCard({
  name,
  role,
  specialty,
  bio,
  initials,
  social,
}: TeamMemberCardProps) {
  return (
    <SilkCard hoverLift className="flex flex-col items-center gap-4 text-center">
      <Avatar className="h-16 w-16">
        <AvatarFallback
          className="text-lg font-semibold text-foreground"
          style={{ backgroundColor: "oklch(0.55 0.24 25 / 0.12)" }}
        >
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground">{role}</p>
        <p
          className="text-xs font-medium"
          style={{ color: "var(--node-color)" }}
        >
          {specialty}
        </p>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">{bio}</p>

      <div className="flex items-center gap-3">
        {Object.entries(social).map(([key, href]) => {
          const Icon = socialIcons[key as keyof typeof socialIcons]
          if (!Icon) return null
          return (
            <MagneticWrapper key={key} strength={4}>
              <a
                href={href}
                aria-label={`${name} on ${key}`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            </MagneticWrapper>
          )
        })}
      </div>
    </SilkCard>
  )
}
