import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Restaurant Owner, Mumbai",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      content: "The WhatsApp Chatbot has been a game-changer for our restaurant. It handles reservations 24/7 and answers common questions, freeing up my staff to focus on providing great service.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Boutique Owner, Delhi",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      content: "The Social Media Post Writer saves me hours every week. It creates trendy content for my fashion boutique that resonates with my audience. My engagement has increased by 60%!",
      rating: 4.5
    },
    {
      name: "Vikram Patel",
      role: "IT Service Provider, Bangalore",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      content: "We implemented the Local Language AI Chat and it's been amazing. Our customers in Tamil Nadu and Karnataka can now get support in their preferred languages. Customer satisfaction is up by 45%.",
      rating: 5
    },
    {
      name: "Ananya Reddy",
      role: "E-commerce Owner, Chennai",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      content: "The Lead Collector AI has transformed our business. It engages with website visitors, collects their information, and sends it directly to our sales team. Our conversion rate has doubled!",
      rating: 4.5
    }
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Update scroll position for conditional rendering of buttons
      setTimeout(() => {
        setScrollPosition(container.scrollLeft);
      }, 400);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-yellow-400 text-yellow-400 h-5 w-5" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-yellow-400 text-yellow-400 h-5 w-5" />);
    }
    
    return stars;
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">What Indian Businesses Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from business owners who've transformed their operations with BizAI Boosters.
          </p>
        </motion.div>
        
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="testimonial-container flex space-x-6 overflow-x-auto pb-8 px-4 -mx-4 scrollbar-hide"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="testimonial flex-shrink-0 w-full md:w-96 bg-white rounded-xl shadow-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "{testimonial.content}"
                </p>
                <div className="flex text-yellow-400">
                  {renderStars(testimonial.rating)}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Navigation controls */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10 text-gray-700 hover:text-primary border-0"
            onClick={() => handleScroll('left')}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10 text-gray-700 hover:text-primary border-0"
            onClick={() => handleScroll('right')}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
