import z from "zod";

const parseBoolean = (val: unknown) => val === 'true';

const parsePort = (val: unknown) => {
    const num = Number(val);
    return Number.isNaN(num) ? undefined : num;
}

export const EnvSchema = z.object({
    // App
    APP_PORT: z.preprocess(parsePort, z.number()
        .int()
        .min(1, { message: "APP_PORT must be >= 1" })
        .max(65535, { message: "APP_PORT must be <= 65535" })
    ).default(5000).describe("Application port"),
    NODE_ENV: z.enum(['development', 'staging', 'production'])
        .default('development')
        .describe('Application environment'),

    // Database
    DB_VERSION_TAG: z.string().default('15.5').describe("PostgreSQL version"),
    DB_HOST: z.string().default('localhost').describe("Database host"),
    DB_PORT: z.preprocess(parsePort, z.number()
        .int()
        .min(1)
        .max(65535)
    ).default(5432).describe("Database port"),
    DB_USER: z.string().nonempty().describe("Database username"),
    DB_PASSWORD: z.string().nonempty().describe("Database password"),
    DB_NAME: z.string().nonempty().describe("Database name"),

    // pgAdmin
    PGADMIN_VERSION_TAG: z.string().default('7.9').describe("PgAdmin version"),
    PGADMIN_DEFAULT_EMAIL: z.email().describe("PgAdmin admin email"),
    PGADMIN_DEFAULT_PASSWORD: z.string().min(8).describe("PgAdmin admin password"),

    // JWT
    JWT_ACCESS_SECRET: z.string().min(32).describe("JWT access secret"),
    JWT_ACCESS_EXPIRES_IN: z.string().default('300s').describe("Access token expiration time"),
    JWT_REFRESH_SECRET: z.string().min(32).describe("JWT refresh secret"),
    JWT_REFRESH_EXPIRES_IN: z.string().default('7d').describe("Refresh token expiration time"),

    // Cookie
    COOKIE_DOMAIN: z.string().nonempty().describe("Cookie domain"),
    COOKIE_SECURE: z.preprocess(parseBoolean, z.boolean()).default(false).describe("Cookie secure flag"),
    COOKIE_SAME_SITE: z.enum(['lax', 'strict', 'none']).default('lax').describe("SameSite cookie policy"),
});

export type Env = z.infer<typeof EnvSchema>;