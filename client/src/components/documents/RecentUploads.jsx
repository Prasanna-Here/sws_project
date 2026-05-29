const RecentUploads = ({
  documents,
  onClear,
}) => {
  return (
    <div className="bg-white border rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          Recent Uploads
        </h2>

        <button
          onClick={onClear}
          className="text-sm text-red-500"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-3">
        {documents.slice(0, 5).map((doc) => (
          <div
            key={doc.id}
            className="border rounded-xl p-3"
          >
            <p className="font-medium">
              {doc.filename}
            </p>

            <p className="text-sm text-gray-500">
              {doc.filetype}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUploads;