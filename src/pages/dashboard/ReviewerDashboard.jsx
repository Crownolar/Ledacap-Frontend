import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

const STORAGE_KEY = "samples";

export default function ReviewerDashboard() {
  const [stats, setStats] = useState({
    pending: 0,
    reviewed: 0,
    total: 0,
    chartData: [],
  });

  useEffect(() => {
    const samples = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const pending = samples.filter((s) => s.status === "pending").length;
    const reviewed = samples.filter(
      (s) => s.status === "cleared" || s.status === "high-risk"
    ).length;
    const total = samples.length;

    const typeMap = {};
    samples.forEach((s) => {
      if (!typeMap[s.sample_type]) {
        typeMap[s.sample_type] = {
          type: s.sample_type,
          pending: 0,
          reviewed: 0,
        };
      }
      if (s.status === "pending") {
        typeMap[s.sample_type].pending++;
      } else if (s.status === "cleared" || s.status === "high-risk") {
        typeMap[s.sample_type].reviewed++;
      }
    });

    setStats({
      pending,
      reviewed,
      total,
      chartData: Object.values(typeMap),
    });
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Reviewer Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-base sm:text-lg font-semibold">
            Pending Reviews
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-yellow-500">
            {stats.pending}
          </p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-base sm:text-lg font-semibold">
            Reviewed Samples
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-green-600">
            {stats.reviewed}
          </p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-base sm:text-lg font-semibold">Total Samples</h2>
          <p className="text-xl sm:text-2xl font-bold">{stats.total}</p>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
        <h2 className="text-base sm:text-lg font-semibold mb-4">
          Reviews by Sample Type
        </h2>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="pending" fill="#f59e0b" />
              <Bar dataKey="reviewed" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
