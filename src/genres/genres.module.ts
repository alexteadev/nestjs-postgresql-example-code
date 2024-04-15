import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresModel } from './genres.model';
import { GenresService } from './genres.services';

@Module({
    imports: [TypeOrmModule.forFeature([GenresModel])],
    controllers: [GenresController],
    providers: [GenresService],
    exports: [GenresService],
})
export class GenresModule {}
