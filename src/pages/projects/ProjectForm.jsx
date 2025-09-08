// export default function ProjectForm() {
//   return (
//     <div className="p-6 max-w-lg mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Create Project</h1>

//       <form className="bg-white p-6 rounded-xl shadow space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">Project Name</label>
//           <input
//             type="text"
//             placeholder="Enter project name"
//             className="w-full border rounded p-2"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Description</label>
//           <textarea
//             rows="4"
//             placeholder="Enter project description"
//             className="w-full border rounded p-2"
//           ></textarea>
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Save Project
//         </button>
//       </form>
//     </div>
//   );
// }

export default function ProjectForm() {
  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Create Project
      </h1>

      <form className="bg-white p-4 sm:p-6 rounded-xl shadow space-y-4">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Project Name</label>
          <input
            type="text"
            placeholder="Enter project name"
            className="w-full border rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows="4"
            placeholder="Enter project description"
            className="w-full border rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
          ></textarea>
        </div>

        {/* Submit */}
        <div className="sticky bottom-0 left-0 right-0 bg-white py-3 border-t shadow-md flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          >
            Save Project
          </button>
        </div>
      </form>
    </div>
  );
}
