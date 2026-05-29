import {
  CheckCircle2,
  FileText,
  Loader2,
  X,
} from "lucide-react";

const UploadQueue = ({
  files,
  clearQueue,
  removeFile,
  isBulkUpload,
}) => {
  if (files.length === 0) return null;

  // FILE SIZE FORMATTER
  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(
        bytes / 1024
      ).toFixed(1)} KB`;
    }

    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(1)} MB`;
  };

  // UPLOADING COUNT
  const uploadingCount =
    files.filter(
      (f) => f.progress < 100
    ).length;

  return (
    <div className="bg-white border rounded-2xl p-5">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">
            Upload Queue
          </h2>

          {uploadingCount > 0 && (
            <span className="text-sm text-gray-500">
              {uploadingCount} uploading
            </span>
          )}
        </div>

        <button
          onClick={clearQueue}
          className="text-sm text-gray-500 hover:text-black"
        >
          Clear all
        </button>
      </div>

      {/* FILES */}
      <div
        className={
          isBulkUpload
            ? "space-y-2 max-h-48 overflow-y-auto"
            : "space-y-3"
        }
      >
        {files.map((file, index) => {
          const isComplete =
            file.progress === 100;

          return (
            <div
              key={index}
              className={`rounded-2xl p-4 border flex items-start justify-between transition ${
                isComplete
                  ? "bg-green-50 border-green-200"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* LEFT */}
              <div className="flex gap-4 flex-1">
                {/* ICON */}
                <div
                  className={`p-2 rounded-full ${
                    isComplete
                      ? "bg-green-100"
                      : "bg-blue-100"
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle2
                      className="text-green-600"
                      size={20}
                    />
                  ) : (
                    <Loader2
                      className="animate-spin text-blue-600"
                      size={20}
                    />
                  )}
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  {/* TOP */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <FileText
                        size={16}
                        className="text-gray-500"
                      />

                      <h3 className="font-medium break-all">
                        {file.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="text-sm text-gray-500 whitespace-nowrap">
                        {formatFileSize(
                          file.file.size
                        )}
                      </p>

                      <button
                        onClick={() =>
                          removeFile(index)
                        }
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  {/* STATUS */}
                  <div className="mt-2">
                    {isComplete ? (
                      <p className="text-sm text-green-600 font-medium">
                        Upload complete
                      </p>
                    ) : (
                      <>
                        {/* PROGRESS BAR */}
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${file.progress}%`,
                            }}
                          />
                        </div>

                        {/* PERCENT */}
                        <div className="flex justify-end mt-1">
                          <p className="text-sm text-blue-600 font-medium">
                            {file.progress}%
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UploadQueue;

