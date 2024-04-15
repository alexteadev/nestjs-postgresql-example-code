import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorsController } from './actors.controller';
import { ActorsModel } from './actors.model';
import { ActorsService } from './actors.services';

@Module({
    imports: [TypeOrmModule.forFeature([ActorsModel])],
    controllers: [ActorsController],
    providers: [ActorsService],
})
export class ActorsModule {}
