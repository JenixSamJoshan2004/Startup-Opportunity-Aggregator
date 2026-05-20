import MainLayout from "../layouts/MainLayout";

const Analytics = () => {
  return (
    <MainLayout>
      <h1 className="text-5xl font-black mb-10">Platform Analytics</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 p-8 rounded-3xl">
          <h2 className="text-zinc-400">Total Users</h2>

          <p className="text-5xl font-black mt-4 text-green-400">120+</p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl">
          <h2 className="text-zinc-400">Opportunities Scraped</h2>

          <p className="text-5xl font-black mt-4 text-blue-400">500+</p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl">
          <h2 className="text-zinc-400">Active Sources</h2>

          <p className="text-5xl font-black mt-4 text-purple-400">3</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Analytics;
