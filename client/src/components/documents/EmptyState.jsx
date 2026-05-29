const EmptyState = () => {
  return (
    <div className="bg-white border rounded-2xl p-10 text-center">
      <h2 className="text-xl font-semibold">
        No Documents Yet
      </h2>

      <p className="text-gray-500 mt-2">
        Uploaded files will appear here
      </p>
    </div>
  );
};

export default EmptyState;