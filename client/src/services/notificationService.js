import axios from "axios";

const API =
  "http://localhost:5000/api/notifications";

export const getNotifications =
  async () => {
    return axios.get(API);
  };

export const markAsRead = async (
  id
) => {
  return axios.put(
    `${API}/${id}/read`
  );
};
export const markAllAsRead =
  async () => {
    return axios.put(
      `${API}/read-all`
    );
  };