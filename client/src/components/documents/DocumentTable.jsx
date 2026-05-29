import { Trash2 } from "lucide-react";

const DocumentTable = ({
  documents,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-2xl border overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="text-left p-4">
              File Name
            </th>

            <th className="text-left p-4">
              Size
            </th>

            <th className="text-left p-4">
              Uploaded
            </th>

            <th className="text-left p-4">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {documents.map((doc) => (
            <tr
              key={doc.id}
              className="border-b last:border-none"
            >
              <td className="p-4">
                {doc.filename}
              </td>

              <td className="p-4">
                {doc.filesize}
              </td>

              <td className="p-4">
                {new Date(
                  doc.uploaded_at
                ).toLocaleDateString()}
              </td>

              <td className="p-4">
                <button
                  onClick={() =>
                    onDelete(doc.id)
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentTable;