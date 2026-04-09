export interface AppConfig {
    appPort: Number;
    nodeEnv: 'development' | 'staging' | 'production';
}

export interface DatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export interface JwtConfig {
    accessSecret: string;
    accessExpiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
}

export interface CookieConfig {
    domain: string;
    secure: boolean;
    sameSite: 'lax' | 'strict' | 'none';
}

export interface CloudConfig {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
}