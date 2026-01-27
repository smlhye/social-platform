import axios, { AxiosError, Method } from "axios"
import { API_BASE_URL } from "./config";

type ApiGatewayOptions<TBody = unknown, TParam = unknown> = {
    method?: Method,
    data?: TBody,
    params?: TParam,
    headers?: Record<string, string>
};

export async function apiGateway<TRespone, TBody = unknown, TParam = unknown>(
    path: string,
    options: ApiGatewayOptions<TBody, TParam> = {}
): Promise<TRespone> {
    try {
        const res = await axios.request<TRespone>({
            baseURL: API_BASE_URL,
            url: path,
            method: options.method ?? "GET",
            data: options.data,
            params: options.params,
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            },
            withCredentials: true
        })
        return res.data;
    } catch (error) {
        const err = error as AxiosError<{ message?: string }>;

        throw new Error(
            err.response?.data?.message ||
            err.message ||
            "Request failed"
        );
    }
} 