const DocumentTable = ({ documents }) => {
  return (
    <div className="bg-white rounded-2xl border overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="text-left p-4">
              File Name
            </th>

            <th className="text-left p-4">
              Type
            </th>

            <th className="text-left p-4">
              Size
            </th>

            <th className="text-left p-4">
              Uploaded
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
                {doc.filetype}
              </td>

              <td className="p-4">
                {doc.filesize}
              </td>

              <td className="p-4">
                {new Date(
                  doc.uploaded_at
                ).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentTable;