// import { Link, useParams } from "react-router-dom";

// export default function ProjectDetails() {
//   const { id } = useParams();

//   // Dummy project
//   const project = {
//     id,
//     name: "Soil Testing in Lagos",
//     description: "Analyzing soil lead content in urban farms.",
//   };

//   // Dummy samples under this project
//   const samples = [
//     { id: 101, type: "Soil", status: "Pending", lead_level: "2.3 ppm" },
//     { id: 102, type: "Soil", status: "Analyzed", lead_level: "5.1 ppm" },
//   ];

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-3xl font-bold">{project.name}</h1>
//         <div className="flex gap-2">
//           <Link
//             to={`/projects/${id}/edit`}
//             className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//           >
//             Edit
//           </Link>
//           <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
//             Delete
//           </button>
//         </div>
//       </div>
//       <p className="text-gray-600 mb-6">{project.description}</p>

//       {/* Samples */}
//       <div className="flex items-center justify-between mb-3">
//         <h2 className="text-xl font-semibold">Samples</h2>
//         <Link
//           to="/samples/new"
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           + Add Sample
//         </Link>
//       </div>

//       <div className="bg-white rounded-xl shadow divide-y">
//         {samples.map((s) => (
//           <div key={s.id} className="p-4 flex items-center justify-between">
//             <div>
//               <p className="font-semibold">
//                 {s.type} — Lead: {s.lead_level}
//               </p>
//               <p className="text-gray-500 text-sm">Status: {s.status}</p>
//             </div>
//             <Link
//               to={`/samples/${s.id}`}
//               className="text-blue-600 hover:underline"
//             >
//               View
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { Link, useParams, useNavigate } from "react-router-dom";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy project
  const project = {
    id,
    name: "Soil Testing in Lagos",
    description: "Analyzing soil lead content in urban farms.",
  };

  // Dummy samples under this project
  const samples = [
    { id: 101, type: "Soil", status: "Pending", lead_level: "2.3 ppm" },
    { id: 102, type: "Soil", status: "Analyzed", lead_level: "5.1 ppm" },
  ];

  return (
    <div className="p-4 sm:p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm sm:text-base"
      >
        ← Back
      </button>

      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold">{project.name}</h1>
        <div className="flex gap-2">
          <Link
            to={`/projects/${id}/edit`}
            className="px-3 sm:px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm sm:text-base"
          >
            Edit
          </Link>
          <button className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm sm:text-base">
            Delete
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-6 text-sm sm:text-base">
        {project.description}
      </p>

      {/* Samples Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
        <h2 className="text-lg sm:text-xl font-semibold">Samples</h2>
        <Link
          to="/samples/new"
          className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base text-center"
        >
          + Add Sample
        </Link>
      </div>

      {/* Samples List */}
      <div className="bg-white rounded-xl shadow divide-y">
        {samples.map((s) => (
          <div
            key={s.id}
            className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0"
          >
            <div>
              <p className="font-semibold text-sm sm:text-base">
                {s.type} — Lead: {s.lead_level}
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">
                Status: {s.status}
              </p>
            </div>
            <Link
              to={`/samples/${s.id}`}
              className="text-blue-600 hover:underline text-sm sm:text-base"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
