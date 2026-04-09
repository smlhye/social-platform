import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "./config";

export const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
});

let isRefreshing = false;
let pendingRequests: (() => void)[] = [];
const resolveQueue = () => {
    pendingRequests.forEach((callback) => callback());
    pendingRequests = [];
};

const NO_REFRESH_URLS = ["auth/sign-in", "auth/refresh", "auth/sign-out"];

axiosClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest: any = error.config;
        const isNoRefresh = NO_REFRESH_URLS.some((url) =>
            originalRequest.url?.includes(url)
        );
        if (error.response?.status === 401 && !originalRequest._retry && !isNoRefresh) {
            originalRequest._retry = true;
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    pendingRequests.push(() => {
                        resolve(axiosClient(originalRequest));
                    });
                });
            }

            isRefreshing = true;

            try {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                resolveQueue();

                return axiosClient(originalRequest);
            } catch (err) {
                window.location.href = "/sign-in";
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);