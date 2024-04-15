import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeriesController } from './series.controller';
import { SeriesInitService } from './series-init.services';
import { SeriesService } from './series.services';
import { SeriesModel } from './models/series.model';
import { SeriesAwardModel } from './models/series-award.model';
import { SeriesGenreModel } from './models/series-genre.model';
import { SeriesEraModel } from './models/series-era.model';
import { SeriesSubgenreModel } from './models/series-subgenre.model';
import { SeriesTagModel } from './models/series-tag.model';
import { SeriesActorModel } from './models/series-actor.model';
import { SeriesDirectorModel } from './models/series-director.model';
import { TagsModel } from 'src/tags/tags.model';
import { GenresModel } from 'src/genres/genres.model';
import { ActorsModel } from 'src/actors/actors.model';
import { DirectorsModel } from 'src/directors/directors.model';
import { CountryModel } from 'src/countries/countries.model';
import { SeriesCountryModel } from './models/series-country.model';
import { SeriesFavoriteModel } from './models/series-favorite.model';
import { UserModel } from 'src/users/users.model';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserModel,
            SeriesModel,
            SeriesAwardModel,
            SeriesGenreModel,
            SeriesEraModel,
            SeriesSubgenreModel,
            SeriesTagModel,
            SeriesActorModel,
            SeriesDirectorModel,
            SeriesCountryModel,
            SeriesFavoriteModel,
            TagsModel,
            GenresModel,
            ActorsModel,
            DirectorsModel,
            CountryModel,
        ]),
    ],
    controllers: [SeriesController],
    providers: [SeriesService, SeriesInitService],
})
export class SeriesModule {}
