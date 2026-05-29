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
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-md shadow-slate-100/50">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">
            Upload Queue
          </h2>

          {uploadingCount > 0 && (
            <span className="inline-flex items-center bg-indigo-50 text-indigo-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              {uploadingCount} uploading
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isBulkUpload && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-50 hover:bg-slate-100/80 px-3 py-1.5 rounded-xl border border-slate-200/50 transition"
            >
              {isCollapsed ? (
                <>
                  Show details <ChevronDown size={14} />
                </>
              ) : (
                <>
                  Collapse <ChevronUp size={14} />
                </>
              )}
            </button>
          )}

          <button
            onClick={clearQueue}
            className="text-xs font-semibold text-slate-500 hover:text-red-600 transition"
          >
            Clear all
          </button>
        </div>
      </div>

      {/* MINIMAL COLLAPSED STATE */}
      {isBulkUpload && isCollapsed ? (
        <div className="space-y-2.5 max-h-36 overflow-y-auto border-t border-slate-100 pt-4">
          {files.map((file, index) => {
            const isComplete = file.status === "complete" || file.progress === 100;
            const isFailed = file.status === "failed";
            const isPending = file.status === "pending";
            const isUploading = file.status === "uploading" || (!isComplete && !isFailed && !isPending);

            return (
              <div key={index} className="flex items-center justify-between text-sm py-1.5 border-b border-slate-50 last:border-none">
                <div className="flex items-center gap-2.5 truncate flex-1 pr-4">
                  <FileText size={15} className="text-slate-400 shrink-0" />
                  <span className="truncate font-medium text-slate-700">{file.name}</span>
                  <span className="text-xs text-slate-400 font-mono">
                    ({formatFileSize(file.file?.size || 0)})
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {isComplete && (
                    <span className="inline-flex items-center bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-100">
                      Complete
                    </span>
                  )}
                  {isFailed && (
                    <span className="inline-flex items-center bg-rose-50 text-rose-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-rose-100">
                      Failed
                    </span>
                  )}
                  {isPending && (
                    <span className="inline-flex items-center bg-slate-50 text-slate-500 text-xs font-semibold px-2 py-0.5 rounded-full border border-slate-200/60">
                      Pending
                    </span>
                  )}
                  {isUploading && (
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-full rounded-full transition-all duration-300" style={{ width: `${file.progress}%` }} />
                      </div>
                      <span className="text-xs text-indigo-600 font-mono font-semibold">{file.progress}%</span>
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
              ? "space-y-3 max-h-72 overflow-y-auto"
              : "space-y-3.5"
          }
        >
          {files.map((file, index) => {
            const isComplete = file.status === "complete" || file.progress === 100;
            const isFailed = file.status === "failed";
            const isPending = file.status === "pending";
            const isUploading = file.status === "uploading" || (!isComplete && !isFailed && !isPending);

            const fileExtension = file.name.split(".").pop().toUpperCase();
            const fileType = file.file?.type ? file.file.type.split("/")[1]?.toUpperCase() : fileExtension;

            let cardBg = "bg-white border-slate-100 hover:border-slate-200/80";
            let iconBg = "bg-indigo-50/80";
            let iconColor = "text-indigo-600";
            let statusText = "Uploading...";
            let statusBadge = (
              <span className="inline-flex items-center bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-indigo-100">
                Uploading
              </span>
            );

            if (isComplete) {
              cardBg = "bg-emerald-50/20 border-emerald-100/70 hover:border-emerald-200/80";
              iconBg = "bg-emerald-50";
              iconColor = "text-emerald-600";
              statusText = "Upload complete";
              statusBadge = (
                <span className="inline-flex items-center bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-100">
                  Complete
                </span>
              );
            } else if (isFailed) {
              cardBg = "bg-rose-50/20 border-rose-100/70 hover:border-rose-200/80";
              iconBg = "bg-rose-50";
              iconColor = "text-rose-600";
              statusText = "Upload failed";
              statusBadge = (
                <span className="inline-flex items-center bg-rose-50 text-rose-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-rose-100">
                  Failed
                </span>
              );
            } else if (isPending) {
              cardBg = "bg-slate-50/30 border-slate-100/80 hover:border-slate-200/50";
              iconBg = "bg-slate-100/80";
              iconColor = "text-slate-500";
              statusText = "Pending queue";
              statusBadge = (
                <span className="inline-flex items-center bg-slate-50 text-slate-500 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-slate-200/60">
                  Pending
                </span>
              );
            }

            return (
              <div
                key={index}
                className={`rounded-2xl p-4 border flex items-start justify-between transition-all duration-300 ${cardBg}`}
              >
                {/* LEFT */}
                <div className="flex gap-4 flex-1">
                  {/* ICON */}
                  <div className={`p-2.5 rounded-xl shrink-0 transition-transform ${iconBg}`}>
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
                  <div className="flex-1 min-w-0">
                    {/* TOP */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-800 text-sm truncate pr-1">
                            {file.name}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">
                          {formatFileSize(file.file?.size || 0)} • {fileType}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFile(index)}
                        className="text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 p-1.5 rounded-lg border border-slate-200/20 transition"
                        title="Remove file"
                      >
                        <X size={15} />
                      </button>
                    </div>

                    {/* STATUS BAR */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-500 font-medium">
                          {statusText}
                        </span>
                        {statusBadge}
                      </div>

                      {isUploading && (
                        <div className="relative">
                          {/* PROGRESS BAR */}
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-indigo-500 to-blue-500 h-full rounded-full transition-all duration-300"
                              style={{
                                width: `${file.progress}%`,
                              }}
                            />
                          </div>

                          {/* PERCENT */}
                          <div className="flex justify-end mt-1">
                            <p className="text-xs text-indigo-600 font-bold font-mono">
                              {file.progress}%
                            </p>
                          </div>
                        </div>
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

