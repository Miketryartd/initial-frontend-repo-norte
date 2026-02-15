import { useState } from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-neutral-50 overflow-hidden relative">
     
      <aside
        className={`
          fixed z-20 h-full bg-white border-r border-neutral-200 flex flex-col py-6
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:w-64 w-64
        `}
      >
        <Dashboard />
      </aside>

  
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

  
      <div className="flex flex-col flex-1 min-w-0">
      
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
