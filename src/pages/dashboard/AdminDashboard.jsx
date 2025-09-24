import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
} from "recharts";

const SAMPLE_KEY = "samples";
const PROJECT_KEY = "projects";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [samples, setSamples] = useState([]);
  const [highRisk, setHighRisk] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  const navigate = useNavigate();

  const loadData = () => {
    const storedProjects = JSON.parse(
      localStorage.getItem(PROJECT_KEY) || "[]"
    );
    const storedSamples = JSON.parse(localStorage.getItem(SAMPLE_KEY) || "[]");

    setProjects(storedProjects);
    setSamples(storedSamples);

    const risky = storedSamples.filter((s) => s.status === "high-risk");
    setHighRisk(risky);

    buildGrowthData(storedSamples);
  };

  const buildGrowthData = (samples) => {
    const grouped = samples.reduce((acc, sample) => {
      const date = sample.date_collected;
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const data = Object.keys(grouped)
      .sort()
      .map((date) => ({
        date,
        samples: grouped[date],
      }));

    setGrowthData(data);
  };

  useEffect(() => {
    loadData();

    const handleStorage = (e) => {
      if (e.key === SAMPLE_KEY || e.key === PROJECT_KEY) {
        loadData();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const pieData = [
    { name: "Projects", value: projects.length },
    { name: "Samples", value: samples.length },
    { name: "High Risk Samples", value: highRisk.length },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FF4444"];

  const barLineData = [
    {
      name: "Projects",
      count: projects.length,
      growth: projects.length > 0 ? projects.length * 2 : 0,
    },
    {
      name: "Samples",
      count: samples.length,
      growth: samples.length > 0 ? samples.length * 1.5 : 0,
    },
    {
      name: "High Risk",
      count: highRisk.length,
      growth: highRisk.length > 0 ? highRisk.length * 3 : 0,
    },
  ];

  return (
    <div className="p-6 space-y-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 rounded hover:bg-gray-200 text-sm sm:text-base"
      >
        <ArrowLeft className="w-5 h-5 text-black" title="Go Back" />
      </button>
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded p-4 text-center">
          <h2 className="text-lg font-semibold">Projects</h2>
          <p className="text-2xl font-bold">{projects.length}</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <h2 className="text-lg font-semibold">Samples</h2>
          <p className="text-2xl font-bold">{samples.length}</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <h2 className="text-lg font-semibold text-red-600">High Risk</h2>
          <p className="text-2xl font-bold">{highRisk.length}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Overview (Pie)</h2>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Overview (Bar + Line)</h2>
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barLineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" />
              <Line
                type="monotone"
                dataKey="growth"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Sample Growth Over Time</h2>
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="samples"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
