import {
  LayoutDashboard,
  Database,
  BarChart3,
  TrendingUp,
  Bookmark,
} from "lucide-react";

import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="w-64 bg-zinc-950 border-r border-zinc-800 min-h-screen p-6 sticky top-0">
      <h1 className="text-2xl font-bold text-green-400 mb-10">
        Startup Aggregator
      </h1>

      <nav className="space-y-4">
        {/* DASHBOARD */}
        <Link
          to="/"
          className="flex items-center gap-3 bg-green-500/10 text-green-400 px-4 py-3 rounded-xl hover:bg-green-500/20 transition"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        {/* OPPORTUNITIES */}
        <a
          href="#opportunities"
          className="flex items-center gap-3 text-zinc-400 hover:bg-zinc-900 px-4 py-3 rounded-xl transition"
        >
          <Database size={20} />
          Opportunities
        </a>

        {/* ANALYTICS */}
        <a
          href="#analytics"
          className="flex items-center gap-3 text-zinc-400 hover:bg-zinc-900 px-4 py-3 rounded-xl transition"
        >
          <BarChart3 size={20} />
          Analytics
        </a>

        {/* TRENDING */}
        <a
          href="#trending"
          className="flex items-center gap-3 text-zinc-400 hover:bg-zinc-900 px-4 py-3 rounded-xl transition"
        >
          <TrendingUp size={20} />
          Trending
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
