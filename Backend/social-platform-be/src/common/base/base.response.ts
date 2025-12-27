export class BaseResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: {
        code: string | number;
        details?: any;
    }

    private constructor(
        success: boolean,
        message: string,
        data?: T,
        error?: { code: string | number; details?: any }
    ) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.error = error;
    }

    static ok<T>(data?: T, message = "Success"): BaseResponse<T> {
        return new BaseResponse<T>(true, message, data);
    }

    static fail<T>(
        message: string,
        code: string | number = "UNKNOWN_ERROR",
        details?: any
    ): BaseResponse<T> {
        return new BaseResponse<T>(false, message, undefined, { code, details });
    }
}