import { useState } from "react";
import {
  CheckCircle2,
  FileText,
  Loader2,
  X,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from "lucide-react";

const UploadQueue = ({
  files,
  clearQueue,
  removeFile,
  isBulkUpload,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      (f) => f.progress < 100 && f.status !== "failed"
    ).length;

  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">
            Upload Queue
          </h2>

          {uploadingCount > 0 && (
            <span className="text-sm text-gray-500 font-medium">
              {uploadingCount} uploading
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isBulkUpload && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {isCollapsed ? (
                <>
                  Show details <ChevronDown size={16} />
                </>
              ) : (
                <>
                  Collapse <ChevronUp size={16} />
                </>
              )}
            </button>
          )}

          <button
            onClick={clearQueue}
            className="text-sm text-gray-500 hover:text-black font-medium"
          >
            Clear all
          </button>
        </div>
      </div>

      {/* MINIMAL COLLAPSED STATE */}
      {isBulkUpload && isCollapsed ? (
        <div className="space-y-2 max-h-32 overflow-y-auto border-t pt-3">
          {files.map((file, index) => {
            const isComplete = file.status === "complete" || file.progress === 100;
            const isFailed = file.status === "failed";
            const isPending = file.status === "pending";
            const isUploading = file.status === "uploading" || (!isComplete && !isFailed && !isPending);

            return (
              <div key={index} className="flex items-center justify-between text-sm py-1.5 border-b last:border-none">
                <div className="flex items-center gap-2 truncate flex-1 pr-4">
                  <FileText size={14} className="text-gray-400 shrink-0" />
                  <span className="truncate font-medium text-gray-700">{file.name}</span>
                  <span className="text-xs text-gray-400 font-mono">
                    ({formatFileSize(file.file?.size || 0)})
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {isComplete && <span className="text-xs text-green-600 font-semibold">Complete</span>}
                  {isFailed && <span className="text-xs text-red-600 font-semibold">Failed</span>}
                  {isPending && <span className="text-xs text-gray-500 font-semibold">Pending</span>}
                  {isUploading && (
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: `${file.progress}%` }} />
                      </div>
                      <span className="text-xs text-blue-600 font-mono font-semibold">{file.progress}%</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* DETAILED STATE */
        <div
          className={
            isBulkUpload
              ? "space-y-2 max-h-64 overflow-y-auto"
              : "space-y-3"
          }
        >
          {files.map((file, index) => {
            const isComplete = file.status === "complete" || file.progress === 100;
            const isFailed = file.status === "failed";
            const isPending = file.status === "pending";
            const isUploading = file.status === "uploading" || (!isComplete && !isFailed && !isPending);

            const fileExtension = file.name.split(".").pop().toUpperCase();
            const fileType = file.file?.type ? file.file.type.split("/")[1]?.toUpperCase() : fileExtension;

            let cardBg = "bg-white border-gray-200";
            let iconBg = "bg-blue-100";
            let iconColor = "text-blue-600";
            let statusText = "Uploading...";
            let statusColor = "text-blue-600";

            if (isComplete) {
              cardBg = "bg-green-50 border-green-200";
              iconBg = "bg-green-100";
              iconColor = "text-green-600";
              statusText = "Upload complete";
              statusColor = "text-green-600";
            } else if (isFailed) {
              cardBg = "bg-red-50 border-red-200";
              iconBg = "bg-red-100";
              iconColor = "text-red-600";
              statusText = "Upload failed";
              statusColor = "text-red-600";
            } else if (isPending) {
              cardBg = "bg-slate-50 border-slate-200";
              iconBg = "bg-slate-200";
              iconColor = "text-slate-600";
              statusText = "Pending...";
              statusColor = "text-slate-500";
            }

            return (
              <div
                key={index}
                className={`rounded-2xl p-4 border flex items-start justify-between transition ${cardBg}`}
              >
                {/* LEFT */}
                <div className="flex gap-4 flex-1">
                  {/* ICON */}
                  <div className={`p-2 rounded-full ${iconBg}`}>
                    {isComplete ? (
                      <CheckCircle2 className={iconColor} size={20} />
                    ) : isFailed ? (
                      <AlertTriangle className={iconColor} size={20} />
                    ) : isPending ? (
                      <FileText className={iconColor} size={20} />
                    ) : (
                      <Loader2 className={`animate-spin ${iconColor}`} size={20} />
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1">
                    {/* TOP */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-gray-500" />
                        <h3 className="font-medium break-all">
                          {file.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-4">
                        <p className="text-sm text-gray-500 whitespace-nowrap">
                          {formatFileSize(file.file?.size || 0)} | {fileType}
                        </p>

                        <button
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-red-500"
                          title="Remove file"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>

                    {/* STATUS */}
                    <div className="mt-2">
                      <p className={`text-sm font-medium ${statusColor} mb-2`}>
                        {statusText}
                      </p>

                      {isUploading && (
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
      )}
    </div>
  );
};

export default UploadQueue;

