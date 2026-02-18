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

const knotVariants = [
  "M8 16C8 12 12 8 16 8C20 8 24 12 24 16C24 20 20 24 16 24C12 24 9 21 10 18C11 15 15 14 17 16",
  "M8 12C8 9.8 9.8 8 12 8C14.2 8 16 9.8 16 12C16 14.2 14.2 16 12 16C9.8 16 8 17.8 8 20C8 22.2 9.8 24 12 24C14.2 24 16 22.2 16 20C16 17.8 17.8 16 20 16C22.2 16 24 14.2 24 12C24 9.8 22.2 8 20 8C17.8 8 16 9.8 16 12",
  "M8 18C10 14 12 12 14 12C16 12 18 14 20 18C22 22 24 20 24 16C24 12 21 8 17 8C13 8 10 10 8 14",
  "M8 10C10 8 14 8 16 10C18 12 18 15 16 17C14 19 10 19 8 21M24 10C22 8 18 8 16 10C14 12 14 15 16 17C18 19 22 19 24 21",
  "M8 20C8 16 12 12 16 12C20 12 24 16 24 20M8 12C8 9.8 9.8 8 12 8C14.2 8 16 9.8 16 12",
  "M8 12C8 9.8 9.8 8 12 8C14.2 8 16 9.8 16 12C16 14.2 14.2 16 12 16C9.8 16 8 17.8 8 20C8 22.2 9.8 24 12 24C15 24 17 22 18 20C19 18 20 16 22 16C23.1 16 24 16.9 24 18",
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
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              knotPath={knotVariants[index % knotVariants.length]}
            />
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
  knotPath,
}: {
  icon: React.ComponentType<{ size?: number }>
  title: string
  description: string
  color: string
  knotPath: string
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
          d={knotPath}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
