import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import AiTools from "@/components/AiTools";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import CallToAction from "@/components/CallToAction";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  useEffect(() => {
    // Set page title
    document.title = "Fenzo AI Boosters - AI-Powered Tools for Indian Businesses";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        <AiTools />
        <Testimonials />
        <Pricing />
        <Faq />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}