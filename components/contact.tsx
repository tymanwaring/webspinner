"use client"

import { useState } from "react"
import { Send, Mail, MapPin, Phone, AlertTriangle } from "lucide-react"

type ContactFormState = {
  name: string
  company: string
  companySize: string
  projectType: string
  currentStack: string
  timeline: string
  budget: string
  email: string
  phone: string
  bestContact: string
  message: string
}

type ContactFormErrors = Partial<Record<keyof ContactFormState, string>>

const initialFormState: ContactFormState = {
  name: "",
  company: "",
  companySize: "",
  projectType: "",
  currentStack: "",
  timeline: "",
  budget: "",
  email: "",
  phone: "",
  bestContact: "",
  message: "",
}

const fieldBaseClass =
  "rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"

function validateForm(state: ContactFormState): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!state.name.trim()) errors.name = "Please tell us your name."
  if (!state.projectType) errors.projectType = "Please choose a project type."
  if (!state.currentStack.trim()) errors.currentStack = "Please share your current stack."
  if (!state.timeline) errors.timeline = "Please choose a timeline."
  if (!state.budget) errors.budget = "Please choose a budget range."
  if (!state.email.trim()) {
    errors.email = "Please enter your email."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())) {
    errors.email = "Please enter a valid email address."
  }
  if (!state.phone.trim()) errors.phone = "Please enter a phone number."
  if (!state.bestContact) errors.bestContact = "Please select your preferred contact method."
  if (!state.message.trim()) errors.message = "Please describe the knot."
  if (state.company.trim() && !state.companySize) {
    errors.companySize = "Company size is required when company is provided."
  }

  return errors
}

function buildInquiryEmailBody(state: ContactFormState) {
  const optionalCompany = state.company.trim() || "N/A"
  const optionalCompanySize = state.companySize.trim() || "N/A"

  return `Hi Untanglit team,

I would like to get a quote to untanglit this project.

Name: ${state.name.trim()}
Company: ${optionalCompany}
Company size: ${optionalCompanySize}
Project type: ${state.projectType}
Current stack: ${state.currentStack.trim()}
Timeline: ${state.timeline}
Budget: ${state.budget}
Email: ${state.email.trim()}
Phone: ${state.phone.trim()}
Best way to contact: ${state.bestContact}

Describe the knot:
${state.message.trim()}
`
}

