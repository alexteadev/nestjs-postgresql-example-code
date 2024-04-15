import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectorsController } from './directors.controller';
import { DirectorsModel } from './directors.model';
import { DirectorsService } from './directors.services';

@Module({
    imports: [TypeOrmModule.forFeature([DirectorsModel])],
    controllers: [DirectorsController],
    providers: [DirectorsService],
})
export class DirectorsModule {}
