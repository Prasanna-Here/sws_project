import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";

const UploadZone = ({ onFilesSelected }) => {
  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        onFilesSelected(acceptedFiles);
      },
    });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-2xl p-10 bg-white text-center cursor-pointer transition
      ${
        isDragActive
          ? "border-black bg-gray-100"
          : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center gap-4">
        <UploadCloud size={50} />

        <div>
          <h2 className="text-lg font-semibold">
            Drag & Drop Files Here
          </h2>

          <p className="text-gray-500 mt-1">
            or click to browse files
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;