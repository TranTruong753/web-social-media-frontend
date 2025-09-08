import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

// Request interceptor: KHÔNG cần gắn Authorization nữa
axiosInstance.interceptors.request.use(
  (request) => request,
  (error) => Promise.reject(error)
);

// Response interceptor để xử lý 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Gọi refresh API (BE sẽ đọc refresh_token từ cookie)
        await axios.post(
          `${API_URL}/auth/refresh_token`,
          {},
          { withCredentials: true }
        );

        // Sau khi BE set cookie access_token mới, retry lại request cũ
        return axiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
