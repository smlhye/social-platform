import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    PORT: Joi.number().required(),
    NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),

    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DATABASE: Joi.string().required(),

    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().required(),
    JWT_REMEMBER_EXPIRES_IN: Joi.string().required(),

    COOKIE_DOMAIN: Joi.string().required(),
});