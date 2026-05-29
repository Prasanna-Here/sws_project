import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import Tabs from "../components/layout/Tabs";

import UploadZone from "../components/upload/UploadZone";
import UploadProgress from "../components/upload/UploadProgress";

const Dashboard = () => {
  const [files, setFiles] = useState([]);

  const handleFiles = (selectedFiles) => {
    const formattedFiles = selectedFiles.map((file) => ({
      file,
      name: file.name,
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...formattedFiles]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Tabs />

      <div className="p-6 space-y-6">
        <UploadZone onFilesSelected={handleFiles} />

        <div className="space-y-4">
          {files.map((file, index) => (
            <UploadProgress
              key={index}
              file={file}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;