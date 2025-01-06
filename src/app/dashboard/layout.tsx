import Sidebar from "@/components/sidebar/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-5 fixed_height">
    <aside className="col-span-1">
      <Sidebar />
    </aside>
    <main className="col-span-4 px-4 py-6 bg-gray-100 fixed_height overflow-y-auto">
      {children}
    </main>
  </div>
);
}
