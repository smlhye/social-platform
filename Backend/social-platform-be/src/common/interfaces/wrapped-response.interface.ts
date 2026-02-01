import { ErrorResponse } from "./error-response.interface";

export interface WrappedResponse<T> {
    resData: T | null,
    resMessage: string,
    resSuccess: boolean,
    resError: ErrorResponse | null
}