import { IsString, IsNumber } from 'class-validator';

export class EnvValidationSchema {
    @IsNumber()
    PORT: number;

    @IsString()
    NODE_ENV: string;

    @IsString()
    DB_HOST: string;

    @IsNumber()
    DB_PORT: number;

    @IsString()
    DB_USERNAME: string;

    @IsString()
    DB_PASSWORD: string;

    @IsString()
    DB_DATABASE: string;

    @IsString()
    JWT_SECRET: string;

    @IsString()
    JWT_EXPIRES_IN: string;
}