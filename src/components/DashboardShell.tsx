
export function DashboardShell({
  children
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex max-h-screen flex-col">
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        <div className="container grid items-start gap-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}