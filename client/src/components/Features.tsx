import { motion } from "framer-motion";
import { 
  Zap, 
  Languages, 
  TrendingUp, 
  Shield, 
  Headset, 
  RefreshCw 
} from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Quick Setup",
      description: "Get your AI tools up and running in minutes, not days. No coding or technical expertise required.",
      icon: <Zap className="text-primary text-2xl h-6 w-6" />
    },
    {
      title: "Local Language Support",
      description: "Our AI understands and responds in multiple Indian languages including Hindi, Tamil, and more.",
      icon: <Languages className="text-primary text-2xl h-6 w-6" />
    },
    {
      title: "Proven Results",
      description: "Businesses using our platform see significant growth in revenue and improved operational efficiency.",
      icon: <TrendingUp className="text-primary text-2xl h-6 w-6" />
    },
    {
      title: "Data Security",
      description: "Your business data is protected with enterprise-grade security. We're compliant with all Indian data laws.",
      icon: <Shield className="text-primary text-2xl h-6 w-6" />
    },
    {
      title: "24/7 Support",
      description: "Our dedicated support team is always available to help you get the most out of our platform.",
      icon: <Headset className="text-primary text-2xl h-6 w-6" />
    },
    {
      title: "Regular Updates",
      description: "We're constantly improving our AI models and adding new features based on your feedback.",
      icon: <RefreshCw className="text-primary text-2xl h-6 w-6" />
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
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Why Choose Fenzo AI Boosters?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform is designed with Indian businesses in mind, providing powerful AI tools that are easy to use and deliver real results.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="feature-card bg-white rounded-xl shadow-lg p-8 border border-gray-100"
              variants={itemVariants}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
