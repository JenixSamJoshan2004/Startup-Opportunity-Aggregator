import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="bg-black text-white min-h-screen flex overflow-hidden">
      {/* SIDEBAR */}

      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}

      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* NAVBAR */}

        <Navbar />

        {/* PAGE CONTENT */}

        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
