import AppSidebar from "@/components/sidebar/sidebar";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="grid bg-white grid-cols-5 fixed_height">
      <aside className="col-span-1">
        <AppSidebar
        />
      </aside>
      <main className="col-span-4 px-4 py-6 bg-whitefixed_height overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
