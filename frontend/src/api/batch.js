import axios from "axios";
const baseUrl = "/api/batch";

const getToken = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedUser");
  if (!loggedUserJSON) return null;
  return JSON.parse(loggedUserJSON).token;
};

const getAll = async () => {
  const token = getToken();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

export default { getAll };
