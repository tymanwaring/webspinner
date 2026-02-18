export const navigation = [
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Team", href: "#team" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const

export const processSteps = [
  {
    number: "01",
    icon: "Search" as const,
    title: "Discovery",
    description:
      "Every successful launch starts with clarity. We align on goals, audience, constraints, and priorities so your team can make confident product decisions from day one.",
    tagline: "Clarifying the problem",
  },
  {
    number: "02",
    icon: "PenTool" as const,
    title: "Architecture",
    description:
      "We design a practical technical plan -- selecting the right stack, defining component boundaries, and planning for scale so implementation stays predictable.",
    tagline: "Designing the plan",
  },
  {
    number: "03",
    icon: "Code" as const,
    title: "Implementation",
    description:
      "This is where strategy becomes product. We build high-quality interfaces with clean architecture, thoughtful UX, and maintainable code your team can extend confidently.",
    tagline: "Building with confidence",
  },
  {
    number: "04",
    icon: "Sparkles" as const,
    title: "Refinement",
    description:
      "We harden every release for performance, accessibility, and cross-browser consistency. Critical paths are validated and polished until quality is measurable.",
    tagline: "De-risking the release",
  },
  {
    number: "05",
    icon: "Rocket" as const,
    title: "Launch",
    description:
      "Your product goes live with a clear rollout plan. We support deployment, monitoring, and post-launch iteration so your team ships without fear.",
    tagline: "Shipping with confidence",
  },
] as const

export const services = [
  {
    icon: "Layers" as const,
    title: "Frontend Architecture",
    description:
      "Scalable, maintainable codebases designed to grow with your business. We lay foundations that last years, not months.",
  },
  {
    icon: "Palette" as const,
    title: "Design System Development",
    description:
      "Unified component libraries that ensure visual consistency across every touchpoint while accelerating your team's delivery speed.",
  },
  {
    icon: "Gauge" as const,
    title: "Performance Optimization",
    description:
      "Sub-second load times and buttery-smooth interactions that reduce bounce rates and directly impact your bottom line.",
  },
  {
    icon: "FileCode" as const,
    title: "React & Next.js Consulting",
    description:
      "Deep expertise in the modern React ecosystem -- from server components to streaming SSR, we guide your team through the cutting edge.",
  },
  {
    icon: "SearchCheck" as const,
    title: "Code Audits & Reviews",
    description:
      "Comprehensive analysis of your codebase with actionable recommendations to improve quality, security, and developer experience.",
  },
  {
    icon: "Users" as const,
    title: "Team Mentoring",
    description:
      "Level up your engineering team with hands-on workshops, pair programming, and best-practice coaching from seasoned practitioners.",
  },
] as const

export const projects = [
  {
    title: "Meridian Finance Dashboard",
    description:
      "A real-time financial analytics platform serving 50K+ daily users. Built with Next.js App Router, streaming SSR, and a custom charting engine.",
    tags: ["Next.js", "TypeScript", "D3.js", "WebSocket"],
    clientType: "Enterprise",
    category: "fintech",
    accentColor: "oklch(0.55 0.24 25)",
  },
  {
    title: "Bloom E-Commerce Redesign",
    description:
      "Complete frontend overhaul for a luxury retail brand. Achieved 40% improvement in Core Web Vitals and 25% increase in conversion rate.",
    tags: ["React", "Tailwind", "Shopify", "Framer Motion"],
    clientType: "Retail",
    category: "ecommerce",
    accentColor: "oklch(0.50 0.20 20)",
  },
  {
    title: "Prism Design System",
    description:
      "An enterprise-grade component library powering 12 product teams. 200+ components with full accessibility compliance and Figma integration.",
    tags: ["React", "Storybook", "Radix UI", "CSS Modules"],
    clientType: "SaaS",
    category: "design-system",
    accentColor: "oklch(0.60 0.22 30)",
  },
  {
    title: "Nexus Health Portal",
    description:
      "HIPAA-compliant patient portal with real-time appointment scheduling, telehealth integration, and accessible form workflows.",
    tags: ["Next.js", "TypeScript", "Zod", "React Query"],
    clientType: "Healthcare",
    category: "healthcare",
    accentColor: "oklch(0.45 0.18 15)",
  },
  {
    title: "Velocity Startup Landing Kit",
    description:
      "A conversion-optimized landing page system deployed across 8 Y Combinator startups, with built-in A/B testing and analytics.",
    tags: ["Next.js", "Tailwind", "Vercel", "Posthog"],
    clientType: "Startup",
    category: "marketing",
    accentColor: "oklch(0.55 0.24 25)",
  },
  {
    title: "Arcadia Learning Platform",
    description:
      "Interactive coding education platform with live code editors, real-time collaboration, and adaptive curriculum powered by AI.",
    tags: ["React", "Monaco Editor", "WebRTC", "AI SDK"],
    clientType: "EdTech",
    category: "education",
    accentColor: "oklch(0.50 0.16 10)",
  },
] as const

export const team = [
  {
    name: "Alex Mercer",
    role: "Lead Consultant & Founder",
    specialty: "Frontend Architecture",
    bio: "10+ years shaping interfaces for Fortune 500s and ambitious startups alike. Obsessed with performance and developer experience.",
    initials: "AM",
    social: { github: "#", linkedin: "#", x: "#" },
  },
  {
    name: "Jordan Reeves",
    role: "Senior Developer",
    specialty: "React & Animation",
    bio: "Brings interfaces to life with fluid motion and meticulous attention to interactive detail. Motion design advocate.",
    initials: "JR",
    social: { github: "#", linkedin: "#" },
  },
  {
    name: "Sam Okoro",
    role: "Design Engineer",
    specialty: "Design Systems",
    bio: "Bridges the gap between design and engineering. Builds component libraries that designers love and developers trust.",
    initials: "SO",
    social: { github: "#", linkedin: "#", x: "#" },
  },
  {
    name: "Morgan Chen",
    role: "Performance Specialist",
    specialty: "Web Performance",
    bio: "Makes the web faster, one millisecond at a time. Core Web Vitals expert with a background in browser internals.",
    initials: "MC",
    social: { github: "#", linkedin: "#" },
  },
  {
    name: "Riley Park",
    role: "Full-Stack Developer",
    specialty: "Next.js & APIs",
    bio: "Full-stack generalist who loves the seam between server and client. Architect of seamless data flows.",
    initials: "RP",
    social: { github: "#", linkedin: "#", x: "#" },
  },
] as const

export const testimonials = [
  {
    quote:
      "Untanglit transformed our frontend from a brittle codebase into a reliable product foundation. Their process was transparent, their code quality was excellent, and the results speak for themselves -- 40% faster load times and a 25% lift in conversions.",
    name: "Catherine Liu",
    role: "VP of Product",
    company: "Bloom Retail",
  },
  {
    quote:
      "Working with Alex and the team felt like having a world-class engineering department on speed dial. They didn't just build our design system -- they mentored our team to own it going forward.",
    name: "David Okafor",
    role: "CTO",
    company: "Prism Software",
  },
  {
    quote:
      "We needed a patient portal that was both HIPAA-compliant and genuinely pleasant to use. Untanglit delivered on both fronts with a level of clarity and execution we did not think was possible under our constraints.",
    name: "Dr. Sarah Winters",
    role: "Chief Digital Officer",
    company: "Nexus Health",
  },
  {
    quote:
      "Their attention to detail is unmatched. Every animation, every micro-interaction, every edge case -- they thought of everything. Our users constantly tell us how smooth the experience feels.",
    name: "Marcus Tanaka",
    role: "Founder",
    company: "Velocity Labs",
  },
] as const

export const stats = [
  { value: 10, suffix: "+", label: "Years of Craft" },
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 30, suffix: "+", label: "Clients Served" },
  { value: 5, suffix: "", label: "Collaborators" },
] as const

export const socialLinks = [
  { label: "GitHub", href: "#", icon: "Github" as const },
  { label: "LinkedIn", href: "#", icon: "Linkedin" as const },
  { label: "X", href: "#", icon: "Twitter" as const },
  { label: "Email", href: "mailto:hello@untanglit.dev", icon: "Mail" as const },
] as const

export const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "GraphQL",
  "Vercel",
] as const
