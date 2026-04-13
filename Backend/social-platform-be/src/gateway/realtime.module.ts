import { Module } from '@nestjs/common';
import { RealtimeGateway } from './realtime.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [RealtimeGateway],
    exports: [RealtimeGateway],
})
export class RealtimeModule { }