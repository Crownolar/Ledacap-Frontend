// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
//       <p className="text-gray-600 mb-6">
//         Welcome, <span className="font-semibold">User</span> (role)
//       </p>

//       {/* Stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white rounded-xl shadow p-4">
//           <p className="text-gray-500">Projects</p>
//           <p className="text-2xl font-bold">12</p>
//         </div>
//         <div className="bg-white rounded-xl shadow p-4">
//           <p className="text-gray-500">Samples</p>
//           <p className="text-2xl font-bold">58</p>
//         </div>
//         <div className="bg-white rounded-xl shadow p-4">
//           <p className="text-gray-500">High Risk</p>
//           <p className="text-2xl font-bold">7</p>
//         </div>
//         <div className="bg-white rounded-xl shadow p-4">
//           <p className="text-gray-500">Avg Lead</p>
//           <p className="text-2xl font-bold">3.1 ppm</p>
//         </div>
//       </div>

//       {/* Actions by role */}
//       <div className="grid md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-xl shadow p-4">
//           <h3 className="font-semibold mb-3">Admin Actions</h3>
//           <Link className="block text-blue-600 mb-2" to="/projects/new">
//             Create Project
//           </Link>
//           <Link className="block text-blue-600 mb-2" to="/projects">
//             Manage Projects
//           </Link>
//           <Link className="block text-blue-600 mb-2" to="/samples">
//             View Samples
//           </Link>
//         </div>
//         <div className="bg-white rounded-xl shadow p-4">
//           <h3 className="font-semibold mb-3">Researcher Actions</h3>
//           <Link className="block text-blue-600 mb-2" to="/samples/new">
//             Add Sample
//           </Link>
//           <Link className="block text-blue-600 mb-2" to="/projects">
//             View Projects
//           </Link>
//         </div>
//         <div className="bg-white rounded-xl shadow p-4">
//           <h3 className="font-semibold mb-3">Reviewer Actions</h3>
//           <Link className="block text-blue-600 mb-2" to="/samples">
//             Review Pending
//           </Link>
//           <Link className="block text-blue-600 mb-2" to="/samples">
//             All Samples
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function Dashboard() {
  // Mock data (later replace with API)
  const stats = {
    totalSamples: 120,
    totalProjects: 8,
    avgLeadLevel: "45 ppm",
    highRisk: 15,
  };

  const sampleTypes = [
    { name: "Soil", value: 60 },
    { name: "Water", value: 40 },
    { name: "Paint", value: 20 },
  ];

  const leadDistribution = [
    { name: "Low", value: 50 },
    { name: "Moderate", value: 30 },
    { name: "High", value: 15 },
    { name: "Unknown", value: 25 },
  ];

  const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#6b7280"];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Top stats cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">Total Samples</p>
          <h2 className="text-2xl font-bold">{stats.totalSamples}</h2>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">Total Projects</p>
          <h2 className="text-2xl font-bold">{stats.totalProjects}</h2>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">Average Lead Level</p>
          <h2 className="text-2xl font-bold">{stats.avgLeadLevel}</h2>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">High Risk Samples</p>
          <h2 className="text-2xl font-bold">{stats.highRisk}</h2>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Sample Types Pie */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-bold mb-4">Samples by Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sampleTypes}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {sampleTypes.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Distribution Bar */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-bold mb-4">Lead Level Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leadDistribution}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
