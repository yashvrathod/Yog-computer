import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SocialSidebar } from "@/components/layout/social-sidebar"
import { ScrollToTop } from "@/components/ui/scroll-to-top"
import { HeroSection } from "@/components/home/hero-section"
import { StatsSection } from "@/components/home/stats-section"
import { AboutPreview } from "@/components/home/about-preview"
import { ClientsSection } from "@/components/home/clients-section"
import { FeaturedProductsSection } from "@/components/home/featured-products-section"
import { FeaturesSection } from "@/components/home/features-section"
import { ProcessSection } from "@/components/home/process-section"
import { IndustriesSection } from "@/components/home/industries-section"
import { TechnologySection } from "@/components/home/technology-section"
import { InsightsSection } from "@/components/home/insights-section"
import { PartnershipSection } from "@/components/home/partnership-section"
import { ShowcaseSection } from "@/components/home/showcase-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <Header />
      <SocialSidebar />
      <ScrollToTop />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutPreview />
        <ClientsSection />
        <FeaturedProductsSection />
        <FeaturesSection />
        <ProcessSection />
        <IndustriesSection />
        <TechnologySection />
        <InsightsSection />
        <PartnershipSection />
        <ShowcaseSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
