import { useState, useEffect } from "react";

import {
    uploadDocuments,
    getDocuments,
    deleteDocument,
} from "../services/documentService";

import Navbar from "../components/layout/Navbar";
import Tabs from "../components/layout/Tabs";

import UploadZone from "../components/upload/UploadZone";
import UploadProgress from "../components/upload/UploadProgress";

import DocumentTable from "../components/documents/DocumentTable";
import EmptyState from "../components/documents/EmptyState";

const Dashboard = () => {

    const [files, setFiles] = useState([]);

    const [documents, setDocuments] = useState([]);
    const handleDelete = async (id) => {
        try {
            await deleteDocument(id);

            fetchDocuments();
        } catch (error) {
            console.log(error);
        }
    };
    // FETCH DOCUMENTS
    const fetchDocuments = async () => {
        try {

            const response =
                await getDocuments();

            setDocuments(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    // FETCH ON PAGE LOAD
    useEffect(() => {
        fetchDocuments();
    }, []);

    // HANDLE FILE UPLOADS
    const handleFiles = async (selectedFiles) => {

        const formattedFiles = selectedFiles.map((file) => ({
            file,
            name: file.name,
            progress: 0,
        }));

        setFiles((prev) => [
            ...prev,
            ...formattedFiles,
        ]);

        try {

            await uploadDocuments(
                formattedFiles,
                (progressEvent) => {

                    const percentCompleted =
                        Math.round(
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

            // REFRESH DOCUMENTS
            await fetchDocuments();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">

            <Navbar />

            <Tabs />

            <div className="p-6 space-y-6">

                {/* UPLOAD ZONE */}
                <UploadZone
                    onFilesSelected={handleFiles}
                />

                {/* UPLOAD PROGRESS */}
                <div className="space-y-4">

                    {files.map((file, index) => (
                        <UploadProgress
                            key={index}
                            file={file}
                        />
                    ))}

                </div>

                {/* DOCUMENT LIBRARY */}
                <div className="space-y-4">

                    <h2 className="text-xl font-semibold">
                        Document Library
                    </h2>

                    {documents.length > 0 ? (
                        <DocumentTable
                            documents={documents}
                            onDelete={handleDelete}
                        />
                    ) : (
                        <EmptyState />
                    )}

                </div>

            </div>

        </div>
    );
};

export default Dashboard;