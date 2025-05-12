import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Headset, 
  Hash, 
  Bot, 
  Globe, 
  Languages, 
  Mail, 
  UserPlus, 
  CalendarCheck,
  BarChart4,
  ArrowRight
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AiTools() {
  const tools = [
    {
      title: "AI WhatsApp Chatbot",
      description: "Automate customer replies 24/7 on WhatsApp – no coding needed.",
      icon: <FaWhatsapp className="text-white text-5xl" />,
    },
    {
      title: "AI Customer Support Agent",
      description: "Handle queries, complaints, and feedback with smart AI.",
      icon: <Headset className="text-white text-5xl h-12 w-12" />,
    },
    {
      title: "AI Social Media Post Writer",
      description: "Auto-generate daily Instagram/Facebook content ideas.",
      icon: <Hash className="text-white text-5xl h-12 w-12" />,
    },
    {
      title: "Custom GPT Bots",
      description: "Create your own GPT for FAQs, tutoring, or business knowledge.",
      icon: <Bot className="text-white text-5xl h-12 w-12" />,
    },
    {
      title: "Mini AI Websites",
      description: "Build quick, smart landing pages with AI (no developer needed).",
      icon: <Globe className="text-white text-5xl h-12 w-12" />,
    },
    {
      title: "Local Language AI Chat",
      description: "AI that responds in Tamil, Hindi, etc., for regional users.",
      icon: <Languages className="text-white text-5xl h-12 w-12" />,
    },
    {
      title: "AI Email Reply Generator",
      description: "Auto-draft customer emails instantly.",
      icon: <Mail className="text-white text-5xl h-12 w-12" />,
    },
    {
      title: "Lead Collector AI",
      description: "AI that talks to visitors and saves lead/contact details.",
      icon: <UserPlus className="text-white text-5xl h-12 w-12" />,
    },
    {
      title: "Appointment Booking AI",
      description: "Let users auto-schedule calls or meetings via WhatsApp.",
      icon: <CalendarCheck className="text-white text-5xl h-12 w-12" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="tools" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Our AI-Powered Tools</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Custom-built AI solutions designed to solve real problems faced by Indian businesses.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {tools.map((tool, index) => (
            <motion.div 
              key={index} 
              className="feature-card bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
              variants={itemVariants}
            >
              <div className="h-48 bg-gradient flex items-center justify-center">
                {tool.icon}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <Button variant="link" className="text-primary font-medium hover:text-primary-dark transition-colors p-0">
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 bg-gray-100 rounded-xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 mb-4">Coming Soon</Badge>
          <h3 className="text-2xl font-bold mb-4">Business Analytics Dashboard</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            View AI reports – number of chats, leads, and conversions. Get insights into how your AI tools are performing and growing your business.
          </p>
          <Button variant="link" className="text-primary font-medium hover:text-primary-dark transition-colors">
            Join waitlist <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
