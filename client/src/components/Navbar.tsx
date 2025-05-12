import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-primary" />
              <span className="font-poppins font-bold text-xl">
                BizAI <span className="text-accent">Boosters</span>
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="font-medium text-gray-700 hover:text-primary transition-colors">
              Features
            </a>
            <a href="#tools" className="font-medium text-gray-700 hover:text-primary transition-colors">
              AI Tools
            </a>
            <a href="#pricing" className="font-medium text-gray-700 hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="font-medium text-gray-700 hover:text-primary transition-colors">
              Testimonials
            </a>
            <a href="#contact" className="font-medium text-gray-700 hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-primary hover:text-primary-dark">
              Login
            </Button>
            <Button className="bg-primary hover:bg-primary-dark text-white">
              Get Started
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-700"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-2 space-y-3">
              <a href="#features" className="block py-2 font-medium text-gray-700 hover:text-primary" onClick={closeMenu}>
                Features
              </a>
              <a href="#tools" className="block py-2 font-medium text-gray-700 hover:text-primary" onClick={closeMenu}>
                AI Tools
              </a>
              <a href="#pricing" className="block py-2 font-medium text-gray-700 hover:text-primary" onClick={closeMenu}>
                Pricing
              </a>
              <a href="#testimonials" className="block py-2 font-medium text-gray-700 hover:text-primary" onClick={closeMenu}>
                Testimonials
              </a>
              <a href="#contact" className="block py-2 font-medium text-gray-700 hover:text-primary" onClick={closeMenu}>
                Contact
              </a>
              <div className="pt-2 pb-4 flex flex-col space-y-3">
                <Button variant="outline" className="w-full text-primary border-primary">
                  Login
                </Button>
                <Button className="w-full bg-primary hover:bg-primary-dark text-white">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
