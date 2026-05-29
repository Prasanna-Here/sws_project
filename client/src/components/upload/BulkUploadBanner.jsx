import {
  Loader2,
  CheckCircle2,
} from "lucide-react";

const BulkUploadBanner = ({
  message,
  completed,
}) => {
  return (
    <div
      className={`rounded-3xl p-5 border flex items-center gap-4.5 transition-all duration-300 shadow-sm ${
        completed
          ? "bg-emerald-50/50 border-emerald-100/80 text-emerald-900"
          : "bg-indigo-50/50 border-indigo-100/80 text-indigo-900 animate-pulse"
      }`}
    >
      <div className={`p-2 rounded-xl shrink-0 ${
        completed ? "bg-emerald-100/80 text-emerald-600" : "bg-indigo-100/80 text-indigo-600"
      }`}>
        {completed ? (
          <CheckCircle2 size={20} />
        ) : (
          <Loader2 className="animate-spin" size={20} />
        )}
      </div>

      <p className="font-semibold text-sm tracking-tight">
        {message}
      </p>
    </div>
  );
};

export default BulkUploadBanner;