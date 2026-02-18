import { ArrowUpRight } from "lucide-react"

const cases = [
  {
    tag: "Fintech",
    title: "Coastal Aquiring",
    link: "https://portal.coastalacquiring.com/login?step=signIn",
    before:
      "A fast-growing product with tangled systems, too many moving parts, and shipping friction.",
    after:
      "We rebuilt key flows end to end, unified the stack, sharpened delivery pipelines, and turned a complex platform into something faster, cleaner, and easier to scale.",
    metric: "From Friction to Flow",
    color: "border-primary/30 hover:border-primary",
    accentColor: "text-primary bg-primary/10",
  },
  {
    tag: "E-Commerce",
    title: "Grublify",
    link: "https://www.grublify.com/",
    before:
      "A large, tangled codebase was slowing delivery, with duplicated logic across storefront, admin, and backend services.",
    after:
      "We simplified the architecture, consolidated shared flows, and cleaned up core modules without cutting product capability, so teams kept every key feature while shipping faster.",
    metric: "Feature Complete",
    color: "border-secondary/30 hover:border-secondary",
    accentColor: "text-secondary bg-secondary/10",
  },
  {
    tag: "Web Platform",
    title: "FM Flow",
    link: "https://fmflow.com/",
    before:
      "A growing product with legacy UI patterns, uneven component quality, and a monorepo that was hard to scale cleanly.",
    after:
      "We introduced Next.js and Nx to better structure the monorepo, organize shared code, and improve load performance, while modernizing core frontend/backend workflows so the team shipped faster with more consistency.",
    metric: "Organized and Fast",
    color: "border-accent/30 hover:border-accent",
    accentColor: "text-accent-foreground bg-accent/10",
  },
]

export function CaseStudies() {
  return (
    <section id="cases" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Case Studies
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            Knots we have proudly untied.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Every project starts with a mess of constraints.
            Here is what it looked like before and after we got involved.
          </p>
        </div>

        {/* Case study cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {cases.map((c) => (
            <CaseCard key={c.title} {...c} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 font-serif text-lg font-bold text-foreground transition-colors hover:text-primary"
          >
            Got a knot? Let's untanglit together
            <ArrowUpRight
              size={20}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  )
}

function CaseCard({
  tag,
  title,
  link,
  before,
  after,
  metric,
  color,
  accentColor,
}: {
  tag: string
  title: string
  link?: string
  before: string
  after: string
  metric: string
  color: string
  accentColor: string
}) {
  return (
    <div
      className={`group relative flex flex-col rounded-2xl border-2 bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-xl ${color}`}
    >
      {/* Tag */}
      <div className={`mb-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${accentColor}`}>
        {tag}
      </div>

      <h3 className="font-serif text-2xl font-bold text-card-foreground">
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-primary"
          >
            {title}
            <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        ) : (
          title
        )}
      </h3>

      {/* Before/After */}
      <div className="mt-6 flex flex-col gap-4">
        <div className="rounded-xl bg-muted p-4">
          <div className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Before
          </div>
          <p className="text-sm leading-relaxed text-foreground/80">{before}</p>
        </div>
        <div className="relative rounded-xl border border-border bg-card p-4">
          <div className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            After
          </div>
          <p className="text-sm leading-relaxed text-foreground/80">{after}</p>
        </div>
      </div>

      {/* Metric pill */}
      <div className="mt-auto flex items-center gap-2 pt-6 pr-24">
        <div className="h-2 w-2 rounded-full bg-secondary" />
        <span className="font-serif text-lg font-bold text-foreground">{metric}</span>
      </div>

      {/* Tangled to straight line decoration */}
      <svg
        className="absolute bottom-4 right-4 h-12 w-24 text-border transition-colors group-hover:text-primary/30"
        viewBox="0 0 100 40"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5 20C15 5 25 35 35 15C45 -5 55 40 65 20C75 0 85 30 95 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="transition-all group-hover:[d:path('M5_20L95_20')]"
        />
      </svg>
    </div>
  )
}
