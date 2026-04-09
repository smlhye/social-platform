import { ConfigService } from "@nestjs/config";
import { Env } from "./env.schema";
import { AppConfig, CloudConfig, CookieConfig, DatabaseConfig, JwtConfig } from "./config.types";
import { APP_CONFIG, CLOUD_CONFIG, COOKIE_CONFIG, DATABASE_CONFIG, JWT_CONFIG } from "./config.tokens";

type ConfigFactory<T> = (config: ConfigService<Env>) => T;

export const getAppConfig: ConfigFactory<AppConfig> = (config) => ({
    appPort: config.getOrThrow<Env['APP_PORT']>('APP_PORT'),
    nodeEnv: config.getOrThrow<Env['NODE_ENV']>('NODE_ENV'),
});

export const getDatabaseConfig: ConfigFactory<DatabaseConfig> = (config) => ({
    host: config.getOrThrow<Env['DB_HOST']>('DB_HOST'),
    port: config.getOrThrow<Env['DB_PORT']>('DB_PORT'),
    username: config.getOrThrow<Env['DB_USER']>('DB_USER'),
    password: config.getOrThrow<Env['DB_PASSWORD']>('DB_PASSWORD'),
    database: config.getOrThrow<Env['DB_NAME']>('DB_NAME'),
});

export const getJwtConfig: ConfigFactory<JwtConfig> = (config) => ({
    accessSecret: config.getOrThrow<Env['JWT_ACCESS_SECRET']>('JWT_ACCESS_SECRET'),
    accessExpiresIn: config.getOrThrow<Env['JWT_ACCESS_EXPIRES_IN']>('JWT_ACCESS_EXPIRES_IN'),
    refreshSecret: config.getOrThrow<Env['JWT_REFRESH_SECRET']>('JWT_REFRESH_SECRET'),
    refreshExpiresIn: config.getOrThrow<Env['JWT_REFRESH_EXPIRES_IN']>('JWT_REFRESH_EXPIRES_IN'),
});

export const getCookieConfig: ConfigFactory<CookieConfig> = (config) => ({
    domain: config.getOrThrow<Env['COOKIE_DOMAIN']>('COOKIE_DOMAIN'),
    secure: config.getOrThrow<Env['COOKIE_SECURE']>('COOKIE_SECURE'),
    sameSite: config.getOrThrow<Env['COOKIE_SAME_SITE']>('COOKIE_SAME_SITE'),
});

export const getCloudConfig: ConfigFactory<CloudConfig> = (config) => ({
    cloudName: config.getOrThrow<Env['CLOUD_NAME']>('CLOUD_NAME'),
    apiKey: config.getOrThrow<Env['API_KEY']>('API_KEY'),
    apiSecret: config.getOrThrow<Env['API_SECRET']>('API_SECRET'),
});

export const configGetters = [
    { token: APP_CONFIG, factory: getAppConfig },
    { token: DATABASE_CONFIG, factory: getDatabaseConfig },
    { token: JWT_CONFIG, factory: getJwtConfig },
    { token: COOKIE_CONFIG, factory: getCookieConfig },
    { token: CLOUD_CONFIG, factory: getCloudConfig },
] as const;