import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsController } from './films.controller';
import { FilmsModel } from './models/films.model';
import { FilmsService } from './films.services';
import { FilmGenreModel } from './models/films-genre.model';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            // ...
            FilmEraModel,
            FilmSubgenreModel,
            FilmTagModel,
            FilmActorModel,
            FilmDirectorModel,
            FilmCountryModel,
            TagsModel,
            GenresModel,
            ActorsModel,
            DirectorsModel,
            CountryModel,
            FilmFavoriteModel,
        ]),
    ],
    controllers: [FilmsController],
    providers: [FilmsService, FilmsInitService],
})
export class FilmsModule {}
