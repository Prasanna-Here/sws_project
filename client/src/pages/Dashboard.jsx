import { useState } from "react";
import { uploadDocuments } from "../services/documentService";
import Navbar from "../components/layout/Navbar";
import Tabs from "../components/layout/Tabs";

import UploadZone from "../components/upload/UploadZone";
import UploadProgress from "../components/upload/UploadProgress";

const Dashboard = () => {
    const [files, setFiles] = useState([]);

    const handleFiles = async (selectedFiles) => {
        const formattedFiles = selectedFiles.map((file) => ({
            file,
            name: file.name,
            progress: 0,
        }));

        setFiles((prev) => [...prev, ...formattedFiles]);

        try {
            await uploadDocuments(
                formattedFiles,
                (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) /
                        progressEvent.total
                    );

                    setFiles((prev) =>
                        prev.map((f) => ({
                            ...f,
                            progress: percentCompleted,
                        }))
                    );
                }
            );
        } catch (error) {
            console.log(error);
        }
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