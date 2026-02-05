import Header from "./Header";
import Dashboard from "./Dashboard";



const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full bg-neutral-50 overflow-hidden">
      

      <Dashboard />

    
      <div className="flex flex-col flex-1 min-w-0">
        
    
        <Header />

       
        <main className="flex-1 overflow-y-auto p-6">
          {children} 
        </main>

      </div>
    </div>
  );
};

export default Layout;