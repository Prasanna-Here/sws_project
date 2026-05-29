const UploadProgress = ({ file }) => {
  return (
    <div className="bg-white p-4 rounded-xl border">
      <div className="flex items-center justify-between mb-2">
        <p className="font-medium text-sm">
          {file.name}
        </p>

        <p className="text-sm text-gray-500">
          {file.progress}%
        </p>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-black h-2 rounded-full transition-all"
          style={{
            width: `${file.progress}%`,
          }}
        />
      </div>
    </div>
  );
};

export default UploadProgress;