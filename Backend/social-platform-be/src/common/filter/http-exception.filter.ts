import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import type { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const response = exception.getResponse() as any;

        const message = Array.isArray(response?.message)
            ? response.message[0]
            : response?.message ?? 'Error';

        res.status(status).json({
            resData: null,
            resMessage: message,
            resSuccess: false,
            resError: {
                statusCode: status,
                details: response?.error ?? null,
            },
        });
    }
}
