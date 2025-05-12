import { motion } from "framer-motion";
import { Building, Store, ShoppingBag, Utensils, Shirt } from "lucide-react";

export default function Partners() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-gray-600 font-medium">Trusted by businesses across India</p>
        </div>
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants} className="w-24 md:w-32 flex items-center justify-center">
            <Building className="h-8 w-8 text-gray-500 mr-2" />
            <span className="font-medium text-gray-600">Company A</span>
          </motion.div>
          <motion.div variants={itemVariants} className="w-24 md:w-32 flex items-center justify-center">
            <Store className="h-8 w-8 text-gray-500 mr-2" />
            <span className="font-medium text-gray-600">Company B</span>
          </motion.div>
          <motion.div variants={itemVariants} className="w-24 md:w-32 flex items-center justify-center">
            <ShoppingBag className="h-8 w-8 text-gray-500 mr-2" />
            <span className="font-medium text-gray-600">Company C</span>
          </motion.div>
          <motion.div variants={itemVariants} className="w-24 md:w-32 flex items-center justify-center">
            <Utensils className="h-8 w-8 text-gray-500 mr-2" />
            <span className="font-medium text-gray-600">Company D</span>
          </motion.div>
          <motion.div variants={itemVariants} className="w-24 md:w-32 flex items-center justify-center">
            <Shirt className="h-8 w-8 text-gray-500 mr-2" />
            <span className="font-medium text-gray-600">Company E</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
