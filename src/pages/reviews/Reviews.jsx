export default function Reviews() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reviews</h1>
      <p className="text-gray-600">
        This is the Reviews page. Here reviewers can see projects assigned to
        them for evaluation.
      </p>

      {/* Dummy table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Project</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">Project A</td>
              <td className="p-2 border">Pending</td>
              <td className="p-2 border">
                <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Review
                </button>
              </td>
            </tr>
            <tr>
              <td className="p-2 border">Project B</td>
              <td className="p-2 border">Completed</td>
              <td className="p-2 border">
                <button
                  className="px-3 py-1 bg-gray-400 text-white rounded"
                  disabled
                >
                  Reviewed
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
