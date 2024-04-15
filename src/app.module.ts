import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/configurations';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserModel } from './users/users.model';
import { AuthProviderModule } from './auth-provider/auth-provider.module';
import { AuthProviderModel } from './auth-provider/auth-provider.model';
import { FilmsModule } from './films/films.module';
import { ActorsModule } from './actors/actors.module';
import { DirectorsModule } from './directors/directors.module';
import { FilmsModel } from './films/models/films.model';
import { GenresModule } from './genres/genres.module';
import { SubgenresModule } from './subgenres/subgenres.module';
import { GenresModel } from './genres/genres.model';
import { SubgenresModel } from './subgenres/subgenres.model';
import { TagsModule } from './tags/tags.module';
import { TagsModel } from './tags/tags.model';
import { FilmGenreModel } from './films/models/films-genre.model';
import { FilmSubgenreModel } from './films/models/films-subgenre.model';
import { FilmTagModel } from './films/models/films-tag.model';
import { EventeraModule } from './eventera/eventera.module';
import { AwardsModule } from './awards/awards.module';
import { EventEraModel } from './eventera/evetera.model';
import { AwardModel } from './awards/awards.model';
import { FilmEraModel } from './films/models/films-era.model';
import { FilmAwardModel } from './films/models/films-award.model';
import { ActorsModel } from './actors/actors.model';
import { FilmActorModel } from './films/models/films-actor.model';
import { DirectorsModel } from './directors/directors.model';
import { FilmDirectorModel } from './films/models/films-director.model';
import { CountryModel } from './countries/countries.model';
import { FilmFavoriteModel } from './films/models/films-favorite.model';
import { SeriesFavoriteModel } from './series/models/series-favorite.model';
import { ContactModule } from './contact/contact.module';
import { ContactModel } from './contact/contact.model';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [
                ConfigModule,
            ],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const baseConfig = getTypeOrmConfig(configService);
                return {
                    ...baseConfig,
                    entities: [
                        UserModel,
                        ContactModel,
                        AuthProviderModel,
                        CountryModel,
                        GenresModel,
                        SubgenresModel,
                        TagsModel,
                        EventEraModel,
                        // ...
                        SeriesGenreModel,
                        SeriesEraModel,
                        SeriesDirectorModel,
                        SeriesAwardModel,
                        SeriesActorModel,
                        SeriesCountryModel,
                        SeriesFavoriteModel,
                    ],
                    synchronize: false,
                };
            },
        }),
        AuthModule,
        UsersModule,
        AuthProviderModule,
        FilmsModule,
        ActorsModule,
        DirectorsModule,
        GenresModule,
        // ...
    ],
})
export class AppModule {}
