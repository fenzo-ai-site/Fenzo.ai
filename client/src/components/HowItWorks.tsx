import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Choose Your AI Tools",
      description: "Select from our range of specialized AI tools designed for Indian businesses.",
      image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      alt: "Choose AI Tools"
    },
    {
      number: 2,
      title: "Quick Setup",
      description: "Configure your tools with our guided setup process – no technical skills needed.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      alt: "Quick Setup Process"
    },
    {
      number: 3,
      title: "Watch Your Business Grow",
      description: "Let the AI handle routine tasks while you focus on strategic business growth.",
      image: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
      alt: "Business Growth Chart"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">How BizAI Boosts Your Business</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform automates routine tasks so you can focus on what matters – growing your business.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 text-white text-2xl font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              <motion.img 
                src={step.image} 
                alt={step.alt} 
                className="mt-6 rounded-lg shadow-md w-full max-w-xs h-auto object-cover" 
                initial={{ scale: 0.9, opacity: 0.8 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
