import Link from "next/link";
import { Button } from "../../components/ui/button";
function LandingPage() {
  return (
    <div className="fixed_height flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500  text-white">
      <h1 className="lg:text-5xl  md:text-4xl text-3xl font-bold mb-6">
        Welcome to Your To-Do List
      </h1>
      <p className="lg:text-xl md:text-xl text-md text-center mb-8">
        Organize your tasks effortlessly, track your progress, and stay
        productive.
      </p>
      <Link href={"/sign-up"}>
        <Button className="bg-white text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-lg">
          Get Started
        </Button>
      </Link>
    </div>
  );
}

export default LandingPage;
