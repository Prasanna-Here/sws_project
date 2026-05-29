import { useState, useEffect } from "react";
import socket from "../socket/socket";

import NotificationBell from "../components/notifications/NotificationBell";

import {
    getNotifications,
    markAsRead,
} from "../services/notificationService";
import {
    uploadDocuments,
    getDocuments,
    deleteDocument,
} from "../services/documentService";

import Navbar from "../components/layout/Navbar";
import Tabs from "../components/layout/Tabs";

import UploadZone from "../components/upload/UploadZone";
import UploadQueue from "../components/upload/UploadQueue";

import DocumentTable from "../components/documents/DocumentTable";
import EmptyState from "../components/documents/EmptyState";

const Dashboard = () => {

    // UPLOAD QUEUE STATE
    const [files, setFiles] = useState([]);

    // DOCUMENT LIBRARY STATE
    const [documents, setDocuments] = useState([]);

    // FETCH DOCUMENTS
    const fetchDocuments = async () => {
        try {
            const response = await getDocuments();

            setDocuments(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // FETCH ON PAGE LOAD
    useEffect(() => {
        fetchDocuments();

        fetchNotifications();

        socket.on(
            "newNotification",
            () => {
                fetchNotifications();
            }
        );

        return () => {
            socket.off(
                "newNotification"
            );
        };
    }, []);
    const markNotificationRead =
        async (id) => {
            try {
                await markAsRead(id);

                fetchNotifications();
            } catch (error) {
                console.log(error);
            }
        };
    //handle notification
    const [notifications, setNotifications] =
        useState([]);

    const [showDropdown, setShowDropdown] =
        useState(false);

    const fetchNotifications =
        async () => {
            try {
                const response =
                    await getNotifications();

                setNotifications(
                    response.data
                );
            } catch (error) {
                console.log(error);
            }
        };
    // HANDLE DELETE DOCUMENT
    const handleDelete = async (id) => {
        try {
            await deleteDocument(id);

            fetchDocuments();
        } catch (error) {
            console.log(error);
        }
    };

    // CLEAR QUEUE
    const clearQueue = () => {
        setFiles([]);
    };

    // REMOVE SINGLE FILE
    const removeFile = (index) => {
        setFiles((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    // HANDLE FILE UPLOAD
    const handleFiles = async (selectedFiles) => {
        // FORMAT FILES
        const formattedFiles = selectedFiles.map(
            (file) => ({
                file,
                name: file.name,
                progress: 0,
            })
        );

        // ADD TO QUEUE
        setFiles((prev) => [
            ...prev,
            ...formattedFiles,
        ]);

        try {
            // UPLOAD FILES
            await uploadDocuments(
                formattedFiles,
                (progressEvent) => {
                    const percentCompleted =
                        Math.round(
                            (progressEvent.loaded * 100) /
                            progressEvent.total
                        );

                    // UPDATE PROGRESS
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
            {/* NAVBAR */}
            <Navbar
                notifications={notifications}
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
                markNotificationRead={
                    markNotificationRead
                }
            />

            {/* TABS */}
            <Tabs />

            {/* PAGE CONTENT */}
            <div className="p-6 space-y-6">
                {/* UPLOAD ZONE */}
                <UploadZone
                    onFilesSelected={handleFiles}
                />

                {/* UPLOAD QUEUE */}
                <UploadQueue
                    files={files}
                    clearQueue={clearQueue}
                    removeFile={removeFile}
                />

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