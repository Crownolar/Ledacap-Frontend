import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const reviewData = [
  { type: "Soil", pending: 4, reviewed: 10 },
  { type: "Water", pending: 2, reviewed: 6 },
  { type: "Air", pending: 3, reviewed: 5 },
];

export default function ReviewerDashboard() {
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
          <p className="text-xl sm:text-2xl font-bold text-yellow-500">9</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-base sm:text-lg font-semibold">
            Reviewed Samples
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-green-600">21</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-base sm:text-lg font-semibold">Total Samples</h2>
          <p className="text-xl sm:text-2xl font-bold">30</p>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
        <h2 className="text-base sm:text-lg font-semibold mb-4">
          Reviews by Sample Type
        </h2>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reviewData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
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
