import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs";

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler) {
        const res = context.switchToHttp().getResponse();

        return next.handle().pipe(
            map((data) => ({
                resStatus: res.statusCode,
                resSuccess: true,
                resMessage: 'Success',
                resData: data,
            })),
        );
    }
}