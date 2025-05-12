import { db } from './db';
import { plans } from '@shared/schema';

async function seedDatabase() {
  console.log('🌱 Seeding database...');
  
  // Check if plans already exist
  const existingPlans = await db.select().from(plans);
  
  if (existingPlans.length > 0) {
    console.log('Plans already exist, skipping seed.');
    return;
  }

  // Seed pricing plans
  await db.insert(plans).values([
    {
      name: "Starter",
      description: "Perfect for small businesses just getting started",
      monthlyPrice: "999",
      yearlyPrice: "9590",
      features: JSON.stringify([
        { text: "3 AI tools of your choice", included: true },
        { text: "500 AI interactions per month", included: true },
        { text: "Hindi language support", included: true },
        { text: "Email support", included: true },
        { text: "Custom branding", included: false },
        { text: "Advanced analytics", included: false },
      ]),
    },
    {
      name: "Growth",
      description: "For businesses ready to accelerate growth",
      monthlyPrice: "2499",
      yearlyPrice: "23990",
      features: JSON.stringify([
        { text: "All AI tools included", included: true },
        { text: "2,000 AI interactions per month", included: true },
        { text: "5 Indian language support", included: true },
        { text: "Priority email & chat support", included: true },
        { text: "Custom branding", included: true },
        { text: "Advanced analytics", included: false },
      ]),
    },
    {
      name: "Enterprise",
      description: "Custom solutions for larger businesses",
      monthlyPrice: "4999",
      yearlyPrice: "47990",
      features: JSON.stringify([
        { text: "All AI tools + custom development", included: true },
        { text: "Unlimited AI interactions", included: true },
        { text: "All Indian languages supported", included: true },
        { text: "24/7 priority support", included: true },
        { text: "Custom branding & white label", included: true },
        { text: "Advanced analytics & reporting", included: true },
      ]),
    }
  ]);

  console.log('✅ Database seeded successfully!');
}

// Run the seed function
seedDatabase()
  .catch(console.error)
  .finally(() => {
    // Close the database connection
    process.exit(0);
  });