export function Contact() {
  const emailDraftHref = `mailto:hello@untanglit.com?subject=${encodeURIComponent("Untanglit Project Inquiry")}&body=${encodeURIComponent(
    `Hi Untanglit team,

I would love help untangling a project.

Name:
Company:
Project type:
Current stack:
Goals:
Timeline:
Budget:

Best contact:

Thanks!`
  )}`

  const [formState, setFormState] = useState<ContactFormState>(initialFormState)
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [showDraftReminder, setShowDraftReminder] = useState(false)

  function updateField<K extends keyof ContactFormState>(field: K, value: string) {
    setFormState((prev) => ({ ...prev, [field]: value }))
    setFormErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const nextErrors = validateForm(formState)
    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors)
      return
    }

    const subject = "New Untanglit Quote Request"
    const body = buildInquiryEmailBody(formState)
    const mailtoHref = `mailto:hello@untanglit.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    setSubmitted(true)
    setFormErrors({})
    setFormState(initialFormState)
    window.location.href = mailtoHref
    setShowDraftReminder(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="contact" className="relative bg-muted py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Left column - CTA text */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Contact
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
              Ready to get untangled?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Bring us your knotty web problem. No judgment, no buzzwords.
              Just a practical plan and people who love solving the messy stuff.
            </p>

            <div className="mt-8 flex flex-col gap-5">
              <ContactInfo
                icon={Mail}
                label="hello@untanglit.com"
                href={emailDraftHref}
              />
              <ContactInfo icon={Phone} label="+1 (555) 123-4567" />
              <ContactInfo icon={MapPin} label="Spokane, WA" />
            </div>

            {/* Fun note */}
            <div className="mt-8 rounded-2xl border border-border bg-card p-5">
              <p className="font-serif text-lg font-bold text-foreground">
                "The messier the knot, the bigger our smile."
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {"\u2014 The Untanglit Team, probably before their third coffee"}
              </p>
            </div>
          </div>

          {/* Right column - Form */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                  <Send size={28} className="text-secondary" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-card-foreground">
                  Email drafted!
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Your note is ready to be sent.
                </p>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formState.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    aria-invalid={Boolean(formErrors.name)}
                    className={`${fieldBaseClass} ${formErrors.name ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                    placeholder="Your name"
                  />
                  {formErrors.name && (
                    <p className="text-xs font-serif text-primary">{formErrors.name}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company" className="text-sm font-medium text-foreground">
                    Company <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={formState.company}
                    onChange={(e) => updateField("company", e.target.value)}
                    className={fieldBaseClass}
                    placeholder="Your company"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="companySize" className="text-sm font-medium text-foreground">
                    Company size
                    {formState.company.trim() && (
                      <span className="text-muted-foreground"> (required if company is provided)</span>
                    )}
                  </label>
                  <select
                    id="companySize"
                    required={formState.company.trim().length > 0}
                    value={formState.companySize}
                    onChange={(e) => updateField("companySize", e.target.value)}
                    aria-invalid={Boolean(formErrors.companySize)}
                    className={`${fieldBaseClass} ${formErrors.companySize ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                  >
                    <option value="">Select size...</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-1000">201-1000</option>
                    <option value="1000+">1000+</option>
                  </select>
                  {formErrors.companySize && (
                    <p className="text-xs font-serif text-primary">{formErrors.companySize}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="projectType" className="text-sm font-medium text-foreground">
                    Project type
                  </label>
                  <select
                    id="projectType"
                    value={formState.projectType}
                    onChange={(e) => updateField("projectType", e.target.value)}
                    aria-invalid={Boolean(formErrors.projectType)}
                    className={`${fieldBaseClass} ${formErrors.projectType ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                  >
                    <option value="">Select project type...</option>
                    <option value="frontend-refactor">Frontend Refactor</option>
                    <option value="new-build">New Build</option>
                    <option value="design-system">Design System</option>
                    <option value="performance">Performance Optimization</option>
                    <option value="api-integration">API Integration</option>
                    <option value="other">Something wonderfully weird</option>
                  </select>
                  {formErrors.projectType && (
                    <p className="text-xs font-serif text-primary">{formErrors.projectType}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2 lg:col-span-2">
                  <label htmlFor="currentStack" className="text-sm font-medium text-foreground">
                    Current stack
                  </label>
                  <input
                    id="currentStack"
                    type="text"
                    value={formState.currentStack}
                    onChange={(e) => updateField("currentStack", e.target.value)}
                    aria-invalid={Boolean(formErrors.currentStack)}
                    className={`${fieldBaseClass} ${formErrors.currentStack ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                    placeholder="React, Next.js, Node, etc."
                  />
                  {formErrors.currentStack && (
                    <p className="text-xs font-serif text-primary">{formErrors.currentStack}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="timeline" className="text-sm font-medium text-foreground">
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    value={formState.timeline}
                    onChange={(e) => updateField("timeline", e.target.value)}
                    aria-invalid={Boolean(formErrors.timeline)}
                    className={`${fieldBaseClass} ${formErrors.timeline ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                  >
                    <option value="">Select timeline...</option>
                    <option value="asap">ASAP</option>
                    <option value="1-2-months">1-2 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="6+-months">6+ months</option>
                  </select>
                  {formErrors.timeline && (
                    <p className="text-xs font-serif text-primary">{formErrors.timeline}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="budget" className="text-sm font-medium text-foreground">
                    Budget
                  </label>
                  <select
                    id="budget"
                    value={formState.budget}
                    onChange={(e) => updateField("budget", e.target.value)}
                    aria-invalid={Boolean(formErrors.budget)}
                    className={`${fieldBaseClass} ${formErrors.budget ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                  >
                    <option value="">Select budget...</option>
                    <option value="under-5k">Under $5k</option>
                    <option value="5k-15k">$5k-$15k</option>
                    <option value="15k-30k">$15k-$30k</option>
                    <option value="30k+">$30k+</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                  {formErrors.budget && (
                    <p className="text-xs font-serif text-primary">{formErrors.budget}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formState.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    aria-invalid={Boolean(formErrors.email)}
                    className={`${fieldBaseClass} ${formErrors.email ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                    placeholder="you@company.com"
                  />
                  {formErrors.email && (
                    <p className="text-xs font-serif text-primary">{formErrors.email}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">
                    Phone number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formState.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    aria-invalid={Boolean(formErrors.phone)}
                    className={`${fieldBaseClass} ${formErrors.phone ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {formErrors.phone && (
                    <p className="text-xs font-serif text-primary">{formErrors.phone}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2 lg:col-span-2">
                  <label htmlFor="bestContact" className="text-sm font-medium text-foreground">
                    Best way to contact
                  </label>
                  <select
                    id="bestContact"
                    value={formState.bestContact}
                    onChange={(e) => updateField("bestContact", e.target.value)}
                    aria-invalid={Boolean(formErrors.bestContact)}
                    className={`${fieldBaseClass} ${formErrors.bestContact ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                  >
                    <option value="">Select preferred contact...</option>
                    <option value="email">Email</option>
                    <option value="text">Text message</option>
                  </select>
                  {formErrors.bestContact && (
                    <p className="text-xs font-serif text-primary">{formErrors.bestContact}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2 lg:col-span-3">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Describe the knot
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formState.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    aria-invalid={Boolean(formErrors.message)}
                    className={`resize-none ${fieldBaseClass} ${formErrors.message ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                    placeholder="Tell us where things feel tangled, what is breaking, and what success looks like."
                  />
                  {formErrors.message && (
                    <p className="text-xs font-serif text-primary">{formErrors.message}</p>
                  )}
                </div>

                <div className="mt-1 flex items-center gap-3 md:col-span-2 lg:col-span-3">
                  {formState.timeline === "asap" && (
                    <p className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-amber-300/70 bg-amber-50/70 px-3 py-2 text-xs text-amber-800">
                      <AlertTriangle size={14} className="shrink-0" />
                      ASAP requests may include rush charges.
                    </p>
                  )}
                  <button
                    type="submit"
                    className="ml-auto inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                  >
                    <Send size={16} />
                    Get a quote to Untanglit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {showDraftReminder && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/35 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
            <h3 className="font-serif text-2xl font-bold text-card-foreground">
              One quick reminder
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Make sure to finalize and send your information in the drafted email.
            </p>
            <button
              type="button"
              onClick={() => setShowDraftReminder(false)}
              className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

function ContactInfo({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  href?: string
}) {
  const content = (
    <>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon size={18} />
      </div>
      <span className="text-base font-medium text-foreground">{label}</span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className="group flex items-center gap-3 rounded-xl transition-colors hover:text-primary"
      >
        {content}
      </a>
    )
  }

  return <div className="flex items-center gap-3">{content}</div>
}
