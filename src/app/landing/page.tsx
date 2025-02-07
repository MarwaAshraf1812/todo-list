import Link from "next/link";
import { Button } from "../../components/ui/button";
import FeatureCard from "@/components/FeatureCard";
function LandingPage() {
  return (
    <main className="min-h-screen relative">
    <div className="container mx-auto px-4 py-20">
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto mt-20">
    <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-lavender-600 via-lavender-500 to-lavender-400">
      Organize Your Life with Elegance
    </h1>
    <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
      Transform your daily tasks into achievable goals with our minimalist and powerful todo list application.
    </p>
    
    <div className="flex gap-4">
      <Link href={'/signup'}>
      <Button 
        size="lg" 
        className="bg-lavender-600 hover:bg-lavender-700 shadow-lg hover:shadow-lavender-500/25 transition-all duration-300 px-8"
      >
        Get Started Free
      </Button>
      </Link>
      <Button 
        size="lg" 
        variant="outline"
        className="border-lavender-400 text-lavender-600 hover:bg-lavender-500/10 transition-colors duration-300"
      >
        Learn More
      </Button>
    </div>

    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
      <FeatureCard 
        title="Simple & Elegant"
        description="Clean interface that helps you focus on what matters most"
      />
      <FeatureCard 
        title="Stay Organized"
        description="Categorize and prioritize your tasks effortlessly"
      />
      <FeatureCard 
        title="Track Progress"
        description="Visual insights into your productivity journey"
      />
    </div>
  </div>
</div>
</main>
);
}

export default LandingPage;
