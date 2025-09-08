// export default function SamplesList() {
//   const samples = [
//     {
//       id: 1,
//       site_id: "S001",
//       type: "Soil",
//       status: "Pending",
//       lead_level: "High",
//     },
//     {
//       id: 2,
//       site_id: "S002",
//       type: "Water",
//       status: "Reviewed",
//       lead_level: "Low",
//     },
//   ];

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Samples</h1>
//       <div className="overflow-x-auto">
//         <table className="w-full bg-white shadow rounded-lg">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 text-left">Site ID</th>
//               <th className="px-4 py-2 text-left">Type</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               <th className="px-4 py-2 text-left">Lead Level</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {samples.map((s) => (
//               <tr key={s.id} className="border-t">
//                 <td className="px-4 py-2">{s.site_id}</td>
//                 <td className="px-4 py-2">{s.type}</td>
//                 <td className="px-4 py-2">{s.status}</td>
//                 <td className="px-4 py-2">{s.lead_level}</td>
//                 <td className="px-4 py-2 flex gap-2">
//                   <a
//                     href={`/samples/${s.id}`}
//                     className="text-blue-600 hover:underline"
//                   >
//                     View
//                   </a>
//                   <a
//                     href={`/samples/${s.id}/edit`}
//                     className="text-green-600 hover:underline"
//                   >
//                     Edit
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <a
//         href="/samples/new"
//         className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//       >
//         + New Sample
//       </a>
//     </div>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SamplesList() {
  // Mock data (later replace with API)
  const [samples] = useState([
    {
      id: 1,
      site_id: "Site A",
      sample_type: "Soil",
      status: "pending",
      collected_by: "Yusuf",
      date_collected: "2025-08-15",
      lead_level: "45 ppm",
    },
    {
      id: 2,
      site_id: "Site B",
      sample_type: "Water",
      status: "reviewed",
      collected_by: "Abdul",
      date_collected: "2025-08-14",
      lead_level: "30 ppm",
    },
  ]);

  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>
      <h1 className="text-2xl font-bold mb-6">Samples</h1>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4 mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by site or notes..."
          className="border p-2 rounded flex-1"
        />
        <select className="border p-2 rounded">
          <option value="">All Types</option>
          <option value="soil">Soil</option>
          <option value="water">Water</option>
          <option value="paint">Paint</option>
        </select>
        <select className="border p-2 rounded">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="analyzed">Analyzed</option>
          <option value="reviewed">Reviewed</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2 text-left">Site ID</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Collected By</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Lead Level</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {samples.map((sample) => (
              <tr key={sample.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{sample.site_id}</td>
                <td className="px-4 py-2">{sample.sample_type}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      sample.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : sample.status === "reviewed"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {sample.status}
                  </span>
                </td>
                <td className="px-4 py-2">{sample.collected_by}</td>
                <td className="px-4 py-2">{sample.date_collected}</td>
                <td className="px-4 py-2">{sample.lead_level}</td>
                <td className="px-4 py-2 text-right">
                  <Link
                    to={`/samples/${sample.id}`}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    View
                  </Link>
                  <Link
                    to={`/samples/${sample.id}/edit`}
                    className="text-green-600 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
