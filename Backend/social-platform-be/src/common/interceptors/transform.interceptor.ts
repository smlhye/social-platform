import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { WrappedResponse } from '../interfaces/wrapped-response.interface';

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<ApiResponse<T>, WrappedResponse<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler<ApiResponse<T>>,
    ): Observable<WrappedResponse<T>> {
        return next.handle().pipe(
            map((response) => ({
                resData: response.data ?? null,
                resMessage: response.message ?? 'Success',
                resSuccess: true,
                resError: null,
            })),
        );
    }
}
