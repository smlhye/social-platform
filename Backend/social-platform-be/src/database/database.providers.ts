import { Provider } from "@nestjs/common";
import { DATABASE_CONFIG, DatabaseConfig } from "src/config";
import { DataSource } from "typeorm";
import { createDataSource } from "./data-source";

export const databaseProviders: Provider[] = [
    {
        provide: DataSource,
        inject: [DATABASE_CONFIG],
        useFactory: (dbConfig: DatabaseConfig) => createDataSource(dbConfig)
    }
]