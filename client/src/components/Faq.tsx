import { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  const faqs = [
    {
      question: "How do I get started with BizAI Boosters?",
      answer: "Getting started is easy! Simply sign up for an account, choose your plan, and select the AI tools you want to use. Our guided setup process will help you configure each tool for your specific business needs. If you need assistance, our support team is always available to help."
    },
    {
      question: "Do I need technical skills to use the platform?",
      answer: "No technical skills required! BizAI Boosters is designed to be user-friendly for business owners of all technical levels. Our platform uses simple, guided interfaces to help you set up and manage your AI tools. If you ever get stuck, our comprehensive tutorials and support team are ready to assist."
    },
    {
      question: "Which Indian languages are supported?",
      answer: "Our platform currently supports Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, and Urdu. We're continuously adding more regional languages to ensure businesses across India can communicate with their customers in their preferred language."
    },
    {
      question: "Is my business data secure?",
      answer: "Absolutely! Data security is our top priority. We use enterprise-grade encryption for all data and are compliant with Indian data protection regulations. Your business data never leaves our secure servers, and we have strict access controls in place. Additionally, we regularly conduct security audits to ensure your information remains protected."
    },
    {
      question: "Can I try BizAI Boosters before committing?",
      answer: "Yes! We offer a 7-day free trial that gives you access to all features of our Growth plan. This allows you to test our AI tools with your business before making a decision. No credit card is required for the trial, and you can cancel anytime. If you need more time to evaluate, our sales team can arrange an extended trial period."
    },
    {
      question: "How quickly will I see results?",
      answer: "Most businesses start seeing results within the first week of implementation. The AI tools begin working immediately, automating tasks and engaging with customers. However, the full impact on business growth typically becomes more apparent after 30-60 days of use, as the AI learns and optimizes based on your specific business interactions."
    }
  ];

  return (
    <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about BizAI Boosters and how it can help your business.
          </p>
        </motion.div>
        
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-4 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="px-6 py-4 font-medium text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-600 border-t border-gray-100">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
