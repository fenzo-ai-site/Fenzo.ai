import { Link } from "wouter";
import { Bot } from "lucide-react";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube 
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerColumns = [
    {
      title: "AI Tools",
      links: [
        { label: "AI WhatsApp Chatbot", href: "#" },
        { label: "AI Customer Support", href: "#" },
        { label: "Social Media Writer", href: "#" },
        { label: "Custom GPT Bots", href: "#" },
        { label: "Mini AI Websites", href: "#" },
        { label: "View All Tools", href: "#tools" },
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Press & Media", href: "#" },
        { label: "Partner Program", href: "#" },
        { label: "Contact Us", href: "#contact" },
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Documentation", href: "#" },
        { label: "Tutorials", href: "#" },
        { label: "Case Studies", href: "#" },
        { label: "Webinars", href: "#" },
        { label: "API Reference", href: "#" },
      ]
    }
  ];
  
  const socialLinks = [
    { icon: <FaFacebookF />, href: "#" },
    { icon: <FaTwitter />, href: "#" },
    { icon: <FaInstagram />, href: "#" },
    { icon: <FaLinkedinIn />, href: "#" },
    { icon: <FaYoutube />, href: "#" }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Bot className="h-8 w-8 text-white" />
              <span className="font-poppins font-bold text-xl">
                BizAI <span className="text-accent">Boosters</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering Indian businesses with AI tools that drive growth, automation, and customer satisfaction.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} className="text-gray-400 hover:text-white transition-colors">
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {footerColumns.map((column, index) => (
            <div key={index}>
              <h3 className="font-bold text-lg mb-6">{column.title}</h3>
              <ul className="space-y-4">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {currentYear} BizAI Boosters. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
