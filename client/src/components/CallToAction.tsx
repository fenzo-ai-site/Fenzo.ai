import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient text-white">
      <div className="container mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">Ready to Boost Your Business with AI?</h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Join 500+ Indian businesses already growing faster with our AI tools. Get started today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              size="lg" 
              className="px-8 py-6 bg-white text-primary hover:bg-gray-100 transition-transform hover:scale-105 duration-200 shadow-lg font-bold text-lg"
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg"
              variant="outline" 
              className="px-8 py-6 border-2 border-white hover:bg-white/10 text-white font-bold text-lg"
              asChild
            >
              <a href="#demo">
                Watch Demo <PlayCircle className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
          <p className="mt-6 text-white/80">No credit card required. 7-day free trial.</p>
        </motion.div>
      </div>
    </section>
  );
}
