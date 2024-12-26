import { auth} from '@clerk/nextjs/server'
import LandingPage from "./landing/page";
import { redirect } from "next/navigation";

export default async function App() {
  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard');
  }
  return (
    <LandingPage />
  );
}
