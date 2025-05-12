import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses just getting started",
      monthlyPrice: "₹999",
      yearlyPrice: "₹9,590",
      features: [
        { text: "3 AI tools of your choice", included: true },
        { text: "500 AI interactions per month", included: true },
        { text: "Hindi language support", included: true },
        { text: "Email support", included: true },
        { text: "Custom branding", included: false },
        { text: "Advanced analytics", included: false },
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Growth",
      description: "For businesses ready to accelerate growth",
      monthlyPrice: "₹2,499",
      yearlyPrice: "₹23,990",
      features: [
        { text: "All AI tools included", included: true },
        { text: "2,000 AI interactions per month", included: true },
        { text: "5 Indian language support", included: true },
        { text: "Priority email & chat support", included: true },
        { text: "Custom branding", included: true },
        { text: "Advanced analytics", included: false },
      ],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Enterprise",
      description: "Custom solutions for larger businesses",
      monthlyPrice: "₹4,999",
      yearlyPrice: "₹47,990",
      features: [
        { text: "All AI tools + custom development", included: true },
        { text: "Unlimited AI interactions", included: true },
        { text: "All Indian languages supported", included: true },
        { text: "24/7 priority support", included: true },
        { text: "Custom branding & white label", included: true },
        { text: "Advanced analytics & reporting", included: true },
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const handleToggleChange = () => {
    setIsYearly(!isYearly);
  };

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for your business. All plans include core features with no hidden fees.
          </p>
          <div className="flex justify-center items-center mt-8">
            <span className={cn("font-medium mr-3", !isYearly ? "text-primary" : "text-gray-600")}>Monthly</span>
            <Switch
              checked={isYearly}
              onCheckedChange={handleToggleChange}
              className="data-[state=checked]:bg-primary"
            />
            <span className={cn("font-medium ml-3 flex items-center", isYearly ? "text-primary" : "text-gray-600")}>
              Yearly 
              <span className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full ml-2">Save 20%</span>
            </span>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              className={cn(
                "bg-white rounded-xl shadow-lg overflow-hidden border transition-transform duration-300 hover:scale-105 relative",
                plan.popular ? "border-2 border-primary shadow-xl" : "border-gray-100"
              )}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-8 border-b">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="flex items-end">
                  <span className="text-4xl font-bold">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-600 ml-2 mb-1">/month</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">+ 18% GST</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      {feature.included ? (
                        <Check className="text-green-500 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                      ) : (
                        <X className="text-gray-400 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                      )}
                      <span className={!feature.included ? "text-gray-400" : ""}>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-8 bg-primary hover:bg-primary-dark text-white">
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 bg-gray-100 rounded-xl p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-center">Need a custom solution?</h3>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            We understand that every business is unique. Contact our team for a custom solution tailored to your specific needs.
          </p>
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-dark text-white"
              asChild
            >
              <a href="#contact">Contact Us</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
