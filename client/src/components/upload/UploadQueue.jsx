import { CheckCircle2, X } from "lucide-react";

const UploadQueue = ({
    files,
    clearQueue,
    removeFile,
    isBulkUpload,
}) => {
    if (files.length === 0) return null;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                    Upload Queue
                </h2>

                <button
                    onClick={clearQueue}
                    className="text-sm text-gray-500 hover:text-black"
                >
                    Clear all
                </button>
            </div>

            <div className={
                isBulkUpload
                    ? "space-y-2 max-h-40 overflow-y-auto"
                    : "space-y-3"
            }>
                {files.map((file, index) => (
                    <div
                        key={index}
                        className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-green-100 p-2 rounded-full">
                                <CheckCircle2
                                    className="text-green-600"
                                    size={20}
                                />
                            </div>

                            <div>
                                <h3 className="font-medium">
                                    {file.name}
                                </h3>

                                <p className="text-sm text-green-600">
                                    Upload complete
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5">
                            <p className="text-sm text-gray-500">
                                {(
                                    file.file.size / 1024
                                ).toFixed(1)}{" "}
                                KB
                            </p>

                            <button
                                onClick={() =>
                                    removeFile(index)
                                }
                                className="text-gray-400 hover:text-red-500"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadQueue;