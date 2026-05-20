import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Link } from "react-router-dom";
import { exportCSV, exportJSON } from "../utils/exportData";
import { useEffect, useState } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [deadlineFilter, setDeadlineFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await API.get("/opportunities");
      setOpportunities(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // FILTERS
  const filteredData = opportunities.filter((item) => {
    const matchesSearch = item.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesType = typeFilter === "All" ? true : item.type === typeFilter;
    const matchesSource =
      sourceFilter === "All" ? true : item.source === sourceFilter;

    // DEADLINE FILTER
    const today = new Date();
    const itemDeadline = item.deadline ? new Date(item.deadline) : null;

    const matchesDeadline =
      deadlineFilter === "All"
        ? true
        : deadlineFilter === "Upcoming"
          ? itemDeadline && itemDeadline >= today
          : deadlineFilter === "This Month"
            ? itemDeadline && itemDeadline.getMonth() === today.getMonth()
            : true;

    return matchesSearch && matchesType && matchesSource && matchesDeadline;
  });

  // PAGINATION
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // UPDATED CHART DATA TO REFLECT YOUR LIVE SCRAPERS
  const sourceData = [
    {
      name: "Devpost",
      value: opportunities.filter((o) => o.source === "Devpost").length,
    },
    {
      name: "Startup India",
      value: opportunities.filter((o) => o.source === "Startup India").length,
    },
    {
      name: "RSS Feed",
      value: opportunities.filter((o) => o.source === "RSS Feed").length,
    },
  ].filter((source) => source.value > 0); // Filters out metrics with 0 entries so the chart splits cleanly

  const typeData = [
    {
      name: "Hackathon",
      value: opportunities.filter((o) => o.type === "Hackathon").length,
    },
    {
      name: "Grant",
      value: opportunities.filter((o) => o.type === "Grant").length,
    },
    {
      name: "Conference",
      value: opportunities.filter((o) => o.type === "Conference").length,
    },
  ];

  // DYNAMIC COUNTER FOR ACTIVE SOURCES BLOCK
  const totalActiveSources = [...new Set(opportunities.map((o) => o.source))]
    .length;

  const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#a855f7"];

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </MainLayout>
    );
  }

  const bookmarkOpportunity = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await API.post(`/bookmarks/${user._id}/${id}`);
      toast.success("Opportunity Bookmarked");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const trending = opportunities.slice(0, 5);
  const recommended = opportunities.filter(
    (o) => o.tags?.includes("AI") || o.title?.toLowerCase().includes("ai"),
  );

  return (
    <MainLayout>
      <div id="top"></div>

      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent pb-2">
          Startup Opportunity Aggregator
        </h1>
        <p className="text-zinc-400 text-lg max-w-3xl">
          AI-powered startup intelligence dashboard for discovering hackathons,
          grants, accelerators, conferences, and startup opportunities across
          the web.
        </p>
      </div>

      {/* ANALYTICS */}
      <div id="analytics">
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-gradient-to-br from-green-500/20 to-zinc-900 border border-green-500/20 rounded-3xl p-6 shadow-lg shadow-green-500/10 hover:scale-[1.02] transition">
            <p className="text-zinc-300">Total Opportunities</p>
            <h2 className="text-5xl font-black mt-3 text-green-400 animate-pulse">
              {opportunities.length}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-zinc-900 border border-blue-500/20 rounded-3xl p-6 shadow-lg shadow-blue-500/10 hover:scale-[1.02] transition">
            <p className="text-zinc-300">Filtered Results</p>
            <h2 className="text-5xl font-black mt-3 text-blue-400 animate-pulse">
              {filteredData.length}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-zinc-900 border border-purple-500/20 rounded-3xl p-6 shadow-lg shadow-purple-500/10 hover:scale-[1.02] transition">
            <p className="text-zinc-300">Active Sources</p>
            <h2 className="text-5xl font-black mt-3 text-purple-400 animate-pulse">
              {totalActiveSources || 0}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-orange-500/20 to-zinc-900 border border-orange-500/20 rounded-3xl p-6 shadow-lg shadow-orange-500/10 hover:scale-[1.02] transition">
            <p className="text-zinc-300">Remote Events</p>
            <h2 className="text-5xl font-black mt-3 text-orange-400 animate-pulse">
              {opportunities.filter((o) => o.mode === "Remote").length}
            </h2>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="Search opportunities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 flex-1 outline-none focus:border-green-500 text-white"
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white"
        >
          <option>All</option>
          <option>Hackathon</option>
          <option>Conference</option>
          <option>Grant</option>
        </select>

        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white"
        >
          <option>All</option>
          <option>Devpost</option>
          <option value="Startup India">Startup India</option>
          <option value="RSS Feed">RSS Feed</option>
        </select>

        <select
          value={deadlineFilter}
          onChange={(e) => setDeadlineFilter(e.target.value)}
          className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white"
        >
          <option value="All">All Deadlines</option>
          <option value="Upcoming">Upcoming</option>
          <option value="This Month">This Month</option>
        </select>
      </div>

      {/* EXPORT BUTTONS */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={() => exportCSV(filteredData)}
          className="bg-green-500 text-black px-5 py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Export CSV
        </button>

        <button
          onClick={() => exportJSON(filteredData)}
          className="bg-zinc-800 border border-zinc-700 text-white px-5 py-3 rounded-xl font-semibold hover:border-green-500 transition"
        >
          Export JSON
        </button>
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* PIE CHART */}
        <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-6 h-[420px] shadow-2xl text-white">
          <h2 className="text-xl font-bold mb-6">Opportunities by Source</h2>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={4}
                  stroke="none"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#111827",
                    border: "1px solid #22c55e",
                    borderRadius: "16px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BAR CHART */}
        <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-6 h-[420px] shadow-2xl text-white">
          <h2 className="text-xl font-bold mb-6">Opportunities by Type</h2>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={typeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="name" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip
                  contentStyle={{
                    background: "#111827",
                    border: "1px solid #22c55e",
                    borderRadius: "16px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                  {typeData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* TRENDING SECTION */}
      <div id="trending" className="mb-14 text-white">
        <h2 className="text-3xl font-black mb-6">Trending Opportunities</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {trending.map((item) => (
            <div
              key={item._id}
              className="bg-gradient-to-br from-green-500/20 to-zinc-900 border border-green-500/20 rounded-2xl p-4"
            >
              <h3 className="font-bold line-clamp-2">{item.title}</h3>
              <p className="text-zinc-400 text-sm mt-2">{item.type}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI RECOMMENDATIONS */}
      <div className="mb-14 text-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-black">AI Recommended Opportunities</h2>
          <span className="text-green-400 text-sm">Smart Matching</span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {recommended.slice(0, 3).map((item) => (
            <div
              key={item._id}
              className="bg-gradient-to-br from-purple-500/10 to-zinc-900 border border-purple-500/20 rounded-3xl p-6 hover:scale-[1.02] transition"
            >
              <div className="flex justify-between mb-4">
                <span className="bg-purple-500/20 text-purple-400 text-xs px-3 py-1 rounded-full">
                  AI Pick
                </span>
                <span className="text-zinc-500 text-xs">{item.source}</span>
              </div>

              <h2 className="text-xl font-bold mb-3 line-clamp-2">
                {item.title}
              </h2>
              <p className="text-zinc-400 text-sm line-clamp-3 mb-5">
                {item.description}
              </p>

              <Link
                to={`/opportunity/${item._id}`}
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Explore →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CARDS LIST SECTION */}
      <div id="opportunities" className="text-white">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedData.length > 0 ? (
            paginatedData.map((item) => (
              <div
                key={item._id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:-translate-y-1 hover:scale-[1.02] hover:border-green-500/40 hover:shadow-green-500/20 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full">
                    {item.type}
                  </span>
                  <span className="text-xs text-zinc-500">{item.source}</span>
                </div>

                <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-zinc-400 text-sm mb-5 line-clamp-3">
                  {item.description || "No description available."}
                </p>

                <div className="space-y-2 text-sm mb-5">
                  <div className="flex justify-between text-zinc-500">
                    <span>Organizer</span>
                    <span className="text-zinc-300">{item.organizer}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Location</span>
                    <span className="text-zinc-300">{item.location}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Deadline</span>
                    <span className="text-zinc-300">
                      {item.deadline || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full">
                    {item.startupStage}
                  </span>
                  <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded-full">
                    {item.fundingRange}
                  </span>
                  <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded-full">
                    {item.mode}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-4 pt-2 border-t border-zinc-800">
                  <Link
                    to={`/opportunity/${item._id}`}
                    className="text-green-400 hover:text-green-300 font-medium text-sm transition"
                  >
                    View Details →
                  </Link>
                  <button
                    onClick={() => bookmarkOpportunity(item._id)}
                    className="bg-zinc-800 hover:bg-zinc-700 px-4 py-1.5 text-xs rounded-xl border border-zinc-700 transition text-zinc-300"
                  >
                    Bookmark
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <div className="text-7xl mb-4">🚀</div>
              <h2 className="text-3xl font-bold mb-2">
                No Opportunities Found
              </h2>
              <p className="text-zinc-500">
                Try changing filters or search terms
              </p>
            </div>
          )}
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-3 mt-10">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white disabled:opacity-40 hover:border-green-500 transition"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`w-10 h-10 rounded-xl transition ${
              currentPage === index + 1
                ? "bg-green-500 text-black font-bold"
                : "bg-zinc-900 border border-zinc-700 text-white hover:border-green-500"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white disabled:opacity-40 hover:border-green-500 transition"
        >
          Next
        </button>
      </div>

      {/* FOOTER */}
      <div className="mt-20 border-t border-zinc-800 pt-8 text-center text-zinc-500 text-sm">
        Powered by Jenix Sam Joshan
      </div>
    </MainLayout>
  );
};

export default Dashboard;
