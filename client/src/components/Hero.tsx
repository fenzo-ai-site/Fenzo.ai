import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            className="w-full lg:w-1/2 mb-10 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight mb-6">
              Grow Your <span className="text-gradient">Indian Business</span> with AI Automation
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
              Automate daily operations and boost your growth with custom-built AI tools designed specifically for small Indian businesses.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-6 border-gray-300 hover:border-primary hover:text-primary transition-colors"
                asChild
              >
                <a href="#demo">
                  Watch Demo <PlayCircle className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop" 
                alt="AI Business Technology" 
                className="rounded-xl shadow-2xl w-full h-auto object-cover" 
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
