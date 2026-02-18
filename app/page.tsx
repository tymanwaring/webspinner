import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { MarqueeBand } from "@/components/marquee-band"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { CaseStudies } from "@/components/case-studies"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <MarqueeBand />
        <Services />
        <About />
        <CaseStudies />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
