import { ArrowDown } from "lucide-react"

export function Hero() {
  const tickerItems = Array.from({ length: 8 }, () => "Untanglit")

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Decorative tangled SVG lines */}
      <DecorativeTangles />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
          <span className="text-balance">We untangle your </span>
          <span className="relative inline-block">
            <span className="relative z-10 text-primary">messiest</span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 200 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 8C30 2 60 10 100 5C140 0 170 9 198 4"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-accent"
              />
            </svg>
          </span>
          <br />
          <span className="text-balance">web problems.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Tangled code? Knotted architecture? Spaghetti integrations?
          We specialize in turning your digital chaos into clean, elegant solutions that actually work.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#contact"
            className="rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Start Untangling
          </a>
          <a
            href="#cases"
            className="rounded-full border-2 border-foreground/20 px-8 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            See Our Work
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 translate-y-4 animate-float">
        <a
          href="#services"
          className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          aria-label="Scroll to services"
        >
          <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
          <ArrowDown size={18} />
        </a>
      </div>

      {/* Marquee ticker */}
      <div className="absolute bottom-20 left-0 right-0 overflow-hidden opacity-[0.06]">
        <div className="animate-marquee-slow flex w-max whitespace-nowrap">
          {[0, 1].map((track) => (
            <div key={track} aria-hidden={track === 1} className="flex shrink-0 items-center gap-16 pr-16">
              {tickerItems.map((item, i) => (
                <span
                  key={`${track}-${i}`}
                  className="font-serif text-7xl font-black uppercase tracking-tighter text-foreground md:text-9xl"
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DecorativeTangles() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* Top-right tangled knot */}
      <svg
        className="absolute -top-10 right-0 h-80 w-80 text-primary/10 md:h-[500px] md:w-[500px]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <path
          d="M100 50C200 50 300 100 280 200C260 300 150 320 100 280C50 240 80 150 150 150C220 150 250 220 200 250C150 280 100 250 80 200"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M200 80C250 120 320 160 300 230C280 300 200 330 160 300C120 270 140 200 190 180C240 160 280 200 260 250"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Bottom-left tangled knot */}
      <svg
        className="absolute -bottom-10 -left-10 h-64 w-64 text-secondary/10 md:h-96 md:w-96"
        viewBox="0 0 300 300"
        fill="none"
      >
        <path
          d="M50 150C50 80 100 30 170 50C240 70 260 150 220 200C180 250 100 240 80 190C60 140 100 100 150 110C200 120 220 170 190 200"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Small floating dots */}
      <div className="absolute left-[15%] top-[30%] h-3 w-3 rounded-full bg-accent/30 animate-float" />
      <div className="absolute right-[20%] top-[45%] h-2 w-2 rounded-full bg-primary/20 animate-float-delayed" />
      <div className="absolute left-[60%] top-[20%] h-4 w-4 rounded-full bg-secondary/20 animate-float" />
    </div>
  )
}
