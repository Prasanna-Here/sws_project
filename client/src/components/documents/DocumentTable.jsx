import { Trash2, Download, FileText } from "lucide-react";
import { downloadDocument } from "../../services/documentService";

const DocumentTable = ({
  documents,
  onDelete,
}) => {
  // Strip multer timestamp prefix for display
  const getDisplayName = (filename) => {
    return filename.replace(/^\d+-/, "");
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl shadow-md shadow-slate-100/50 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50/80 border-b border-slate-100 text-xs text-slate-500 font-bold uppercase tracking-wider">
          <tr>
            <th className="p-4 pl-6">
              File Name
            </th>

            <th className="p-4">
              Size
            </th>

            <th className="p-4">
              Uploaded
            </th>

            <th className="p-4 pr-6 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-50">
          {documents.map((doc) => (
            <tr
              key={doc.id}
              className="hover:bg-slate-50/30 transition-colors"
            >
              <td className="p-4 pl-6 max-w-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                    <FileText size={16} />
                  </div>
                  <span className="font-semibold text-slate-800 text-sm truncate" title={getDisplayName(doc.filename)}>
                    {getDisplayName(doc.filename)}
                  </span>
                </div>
              </td>

              <td className="p-4 text-sm text-slate-500 font-medium">
                {(doc.filesize / 1024).toFixed(1)} KB
              </td>

              <td className="p-4 text-sm text-slate-500 font-medium">
                {new Date(doc.uploaded_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>

              <td className="p-4 pr-6 text-right">
                <div className="inline-flex items-center gap-1">
                  <button
                    onClick={() =>
                      downloadDocument(doc.id, doc.filename)
                    }
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/60 rounded-xl transition duration-200"
                    title="Download document"
                  >
                    <Download size={17} />
                  </button>
                  <button
                    onClick={() =>
                      onDelete(doc.id)
                    }
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-rose-50/60 rounded-xl transition duration-200"
                    title="Delete document"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentTable;