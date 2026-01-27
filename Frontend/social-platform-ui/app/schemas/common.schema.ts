export interface ApiResponse<T> {
    resStatus: number;
    resSuccess: boolean;
    resMessage: string;
    resData: T;
}
