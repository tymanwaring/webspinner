import { Search, Scissors, Sparkles, Rocket } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find the Knot",
    description:
      "We start by tracing the tangle. Audits, code reviews, and team interviews reveal what's really tied together.",
  },
  {
    number: "02",
    icon: Scissors,
    title: "Untanglit with Care",
    description:
      "No wild cutting. We choose the smartest order of operations so each fix makes the next one easier.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Smooth the Strands",
    description:
      "Once untangled, we refine. Clean code, clear documentation, optimized performance, and beautiful interfaces.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch Untangled",
    description:
      "You launch with confidence, plus docs and handoff support so your team keeps things beautifully untangled.",
  },
]

const stats = [
  { value: "200+", label: "Knots Untied" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12", label: "Years Detangling" },
  { value: "50+", label: "Happy Clients" },
]

export function About() {
  return (
    <section id="about" className="relative bg-foreground py-24 text-primary-foreground md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* About header */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              About Us
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight md:text-5xl text-balance">
              We thrive in the tangles others avoid.
            </h2>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg leading-relaxed text-primary-foreground/70">
              Untanglit was born from frustration. We kept seeing brilliant businesses held back by
              messy code, convoluted architectures, and web experiences that made users cringe. So we
              built a team of problem-solvers who love the complicated stuff. The gnarlier the knot,
              the bigger our grins.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-primary-foreground/70">
              {"We're not just consultants \u2014 we're detectives, architects, and craftspeople who get genuine joy from making things work beautifully."}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 text-center"
            >
              <div className="font-serif text-4xl font-bold text-accent md:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-medium text-primary-foreground/60">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Our Process
            </span>
            <h3 className="mt-4 font-serif text-3xl font-bold tracking-tight md:text-4xl text-balance">
              From tangled to tidy in four steps.
            </h3>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <ProcessStep key={step.number} {...step} isLast={index === steps.length - 1} />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative corner tangles */}
      <svg
        className="absolute left-0 top-0 h-48 w-48 text-primary-foreground/5"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 100C40 60 80 20 120 40C160 60 140 120 100 120C60 120 40 80 80 60"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </section>
  )
}

function ProcessStep({
  number,
  icon: Icon,
  title,
  description,
}: {
  number: string
  icon: React.ComponentType<{ size?: number }>
  title: string
  description: string
  isLast: boolean
}) {
  return (
    <div className="group relative">
      {/* Step number */}
      <div className="mb-4 font-serif text-6xl font-black text-primary-foreground/10 transition-colors group-hover:text-accent/30">
        {number}
      </div>

      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-accent">
        <Icon size={20} />
      </div>

      <h4 className="font-serif text-xl font-bold">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-primary-foreground/60">{description}</p>
    </div>
  )
}
