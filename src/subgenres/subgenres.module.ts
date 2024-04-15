import { Module } from '@nestjs/common';
import { SubgenresController } from './subgenres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubgenresModel } from './subgenres.model';
import { SubgenresService } from './subgenres.services';
import { GenresModel } from 'src/genres/genres.model';

@Module({
    imports: [TypeOrmModule.forFeature([SubgenresModel, GenresModel])],
    controllers: [SubgenresController],
    providers: [SubgenresService],
})
export class SubgenresModule {}
