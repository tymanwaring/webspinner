const items = [
  "Code Detangling",
  "Architecture Unraveling",
  "Performance Untying",
  "UX Unknotting",
  "API & Data Stitching",
  "SEO Straightening",
  "Design System Weaving",
  "Migration Smoothing",
]

export function MarqueeBand() {
  return (
    <div className="relative z-10 overflow-hidden border-y border-border bg-primary py-4">
      <div className="animate-marquee flex w-max whitespace-nowrap">
        {[0, 1].map((track) => (
          <div key={track} aria-hidden={track === 1} className="flex shrink-0">
            {items.map((item, i) => (
              <span key={`${track}-${i}`} className="flex items-center gap-6 px-6">
                <span className="text-sm font-bold uppercase tracking-widest text-primary-foreground">
                  {item}
                </span>
                <svg
                  className="h-3 w-3 text-primary-foreground/40"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <circle cx="6" cy="6" r="3" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
