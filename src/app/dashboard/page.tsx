import { useUser } from '@clerk/nextjs';

const DashboardPage = () => {
  const { user } = useUser();

  return (
    <div>
      <h1>Welcome {user?.firstName}</h1>
      <p>Your dashboard</p>
    </div>
  );
};

export default DashboardPage;
