import axios from "axios";

const Api = axios.create({
  baseURL: "https://localhost:5000/api",
  withCredentials: true,
});

Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      if (newToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return Api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default Api;
