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
      className={`rounded-2xl p-4 border flex items-center gap-4 ${
        completed
          ? "bg-green-50 border-green-200"
          : "bg-blue-50 border-blue-200"
      }`}
    >
      {completed ? (
        <CheckCircle2
          className="text-green-600"
          size={22}
        />
      ) : (
        <Loader2
          className="animate-spin text-blue-600"
          size={22}
        />
      )}

      <p className="font-medium">
        {message}
      </p>
    </div>
  );
};

export default BulkUploadBanner;