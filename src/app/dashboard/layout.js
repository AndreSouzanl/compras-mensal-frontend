import Sidebar from "@/components/Sidebar"
import Topbar from "@/components/Topbar"
import { SidebarProvider } from "@/context/SidebarContext"

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[#060b14]">

        {/* SIDEBAR */}
        <Sidebar />

        {/* LADO DIREITO */}
        <div className="flex flex-col flex-1 min-w-0">
          <Topbar />
          <main className="flex-1 p-6 overflow-y-auto">
            {children}
          </main>
        </div>

      </div>
    </SidebarProvider>
  )
}