import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DATABASE_CONFIG } from 'src/config';

@Module({
    providers: [...databaseProviders],
    exports: [DATABASE_CONFIG],
})
export class DatabaseModule { }