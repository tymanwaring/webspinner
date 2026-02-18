import { ArrowUpRight } from "lucide-react"

const footerLinks = {
  services: [
    { label: "Code Detangling", href: "#services" },
    { label: "Architecture Unraveling", href: "#services" },
    { label: "Performance Untying", href: "#services" },
    { label: "UX Unknotting", href: "#services" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Case Studies", href: "#cases" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
  ],
  social: [
    { label: "Twitter / X", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "Dribbble", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <svg
                width="28"
                height="28"
                viewBox="0 0 36 36"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M10 18C10 14 14 10 18 10C22 10 26 14 26 18C26 22 22 26 18 26C14 26 12 23 14 20C16 17 20 16 22 18C24 20 22 24 18 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="text-primary"
                />
              </svg>
              <span className="font-serif text-xl font-bold text-foreground">Untanglit</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We turn tangled web problems into clean, elegant solutions.
              No knot too gnarly.
            </p>
          </div>

          {/* Services links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Services
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Connect
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            2026 Untanglit. All rights reserved. No tangles were harmed in the making of this site.
          </p>
          <a
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
