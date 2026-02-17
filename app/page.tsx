import { NavHeader } from "@/components/nav-header"
import { HeroSection } from "@/components/hero-section"
import { ProcessSection } from "@/components/process-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { TeamSection } from "@/components/team-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { WebBackground } from "@/components/web-background"

export default function Page() {
  return (
    <>
      {/* Ambient spider web background */}
      <WebBackground />

      {/* Navigation */}
      <NavHeader />

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />

        <div className="relative">
          <ProcessSection />
          <AboutSection />
          <ServicesSection />
          <PortfolioSection />
          <TeamSection />
          <TestimonialsSection />
          <ContactSection />
        </div>
      </main>

      <Footer />
    </>
  )
}
