import axios from "axios";

const API = "http://localhost:5000/api/documents";

export const uploadDocuments = async (
  files,
  onUploadProgress
) => {
  const formData = new FormData();

  files.forEach((item) => {
    formData.append("documents", item.file);
  });

  return axios.post(
    `${API}/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },

      onUploadProgress,
    }
  );
};