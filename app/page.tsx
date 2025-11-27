import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SocialSidebar } from "@/components/layout/social-sidebar"
import { HeroSection } from "@/components/home/hero-section"
import { AboutPreview } from "@/components/home/about-preview"
import { ClientsSection } from "@/components/home/clients-section"
import { FeaturesSection } from "@/components/home/features-section"
import { ShowcaseSection } from "@/components/home/showcase-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <Header />
      <SocialSidebar />
      <main>
        <HeroSection />
        <AboutPreview />
        <ClientsSection />
        <FeaturesSection />
        <ShowcaseSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
