// // import { Link, useNavigate } from "react-router-dom";

// // export default function ProjectsList() {
// //   // Dummy data
// //   const projects = [
// //     {
// //       id: 1,
// //       name: "Soil Testing in Lagos",
// //       description: "Analyzing soil lead content in urban farms.",
// //     },
// //     {
// //       id: 2,
// //       name: "Water Quality Study",
// //       description: "Lead concentration in borehole water.",
// //     },
// //   ];

// //   const navigate = useNavigate();

// //   return (
// //     <div className="p-6">
// //       <button
// //         onClick={() => navigate(-1)}
// //         className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
// //       >
// //         ← Back
// //       </button>
// //       <div className="flex items-center justify-between mb-6">
// //         <h1 className="text-3xl font-bold">Projects</h1>
// //         <Link
// //           to="/projects/new"
// //           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
// //         >
// //           + New Project
// //         </Link>
// //       </div>

// //       <div className="bg-white rounded-xl shadow divide-y">
// //         {projects.map((p) => (
// //           <div key={p.id} className="p-4 flex items-center justify-between">
// //             <div>
// //               <h3 className="font-semibold">{p.name}</h3>
// //               <p className="text-gray-500 text-sm">{p.description}</p>
// //             </div>
// //             <Link
// //               to={`/projects/${p.id}`}
// //               className="text-blue-600 hover:underline"
// //             >
// //               View
// //             </Link>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// import { Link, useNavigate } from "react-router-dom";

// export default function ProjectsList() {
//   // Dummy data
//   const projects = [
//     {
//       id: 1,
//       name: "Soil Testing in Lagos",
//       description: "Analyzing soil lead content in urban farms.",
//     },
//     {
//       id: 2,
//       name: "Water Quality Study",
//       description: "Lead concentration in borehole water.",
//     },
//   ];

//   const navigate = useNavigate();

//   return (
//     <div className="p-4 sm:p-6">
//       {/* Back button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm sm:text-base"
//       >
//         ← Back
//       </button>

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
//         <h1 className="text-2xl sm:text-3xl font-bold">Projects</h1>
//         <Link
//           to="/projects/new"
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base text-center"
//         >
//           + New Project
//         </Link>
//       </div>

//       {/* Projects List */}
//       <div className="bg-white rounded-xl shadow divide-y">
//         {projects.map((p) => (
//           <div
//             key={p.id}
//             className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0"
//           >
//             <div>
//               <h3 className="font-semibold text-base sm:text-lg">{p.name}</h3>
//               <p className="text-gray-500 text-sm">{p.description}</p>
//             </div>
//             <Link
//               to={`/projects/${p.id}`}
//               className="text-blue-600 hover:underline text-sm sm:text-base"
//             >
//               View
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { Link, useNavigate } from "react-router-dom";

export default function ProjectsList() {
  // Dummy data
  const projects = [
    {
      id: 1,
      name: "Soil Testing in Lagos",
      description: "Analyzing soil lead content in urban farms.",
    },
    {
      id: 2,
      name: "Water Quality Study",
      description: "Lead concentration in borehole water.",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="p-4 sm:p-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm sm:text-base"
      >
        ← Back
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold">Projects</h1>
        <Link
          to="/projects/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base text-center"
        >
          + New Project
        </Link>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-xl shadow divide-y">
        {projects.map((p) => (
          <div
            key={p.id}
            className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-base sm:text-lg">{p.name}</h3>
              <p className="text-gray-500 text-sm">{p.description}</p>
            </div>
            <Link
              to={`/projects/${p.id}`}
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
