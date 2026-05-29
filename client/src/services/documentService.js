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

export const getDocuments = async () => {
  return axios.get(API);
};

export const deleteDocument = async (
  id
) => {
  return axios.delete(
    `${API}/${id}`
  );
};

export const downloadDocument = async (id, filename) => {
  const url = `${API}/download/${id}`;
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};