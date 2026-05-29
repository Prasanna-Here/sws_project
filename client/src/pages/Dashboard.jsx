import { useState, useEffect } from "react";
import socket from "../socket/socket";
import BulkUploadBanner from "../components/upload/BulkUploadBanner";
import NotificationBell from "../components/notifications/NotificationBell";

import {
    getNotifications,
    markAsRead,
    markAllAsRead,
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
    
    // Bulk upload banner
    const [isBulkUpload, setIsBulkUpload] = useState(false);
    const [bulkMessage, setBulkMessage] = useState("");

    // REAL-TIME TOAST NOTIFICATIONS STATE
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = "success") => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 6000);
    };

    // FETCH DOCUMENTS
    const fetchDocuments = async () => {
        try {
            const response = await getDocuments();
            setDocuments(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleMarkAllRead = async () => {
        try {
            await markAllAsRead();
            fetchNotifications();
        } catch (error) {
            console.log(error);
        }
    };

    // FETCH ON PAGE LOAD AND SOCKET LISTENERS
    useEffect(() => {
        fetchDocuments();
        fetchNotifications();

        socket.on("newNotification", (data) => {
            fetchNotifications();
            if (data && data.message) {
                showToast(data.message, "success");
            }
        });

        return () => {
            socket.off("newNotification");
        };
    }, []);

    const markNotificationRead = async (id) => {
        try {
            await markAsRead(id);
            fetchNotifications();
        } catch (error) {
            console.log(error);
        }
    };

    // HANDLE NOTIFICATION
    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const fetchNotifications = async () => {
        try {
            const response = await getNotifications();
            setNotifications(response.data);
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
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    // HANDLE FILE UPLOAD WITH INDIVIDUAL PROGRESS CALCULATIONS
    const handleFiles = async (selectedFiles) => {
        // Only accept PDFs
        const pdfFiles = selectedFiles.filter(file => file.type === "application/pdf" || file.name.endsWith(".pdf"));
        if (pdfFiles.length === 0) return;

        const batchId = Date.now();
        const formattedFiles = pdfFiles.map((file, index) => ({
            id: `${batchId}-${index}`,
            file,
            name: file.name,
            progress: 0,
            status: "pending",
        }));

        if (pdfFiles.length > 3) {
            setIsBulkUpload(true);
            setBulkMessage(
                `Upload in progress — processing ${pdfFiles.length} files in background`
            );
        } else {
            setIsBulkUpload(false);
            setBulkMessage("");
        }

        // ADD TO QUEUE
        setFiles((prev) => [...prev, ...formattedFiles]);

        try {
            // UPLOAD FILES
            await uploadDocuments(
                formattedFiles,
                (progressEvent) => {
                    const loaded = progressEvent.loaded;
                    const total = progressEvent.total;

                    // Calculate total bytes of files in this batch
                    const totalFileBytes = formattedFiles.reduce(
                        (acc, f) => acc + f.file.size,
                        0
                    );

                    // Scale factor for multipart boundary overhead
                    const scale = total > 0 ? totalFileBytes / total : 1;
                    const loadedScale = loaded * scale;

                    let cumulative = 0;
                    const progressUpdates = {};

                    formattedFiles.forEach((f) => {
                        const size = f.file.size;
                        const start = cumulative;
                        const end = cumulative + size;
                        cumulative += size;

                        let fileProgress = 0;
                        let fileStatus = "uploading";

                        if (loadedScale >= end) {
                            fileProgress = 100;
                            fileStatus = "complete";
                        } else if (loadedScale <= start) {
                            fileProgress = 0;
                            fileStatus = "pending";
                        } else {
                            fileProgress = Math.round(
                                ((loadedScale - start) / size) * 100
                            );
                            fileProgress = Math.max(0, Math.min(99, fileProgress));
                            fileStatus = "uploading";
                        }

                        progressUpdates[f.id] = {
                            progress: fileProgress,
                            status: fileStatus,
                        };
                    });

                    // UPDATE PROGRESS
                    setFiles((prev) =>
                        prev.map((f) => {
                            const update = progressUpdates[f.id];
                            if (update) {
                                return {
                                    ...f,
                                    progress: update.progress,
                                    status: update.status,
                                };
                            }
                            return f;
                        })
                    );
                }
            );

            // Wait briefly for server handling
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Set all files in this batch to complete on success
            setFiles((prev) =>
                prev.map((f) => {
                    if (formattedFiles.some((bf) => bf.id === f.id)) {
                        return {
                            ...f,
                            progress: 100,
                            status: "complete",
                        };
                    }
                    return f;
                })
            );

            // REFRESH DOCUMENTS
            await fetchDocuments();

            if (pdfFiles.length > 3) {
                setBulkMessage(
                    `${pdfFiles.length} files uploaded successfully`
                );

                setTimeout(() => {
                    setIsBulkUpload(false);
                }, 4000);
            }
        } catch (error) {
            console.log(error);
            // Mark files in this batch as failed on error
            setFiles((prev) =>
                prev.map((f) => {
                    if (formattedFiles.some((bf) => bf.id === f.id)) {
                        return {
                            ...f,
                            status: "failed",
                            progress: 0,
                        };
                    }
                    return f;
                })
            );
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* NAVBAR */}
            <Navbar
                notifications={notifications}
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
                markNotificationRead={markNotificationRead}
                markAllRead={handleMarkAllRead}
            />

            {/* TABS */}
            <Tabs />

            {/* PAGE CONTENT */}
            <div className="max-w-5xl mx-auto p-6 md:p-8 space-y-8">
                {/* UPLOAD ZONE */}
                <UploadZone onFilesSelected={handleFiles} />
                
                {/* BULK UPLOAD BANNER */}
                {isBulkUpload && (
                    <BulkUploadBanner
                        message={bulkMessage}
                        completed={bulkMessage.includes("successfully")}
                    />
                )}
                
                {/* UPLOAD QUEUE */}
                <UploadQueue
                    files={files}
                    clearQueue={clearQueue}
                    removeFile={removeFile}
                    isBulkUpload={isBulkUpload}
                />

                {/* DOCUMENT LIBRARY */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-slate-800 tracking-tight">
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

            {/* FLOATING TOAST NOTIFICATIONS */}
            <div className="fixed bottom-6 right-6 space-y-3 z-50 pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className="bg-slate-900 border border-slate-800/80 text-slate-100 pl-5 pr-3 py-3 rounded-2xl shadow-xl flex items-center gap-3 transition-all duration-350 pointer-events-auto transform hover:scale-[1.02]"
                        style={{ 
                            animation: "slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards"
                        }}
                    >
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <span className="text-xs font-semibold tracking-tight">{toast.message}</span>
                        <button
                            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                            className="text-slate-500 hover:text-slate-300 p-1 hover:bg-slate-800 rounded-lg transition shrink-0 focus:outline-none"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            {/* INLINE STYLE FOR ANIMATIONS */}
            <style>{`
                @keyframes slideIn {
                    from {
                        transform: translateY(24px) scale(0.95);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0) scale(1);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;