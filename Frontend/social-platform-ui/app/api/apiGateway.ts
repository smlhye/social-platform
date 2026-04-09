import axios, { AxiosError, Method } from "axios"
import { API_BASE_URL } from "./config";
import { axiosClient } from "./axiosClient";

type ApiGatewayOptions<TBody = unknown, TParam = unknown> = {
    method?: Method,
    data?: TBody,
    params?: TParam,
    headers?: Record<string, string>
};

type ApiErrorResponse = {
    resData: null;
    resMessage: string;
    resSuccess: false;
    resError: { statusCode: number; details: string | null };
};

export async function apiGateway<TRespone, TBody = unknown, TParam = unknown>(
    path: string,
    options: ApiGatewayOptions<TBody, TParam> = {}
): Promise<TRespone> {
    try {
        const res = await axiosClient.request<TRespone>({
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
        const err = error as AxiosError<ApiErrorResponse>;

        const message = err.response?.data?.resMessage || err.message || "Request failed";

        throw new Error(message);
    }
} 