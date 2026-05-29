import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";

const UploadZone = ({ onFilesSelected }) => {
  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        "application/pdf": [".pdf"],
      },
      onDrop: (acceptedFiles) => {
        onFilesSelected(acceptedFiles);
      },
    });

  return (
    <div
      {...getRootProps()}
      className={`relative overflow-hidden border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 group
      ${
        isDragActive
          ? "border-indigo-600 bg-indigo-50/40 shadow-inner"
          : "border-slate-200 bg-gradient-to-br from-white to-slate-50/50 hover:border-indigo-400 hover:bg-white hover:shadow-md hover:shadow-indigo-500/5"
      }`}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center gap-4 relative z-10">
        {/* Glow backdrop effect */}
        <div className="absolute w-24 h-24 bg-indigo-500/10 rounded-full blur-xl -z-10 group-hover:scale-125 transition-transform duration-500" />
        
        {/* Animated Icon Wrapper */}
        <div className={`p-4 rounded-2xl transition-all duration-300 
          ${
            isDragActive 
              ? "bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-500/20" 
              : "bg-indigo-50 text-indigo-600 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-500/20"
          }`}
        >
          <UploadCloud size={32} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </div>

        <div className="space-y-1">
          <h2 className="text-lg font-bold text-slate-800 tracking-tight transition-colors group-hover:text-indigo-950">
            Drag & drop PDF here
          </h2>

          <p className="text-sm text-slate-500 font-medium">
            or <span className="text-indigo-600 group-hover:text-indigo-700 underline underline-offset-2">browse files</span> from your device
          </p>

          <p className="text-xs text-slate-400 font-medium pt-1">
            Only PDF format is supported • Maximum 20MB per file
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;