import axios from "axios";

const token = () => {
  return typeof window !== "undefined" ? localStorage.getItem("token") : "";
};
const refresh_token = () => {
  return typeof window !== "undefined"
    ? localStorage.getItem("refresh_token")
    : "";
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { Authorization: "Bearer " + token() },
});

api.interceptors.request.use((config: any) => {
  config.headers["Authorization"] = "Bearer " + token();
  return config;
});
api.interceptors.response.use(
  (re) => {
    return re;
  },
  async (error) => {
    const config = error.config;
    if (error.response.status === 401 && !config._retry) {
      config._retry = true;
      try {
        const access_token = await refreshAccessToken();
        if (typeof window !== "undefined") {
          localStorage.setItem("token", access_token.data.accessToken);
          localStorage.setItem("refresh_token", access_token.data.refreshToken);
        }
        return api(config);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
const refreshAccessToken = async () => {
  return await axios.get("/auth/refresh-token", {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: { Authorization: "Bearer " + refresh_token() },
  });
};

export default api;
