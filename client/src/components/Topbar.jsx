import { Search } from "lucide-react";

const Topbar = () => {
  return (
    <div className="border-b border-zinc-800 bg-zinc-950 px-6 py-4 flex items-center justify-between">
      <h2 className="text-xl font-semibold">Startup Opportunities Dashboard</h2>

      <div className="flex items-center bg-zinc-900 px-4 py-2 rounded-xl w-80">
        <Search size={18} className="text-zinc-400 mr-2" />
        <input
          type="text"
          placeholder="Search opportunities..."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>
    </div>
  );
};

export default Topbar;
