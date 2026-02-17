"use client"

import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { navigation, socialLinks } from "@/lib/data"
import { MagneticWrapper } from "@/components/magnetic-wrapper"
import { HourglassIcon } from "@/components/hourglass-icon"

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
}

export function Footer() {
  return (
    <footer className="border-t border-border/50 px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8">
        {/* Nav links */}
        <nav
          className="flex flex-wrap items-center justify-center gap-6"
          aria-label="Footer navigation"
        >
          {navigation.map((item) => (
            <MagneticWrapper key={item.href} strength={3}>
              <a
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </MagneticWrapper>
          ))}
        </nav>

        {/* Social links */}
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = socialIcons[link.icon]
            return (
              <MagneticWrapper key={link.label} strength={4}>
                <a
                  href={link.href}
                  aria-label={link.label}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                </a>
              </MagneticWrapper>
            )
          })}
        </div>

        {/* Brand + copyright */}
        <div className="flex flex-col items-center gap-2 text-center">
          <HourglassIcon size={24} animated={false} />
          <p className="text-sm text-muted-foreground">Woven with care</p>
          <p className="text-xs text-muted-foreground/60">
            {"\u00A9"} 2026 Webspinner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
