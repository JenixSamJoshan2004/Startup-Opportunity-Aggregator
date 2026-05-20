import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../services/api";

import MainLayout from "../layouts/MainLayout";

const OpportunityDetails = () => {
  const { id } = useParams();

  const [opportunity, setOpportunity] = useState(null);

  useEffect(() => {
    fetchOpportunity();
  }, []);

  const fetchOpportunity = async () => {
    try {
      const res = await API.get(`/opportunities/${id}`);

      setOpportunity(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!opportunity) {
    return (
      <MainLayout>
        <div className="text-center py-20">Loading...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10">
          <div className="flex justify-between items-center mb-6">
            <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl text-sm">
              {opportunity.type}
            </span>

            <span className="text-zinc-500">{opportunity.source}</span>
          </div>

          <h1 className="text-5xl font-black mb-6">{opportunity.title}</h1>

          <p className="text-zinc-300 leading-8 text-lg mb-8">
            {opportunity.description}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-black/40 rounded-2xl p-5">
              <p className="text-zinc-500 mb-2">Organizer</p>

              <h2 className="text-xl font-semibold">{opportunity.organizer}</h2>
            </div>

            <div className="bg-black/40 rounded-2xl p-5">
              <p className="text-zinc-500 mb-2">Location</p>

              <h2 className="text-xl font-semibold">{opportunity.location}</h2>
            </div>

            <div className="bg-black/40 rounded-2xl p-5">
              <p className="text-zinc-500 mb-2">Deadline</p>

              <h2 className="text-xl font-semibold">
                {opportunity.deadline || "N/A"}
              </h2>
            </div>

            <div className="bg-black/40 rounded-2xl p-5">
              <p className="text-zinc-500 mb-2">Mode</p>

              <h2 className="text-xl font-semibold">{opportunity.mode}</h2>
            </div>
          </div>

          <a
            href={opportunity.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-green-500 hover:bg-green-400 text-black px-8 py-4 rounded-2xl font-bold inline-block transition"
          >
            Visit Official Source →
          </a>
        </div>
      </div>
    </MainLayout>
  );
};

export default OpportunityDetails;
