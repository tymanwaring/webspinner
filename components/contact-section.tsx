"use client"

import { useActionState } from "react"
import { Mail, Github, Linkedin, Twitter } from "lucide-react"
import { submitContactForm, type ContactFormState } from "@/app/actions/contact"
import { socialLinks } from "@/lib/data"
import { SectionHeading } from "@/components/section-heading"
import { SpringReveal } from "@/components/spring-reveal"
import { MagneticWrapper } from "@/components/magnetic-wrapper"
import { SilkNode } from "@/components/silk-node"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
}

const initialState: ContactFormState = {
  success: false,
  message: "",
}

export function ContactSection() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  )

  return (
    <section id="contact" className="relative px-6 py-24 md:px-12 md:py-32">
      <SpringReveal>
        <SectionHeading
          title="Let's Untangle Your Front End"
          subtitle="Tell us about your project and we will map a clear path forward. You will hear back within 24 hours."
        />
      </SpringReveal>

      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1.2fr_0.8fr]">
        {/* Contact form */}
        <SpringReveal delay={0.1}>
          <form action={formAction} className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  aria-describedby={state.errors?.name ? "name-error" : undefined}
                />
                {state.errors?.name && (
                  <p id="name-error" className="text-xs text-destructive">
                    {state.errors.name[0]}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  aria-describedby={
                    state.errors?.email ? "email-error" : undefined
                  }
                />
                {state.errors?.email && (
                  <p id="email-error" className="text-xs text-destructive">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="company">
                Company{" "}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="company"
                name="company"
                placeholder="Your company"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label>Project Type</Label>
                <Select name="projectType" required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-build">New Build</SelectItem>
                    <SelectItem value="redesign">Redesign</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="code-audit">Code Audit</SelectItem>
                    <SelectItem value="design-system">
                      Design System
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {state.errors?.projectType && (
                  <p className="text-xs text-destructive">
                    {state.errors.projectType[0]}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label>Budget Range</Label>
                <Select name="budget" required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10k-25k">$10K - $25K</SelectItem>
                    <SelectItem value="25k-50k">$25K - $50K</SelectItem>
                    <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                    <SelectItem value="100k+">$100K+</SelectItem>
                  </SelectContent>
                </Select>
                {state.errors?.budget && (
                  <p className="text-xs text-destructive">
                    {state.errors.budget[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your project, goals, and timeline..."
                rows={5}
                required
                aria-describedby={
                  state.errors?.message ? "message-error" : undefined
                }
              />
              {state.errors?.message && (
                <p id="message-error" className="text-xs text-destructive">
                  {state.errors.message[0]}
                </p>
              )}
            </div>

            <MagneticWrapper>
              <Button
                type="submit"
                size="lg"
                disabled={isPending}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
              >
                {isPending ? "Sending..." : "Send Message"}
              </Button>
            </MagneticWrapper>

            {state.message && !state.errors && (
              <p
                className={`text-sm ${
                  state.success ? "text-green-400" : "text-destructive"
                }`}
              >
                {state.message}
              </p>
            )}
          </form>
        </SpringReveal>

        {/* Direct contact info */}
        <SpringReveal delay={0.2}>
          <div className="flex flex-col gap-8 rounded-lg border border-border bg-card/50 p-6">
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-foreground">
                Prefer to reach out directly?
              </h3>
              <a
                href="mailto:hello@untanglit.dev"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                hello@untanglit.dev
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-foreground">Find us online</h3>
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
                        {Icon && <Icon className="h-5 w-5" />}
                      </a>
                    </MagneticWrapper>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-foreground">Availability</h3>
              <div className="flex items-center gap-2">
                <SilkNode size={8} />
                <span className="text-sm text-muted-foreground">
                  Currently accepting new projects
                </span>
              </div>
              <p className="text-xs text-muted-foreground/70">
                Typical response time: within 24 hours
              </p>
            </div>
          </div>
        </SpringReveal>
      </div>
    </section>
  )
}
