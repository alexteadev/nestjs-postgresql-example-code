import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventeraController } from './eventera.controller';
import { EventEraService } from './eventera.services';
import { EventEraModel } from './evetera.model';

@Module({
    imports: [TypeOrmModule.forFeature([EventEraModel])],
    controllers: [EventeraController],
    providers: [EventEraService],
})
export class EventeraModule {}
