// import { DatabaseConfig } from "src/config";
// import { DataSource } from "typeorm";
// import { User } from "./entities/user.entity";

// export const createDataSource = (dbConfig: DatabaseConfig) => {
//     return new DataSource({
//         type: 'postgres',
//         host: dbConfig.host,
//         port: dbConfig.port,
//         username: dbConfig.username,
//         password: dbConfig.password,
//         database: dbConfig.database,
//         entities: ['dist/**/*.entity.js'],
//         migrations: ['dist/database/migrations/*.js'],
//         synchronize: false,
//         logging: true,
//     })
// }
import { DatabaseConfig } from 'src/config';
import { DataSource } from 'typeorm';

export const createDataSource = (dbConfig: DatabaseConfig) => {
    return new DataSource({
        type: 'postgres',
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.database,

        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/database/migrations/*.js'],

        synchronize: false,
        logging: true,
    });
};
