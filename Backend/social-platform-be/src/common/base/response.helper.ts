import { ApiResponse } from '../interfaces/api-response.interface';

export function ok<T>(
    data: T,
    message = 'Success',
): ApiResponse<T> {
    return { data, message };
}
