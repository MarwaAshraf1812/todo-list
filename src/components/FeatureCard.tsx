import { CheckCircle } from "lucide-react";

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg border border-lavender-200 dark:border-lavender-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm hover:shadow-lg hover:shadow-lavender-500/10 transition-all duration-300">
      <CheckCircle className="h-12 w-12 text-lavender-600 mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-lavender-900 dark:text-lavender-100">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

export default FeatureCard;