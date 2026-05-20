import {
  LayoutDashboard,
  Database,
  BarChart3,
  TrendingUp,
  Bookmark,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      location.pathname === path
        ? "bg-green-500/10 text-green-400"
        : "text-zinc-400 hover:bg-zinc-900"
    }`;

  return (
    <div className="w-64 bg-zinc-950 border-r border-zinc-800 min-h-screen p-6 sticky top-0">
      <h1 className="text-2xl font-bold text-green-400 mb-10">
        Startup Aggregator
      </h1>

      <nav className="space-y-4">
        <Link to="/" className={linkClass("/")}>
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link to="/" className={linkClass("/")}>
          <Database size={20} />
          Opportunities
        </Link>

        <Link to="/" className={linkClass("/")}>
          <BarChart3 size={20} />
          Analytics
        </Link>

        <Link to="/" className={linkClass("/")}>
          <TrendingUp size={20} />
          Trending
        </Link>

        <Link to="/bookmarks" className={linkClass("/bookmarks")}>
          <Bookmark size={20} />
          Bookmarks
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
