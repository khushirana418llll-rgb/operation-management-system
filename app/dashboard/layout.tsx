import PageTransition from "@/components/custome-components/pageTransition";
import SideBar from "@/components/custome-components/sideBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full">
      <SideBar />
      <main className="flex-1 bg-gray-100 relative overflow-hidden">
        <PageTransition>
          <div className="h-full w-full overflow-auto">
            {children}
          </div>
        </PageTransition>
      </main>

    </div>
  );
}
