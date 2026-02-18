import { Code, Layers, Zap, Palette, Database, BarChart3 } from "lucide-react"

const services = [
  {
    icon: Code,
    title: "Code Detangling",
    description:
      "Legacy spaghetti code? We refactor, restructure, and modernize your codebase until it sings.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Layers,
    title: "Architecture Unraveling",
    description:
      "We map the maze, simplify the structure, and leave you with an architecture that can grow up gracefully.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Zap,
    title: "Load-Time Loosening",
    description:
      "Slow load times tying you down? We diagnose bottlenecks and unleash blazing-fast performance.",
    color: "bg-accent/10 text-accent-foreground",
  },
  {
    icon: Palette,
    title: "UX Unknotting",
    description:
      "Confusing user flows? We unravel the knots in your UX and create journeys that feel effortless.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Database,
    title: "API & Data Stitching",
    description:
      "Need backend support too? We stitch APIs and data flows cleanly so your frontend stays fast, stable, and easy to build on.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: BarChart3,
    title: "SEO Straightening",
    description:
      "Rankings in a twist? We untangle your SEO, fix technical issues, and boost your visibility.",
    color: "bg-accent/10 text-accent-foreground",
  },
]

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            What We Untangle
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            Every knot has a plan.{" "}
            <span className="text-muted-foreground">We bring the patient hands.</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Frontend-first and performance-obsessed, we untangle messy UI codebases and support the backend touchpoints needed to keep everything humming.
          </p>
        </div>

        {/* Services grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ComponentType<{ size?: number }>
  title: string
  description: string
  color: string
}) {
  return (
    <div className="group relative rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:-translate-y-1">
      {/* Icon */}
      <div
        className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${color} transition-transform group-hover:scale-110`}
      >
        <Icon size={24} />
      </div>

      <h3 className="font-serif text-xl font-bold text-card-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>

      {/* Decorative knot corner */}
      <svg
        className="absolute right-4 top-4 h-8 w-8 text-border transition-colors group-hover:text-primary/30"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 16C8 12 12 8 16 8C20 8 24 12 24 16C24 20 20 24 16 24"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
