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
  ArrowRight,
  FileText,
  Star,
  Calendar,
  Bell,
  Image,
  LayoutDashboard,
  Phone,
  MessageCircle,
  Brain
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/modal";

export default function AiTools() {
  const tools = [
    {
      title: "AI WhatsApp Chatbot",
      description: "Automate customer replies 24/7 on WhatsApp – no coding needed.",
      icon: <FaWhatsapp className="text-white text-5xl" />,
      details: {
        features: [
          "24/7 automated customer support",
          "Instant responses to common queries",
          "Multi-language support",
          "Customizable responses",
          "Integration with your business hours"
        ],
        benefits: [
          "Reduce response time to seconds",
          "Handle multiple customers simultaneously",
          "Never miss a customer message",
          "Save on customer support costs",
          "Improve customer satisfaction"
        ],
        useCases: [
          "Order status inquiries",
          "Product information",
          "Appointment scheduling",
          "Basic customer support",
          "FAQ responses"
        ]
      }
    },
    {
      title: "AI Customer Support Agent",
      description: "Handle queries, complaints, and feedback with smart AI.",
      icon: <Headset className="text-white text-5xl h-12 w-12" />,
      details: {
        features: [
          "Natural language understanding",
          "Context-aware responses",
          "Multi-channel support",
          "Sentiment analysis",
          "Automated ticket routing"
        ],
        benefits: [
          "Reduce support ticket volume",
          "Improve response accuracy",
          "Handle complex queries",
          "24/7 availability",
          "Consistent service quality"
        ],
        useCases: [
          "Technical support",
          "Product troubleshooting",
          "Order tracking",
          "Refund requests",
          "General inquiries"
        ]
      }
    },
    {
      title: "AI Social Media Post Writer",
      description: "Auto-generate daily Instagram/Facebook content ideas.",
      icon: <Hash className="text-white text-5xl h-12 w-12" />,
      details: {
        features: [
          "Content calendar generation",
          "Trend-based suggestions",
          "Hashtag optimization",
          "Multi-platform support",
          "Brand voice consistency"
        ],
        benefits: [
          "Save time on content creation",
          "Maintain consistent posting",
          "Increase engagement",
          "Reach target audience",
          "Boost social media presence"
        ],
        useCases: [
          "Daily posts",
          "Product promotions",
          "Event announcements",
          "Customer testimonials",
          "Industry insights"
        ]
      }
    },
    {
      title: "Custom GPT Bots",
      description: "Create your own GPT for FAQs, tutoring, or business knowledge.",
      icon: <Bot className="text-white text-5xl h-12 w-12" />,
      details: {
        features: [
          "Custom knowledge base",
          "Industry-specific training",
          "Multi-format responses",
          "Learning capabilities",
          "Integration options"
        ],
        benefits: [
          "Automate specialized tasks",
          "Reduce training time",
          "Improve accuracy",
          "Scale operations",
          "Enhance customer experience"
        ],
        useCases: [
          "Product training",
          "Technical documentation",
          "Customer education",
          "Internal knowledge base",
          "Process automation"
        ]
      }
    },
    {
      title: "Mini AI Websites",
      description: "Build quick, smart landing pages with AI (no developer needed).",
      icon: <Globe className="text-white text-5xl h-12 w-12" />,
      details: {
        features: [
          "AI-powered design",
          "Mobile responsiveness",
          "SEO optimization",
          "Lead capture forms",
          "Analytics integration"
        ],
        benefits: [
          "Quick deployment",
          "Professional design",
          "Cost-effective",
          "Easy maintenance",
          "Conversion focused"
        ],
        useCases: [
          "Product launches",
          "Event promotions",
          "Service offerings",
          "Portfolio showcase",
          "Lead generation"
        ]
      }
    },
    {
      title: "Local Language AI Chat",
      description: "AI that responds in Tamil, Hindi, etc., for regional users.",
      icon: <Languages className="text-white text-5xl h-12 w-12" />,
      details: {
        features: [
          "Multiple Indian languages",
          "Cultural context awareness",
          "Regional dialect support",
          "Voice input/output",
          "Translation capabilities"
        ],
        benefits: [
          "Reach local customers",
          "Build trust",
          "Improve accessibility",
          "Increase engagement",
          "Expand market reach"
        ],
        useCases: [
          "Local customer support",
          "Regional marketing",
          "Community engagement",
          "Government services",
          "Educational content"
        ]
      }
    },
    {
      title: "AI Email Reply Generator",
      description: "Auto-draft customer emails instantly.",
      icon: <Mail className="text-white text-5xl h-12 w-12" />,
      details: {
        features: [
          "Context-aware responses",
          "Tone customization",
          "Template management",
          "Multi-language support",
          "Attachment handling"
        ],
        benefits: [
          "Save time on responses",
          "Maintain consistency",
          "Reduce errors",
          "Improve efficiency",
          "Handle high volume"
        ],
        useCases: [
          "Customer inquiries",
          "Order confirmations",
          "Support responses",
          "Follow-ups",
          "Appointment scheduling"
        ]
      }
    },
    {
      title: "Lead Collector AI",
      description: "AI that talks to visitors and saves lead/contact details.",
      icon: <UserPlus className="text-white text-5xl h-12 w-12" />,
      details: {
        features: [
          "Intelligent lead qualification",
          "Automated follow-ups",
          "CRM integration",
          "Lead scoring",
          "Custom data collection"
        ],
        benefits: [
          "Increase lead capture",
          "Qualify leads faster",
          "Reduce manual work",
          "Improve conversion",
          "Track lead sources"
        ],
        useCases: [
          "Website visitors",
          "Social media leads",
          "Event registrations",
          "Product inquiries",
          "Service requests"
        ]
      }
    },
    {
      title: "Appointment Booking AI",
      description: "Let users auto-schedule calls or meetings via WhatsApp.",
      icon: <CalendarCheck className="text-white text-5xl h-12 w-12" />,
      details: {
        features: [
          "Real-time availability",
          "Automated confirmations",
          "Reminder system",
          "Calendar integration",
          "Custom booking rules"
        ],
        benefits: [
          "Reduce no-shows",
          "Save admin time",
          "Improve scheduling",
          "Increase bookings",
          "Better organization"
        ],
        useCases: [
          "Service appointments",
          "Consultations",
          "Meetings",
          "Classes",
          "Events"
        ]
      }
    },
    {
      title: "Invoice Generator Bot",
      description: "Auto-generate professional invoices for bookings or services via WhatsApp.",
      icon: <FileText className="text-white text-5xl h-12 w-12" />,
      details: {
        features: [
          "Custom templates",
          "Automated calculations",
          "Tax handling",
          "Multi-currency support",
          "Digital signatures"
        ],
        benefits: [
          "Reduce errors",
          "Save time",
          "Professional appearance",
          "Easy tracking",
          "Faster payments"
        ],
        useCases: [
          "Service billing",
          "Product sales",
          "Subscription renewals",
          "Project milestones",
          "Recurring invoices"
        ]
      }
    },
    {
      title: "Review Collector Bot",
      description: "Automatically collect and manage customer reviews on Google and Instagram.",
      icon: <Star className="text-white text-5xl h-12 w-12" />,
      details: {
        features: [
          "Multi-platform integration",
          "Automated follow-ups",
          "Review management",
          "Response templates",
          "Analytics dashboard"
        ],
        benefits: [
          "Increase review volume",
          "Improve ratings",
          "Build trust",
          "Gain insights",
          "Save time"
        ],
        useCases: [
          "Post-purchase feedback",
          "Service reviews",
          "Product ratings",
          "Experience surveys",
          "Customer satisfaction"
        ]
      }
    },
    {
      title: "Room Availability AI",
      description: "24/7 automated system to check and communicate room availability.",
      icon: <Calendar className="text-white text-5xl h-12 w-12" />,
      details: {
        features: [
          "Real-time availability",
          "Instant booking",
          "Price management",
          "Occupancy tracking",
          "Channel management"
        ],
        benefits: [
          "Reduce manual work",
          "Increase bookings",
          "Optimize pricing",
          "Improve efficiency",
          "Better occupancy"
        ],
        useCases: [
          "Hotels",
          "Guest houses",
          "Vacation rentals",
          "Hostels",
          "Resorts"
        ]
      }
    },
    {
      title: "Multilingual Chatbot",
      description: "AI chatbot that responds in Tamil, Hindi, and English for all customers.",
      icon: <Languages className="text-white text-5xl h-12 w-12" />,
      details: {
        features: [
          "Multiple language support",
          "Cultural context",
          "Voice recognition",
          "Translation services",
          "Custom responses"
        ],
        benefits: [
          "Wider reach",
          "Better engagement",
          "Cultural sensitivity",
          "Improved accessibility",
          "24/7 support"
        ],
        useCases: [
          "Customer service",
          "Product information",
          "Technical support",
          "Order tracking",
          "General inquiries"
        ]
      }
    },
    {
      title: "Automated Reminders",
      description: "Send automated WhatsApp reminders for check-ins, payments, and special offers.",
      icon: <Bell className="text-white text-5xl h-12 w-12" />,
      details: {
        features: [
          "Customizable templates",
          "Scheduled messages",
          "Delivery tracking",
          "Response handling",
          "Analytics dashboard"
        ],
        benefits: [
          "Reduce no-shows",
          "Improve engagement",
          "Save time",
          "Increase revenue",
          "Better communication"
        ],
        useCases: [
          "Appointment reminders",
          "Payment due dates",
          "Special offers",
          "Event notifications",
          "Follow-ups"
        ]
      }
    },
    {
      title: "Poster/Ad Generator AI",
      description: "Create beautiful, professional posters and ads for your business automatically.",
      icon: <Image className="text-white text-5xl h-12 w-12" />,
      details: {
        features: [
          "AI-powered design",
          "Custom templates",
          "Brand consistency",
          "Multiple formats",
          "Quick generation"
        ],
        benefits: [
          "Save design time",
          "Professional quality",
          "Consistent branding",
          "Quick deployment",
          "Cost-effective"
        ],
        useCases: [
          "Social media ads",
          "Event posters",
          "Product promotions",
          "Special offers",
          "Business announcements"
        ]
      }
    },
    {
      title: "Booking Dashboard",
      description: "Visual dashboard showing total bookings, leads, and business analytics.",
      icon: <LayoutDashboard className="text-white text-5xl h-12 w-12" />,
      details: {
        features: [
          "Real-time analytics",
          "Custom reports",
          "Data visualization",
          "Performance metrics",
          "Export capabilities"
        ],
        benefits: [
          "Better insights",
          "Data-driven decisions",
          "Track performance",
          "Identify trends",
          "Optimize operations"
        ],
        useCases: [
          "Business monitoring",
          "Performance tracking",
          "Revenue analysis",
          "Customer insights",
          "Resource planning"
        ]
      }
    },
    {
      title: "Voice Bot",
      description: "AI-powered voice bot that can handle customer calls professionally.",
      icon: <Phone className="text-white text-5xl h-12 w-12" />,
      details: {
        features: [
          "Natural voice synthesis",
          "Multi-language support",
          "Call recording",
          "Call routing",
          "24/7 availability"
        ],
        benefits: [
          "Handle high call volume",
          "Reduce wait times",
          "Cost-effective",
          "Consistent service",
          "Scalable support"
        ],
        useCases: [
          "Customer support",
          "Order processing",
          "Appointment scheduling",
          "Information services",
          "Emergency response"
        ]
      }
    },
    {
      title: "Website Chat Widget",
      description: "Convert website visitors into leads with our smart chat widget.",
      icon: <MessageCircle className="text-white text-5xl h-12 w-12" />,
      details: {
        features: [
          "Customizable design",
          "Lead capture",
          "Visitor tracking",
          "Chat history",
          "Integration options"
        ],
        benefits: [
          "Increase conversions",
          "Capture leads",
          "Improve engagement",
          "Track visitors",
          "Better insights"
        ],
        useCases: [
          "Lead generation",
          "Customer support",
          "Product information",
          "Service inquiries",
          "Feedback collection"
        ]
      }
    },
    {
      title: "Custom AI Memory",
      description: "Smart bot that remembers past interactions and personalizes responses.",
      icon: <Brain className="text-white text-5xl h-12 w-12" />,
      details: {
        features: [
          "Context retention",
          "Personalization",
          "Learning capabilities",
          "User profiling",
          "History tracking"
        ],
        benefits: [
          "Better engagement",
          "Personalized service",
          "Improved accuracy",
          "Efficient support",
          "Customer loyalty"
        ],
        useCases: [
          "Customer service",
          "Personal shopping",
          "Technical support",
          "Account management",
          "Relationship building"
        ]
      }
    }
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="text-primary font-medium hover:text-primary-dark transition-colors p-0">
                      Learn more <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{tool.title}</DialogTitle>
                      <DialogDescription className="text-lg mt-2">
                        {tool.description}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {tool.details.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Benefits</h4>
                        <ul className="space-y-2">
                          {tool.details.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Use Cases</h4>
                        <ul className="space-y-2">
                          {tool.details.useCases.map((useCase, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              {useCase}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
