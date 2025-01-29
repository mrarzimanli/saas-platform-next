import { getCookie } from "@/shared/utils/cookie";
import axios, { AxiosInstance } from "axios";

export const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY || "example_access_secret_key";
export const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY || "example_refresh_secret_key";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

type ResponseType = "arraybuffer" | "blob" | "document" | "json" | "text" | "stream" | undefined;
type ContentType = "application/json" | "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain" | "application/xml" | "application/octet-stream" | undefined;

const createAxiosInstance = (useAuthInterceptor: boolean, contentType: ContentType = "application/json", responseType: ResponseType = "json"): AxiosInstance => {
  const instance = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: {
      "Content-Type": contentType,
      "X-Keep-Me-Signed-In": true,
    },
    responseType: responseType,
  });

  if (useAuthInterceptor) {
    // Request Interceptor: Add Authorization Header
    instance.interceptors.request.use(
      (config) => {
        const authToken = getCookie(ACCESS_SECRET_KEY);
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor: Handle Errors
    instance.interceptors.response.use(
      (response) => response, // Return the response if no errors
      async (error) => {
        if (error.response?.status === 401) {
          const refreshToken = getCookie(REFRESH_SECRET_KEY);
          if (refreshToken) {
            try {
              const { data } = await axios.post(`${BASE_URL}/api/auth/refresh-token`, null, {
                headers: {
                  Authorization: `Bearer ${refreshToken}`,
                },
              });

              // Save the new access token and retry the failed request
              document.cookie = `${ACCESS_SECRET_KEY}=${data.accessToken}; path=/`;
              error.config.headers.Authorization = `Bearer ${data.accessToken}`;
              return instance(error.config); // Retry the original request
            } catch (refreshError) {
              window.location.href = "/login"; // Redirect to login page
            }
          } else {
            // No refresh token available
            window.location.href = "/login"; // Redirect to login page
          }
        }

        return Promise.reject(error);
      }
    );
  }

  return instance;
};

// Axios instance with authentication interceptor
const axiosInstance = createAxiosInstance(true);

// Axios instance without authentication interceptor
const axiosOpen = createAxiosInstance(false);

export { axiosInstance, axiosOpen, createAxiosInstance };
