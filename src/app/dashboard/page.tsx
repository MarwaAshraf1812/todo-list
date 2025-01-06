import { auth } from "@clerk/nextjs/server";
import TaskManager from "@/components/TaskManager";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    return <div>Please log in to view your tasks.</div>;
  }

  return <TaskManager userId={userId} />;
}
