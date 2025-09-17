import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const mySampleStatuses = [
  { status: "Pending", value: 5 },
  { status: "Reviewed", value: 8 },
  { status: "Rejected", value: 2 },
];

const COLORS = ["#f59e0b", "#10b981", "#ef4444"];

export default function ResearcherDashboard() {
  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Researcher Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-base sm:text-lg font-semibold">
            My Total Samples
          </h2>
          <p className="text-xl sm:text-2xl font-bold">15</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-base sm:text-lg font-semibold">
            Samples Pending Review
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-yellow-500">5</p>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
        <h2 className="text-base sm:text-lg font-semibold mb-4">
          My Samples by Status
        </h2>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mySampleStatuses}
                dataKey="value"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                fill="#8884d8"
                label
              >
                {mySampleStatuses.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
