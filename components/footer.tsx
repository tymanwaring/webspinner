import { ArrowUpRight } from "lucide-react"
import { BrandKnotIcon } from "@/components/brand-knot-icon"

const footerLinks = {
  company: [
    { label: "About Us", href: "#about" },
    { label: "Case Studies", href: "#cases" },
  ],
  social: [
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <BrandKnotIcon size={28} />
              <span className="font-serif text-xl font-bold text-foreground">Untanglit</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            We turn tangled web problems into clean, elegant solutions.
            No knot too gnarly.
            </p>
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
            2026 Untanglit. All rights reserved. No knots were harmed in the making of this site.
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
