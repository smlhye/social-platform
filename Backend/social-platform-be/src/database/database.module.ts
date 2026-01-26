import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { ConfigModule, DATABASE_CONFIG } from 'src/config';
import { DataSource } from 'typeorm';

@Module({
    imports: [ConfigModule],
    providers: [...databaseProviders],
    exports: [DataSource],
})
export class DatabaseModule { }