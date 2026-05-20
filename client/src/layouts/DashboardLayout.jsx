import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
