import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmsModel } from './models/films.model';
import axios from 'axios';
import { FilmTagModel } from './models/films-tag.model';
import { FilmGenreModel } from './models/films-genre.model';
import { TagsModel } from 'src/tags/tags.model';
import { GenresModel } from 'src/genres/genres.model';
import { FilmActorModel } from './models/films-actor.model';
import { FilmDirectorModel } from './models/films-director.model';
import { DirectorsModel } from 'src/directors/directors.model';
import { FilmCountryModel } from './models/films-country.model';
import { CountryModel } from 'src/countries/countries.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilmsInitService {
    private readonly apiKey: string;

    constructor(
        @InjectRepository(FilmsModel)
        private readonly filmsRes: Repository<FilmsModel>,
        @InjectRepository(FilmTagModel)
        private readonly filmsTagRes: Repository<FilmTagModel>,
        @InjectRepository(FilmGenreModel)
        private readonly filmsGenreRes: Repository<FilmGenreModel>,
        @InjectRepository(TagsModel)
        private readonly tagsRes: Repository<TagsModel>,
        @InjectRepository(GenresModel)
        private readonly genresRes: Repository<GenresModel>,
        @InjectRepository(FilmActorModel)
        private readonly filmActorRes: Repository<FilmActorModel>,
        @InjectRepository(FilmDirectorModel)
        private readonly filmDirectorRes: Repository<FilmDirectorModel>,
        @InjectRepository(ActorsModel)
        private readonly actorsRes: Repository<ActorsModel>,
        @InjectRepository(DirectorsModel)
        private readonly directorsRes: Repository<DirectorsModel>,
        @InjectRepository(FilmCountryModel)
        private readonly filmCountryRes: Repository<FilmCountryModel>,
        @InjectRepository(CountryModel)
        private readonly countryRes: Repository<CountryModel>,
        private readonly configService: ConfigService,
    ) {

    }

    private async delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    private async filmsByYearAndPage(year: number, page = 1): Promise<any> {
        //...

        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            // ...
        }
    }

    async getFilmsByYear(year: number) {
        let page = 1;
        let totalPages = 1;

        do {
            const data = await this.function(year, page);
            if (data) {
                totalPages = data.total_pages;
                for (const film of data.results) {
                    await this.createFilm(film);
                }
            }
            page++;
        } while (page <= totalPages);
    }

    async createFilm(filmData: any) {
        const existingFilm = await this.filmsRes.findOneBy({ filmData.id });
        if (!existingFilm) {
            const film = this.filmsRes.create({
                originalPoster: filmData.poster_path,
                language: filmData.original_language,
                overview: filmData.overview,
                popularity: filmData.popularity,
                poster: '',
                releaseDate: new Date(filmData.release_date),
                year: new Date(filmData.release_date).getFullYear(),
                rating: filmData.vote_average,
                voteCount: filmData.vote_count,
            });

            const savedFilm = await this.filmsRes.save(film);

            await this.addGenresAndTagsToFilm(savedFilm);
            await this.function(savedFilm);
        }
    }

    async processActor(actorData: CastMember, savedFilm: FilmsModel) {
        const personDetails = await this.function(actorData.id);
        if (!personDetails) return;

        let actor = await this.actorsRes.findOne({ where: { originalId: actorData.id } });

        if (!actor) {
            actor = this.actorsRes.create({
                imdbID: personDetails.imdb_id,
                name: actorData.name,
                photo: personDetails.profile_path,
                birthday: personDetails.birthday ? new Date(personDetails.birthday) : undefined,
                deathday: personDetails.deathday ? new Date(personDetails.deathday) : undefined,
                placeOfBirth: personDetails.place_of_birth,
            });
        } else {

        }

        await this.actorsRes.save(actor);

        const filmActor = this.filmActorRes.create({
            film: { id: savedFilm.id } as FilmsModel,
            actor,
            as: actorData.character,
        });

        await this.filmActorRes.save(filmActor);
    }

    async processDirector(directorData: CrewMember, savedFilm: FilmsModel) {
        const personDetails = await this.function(directorData.id);
        if (!personDetails) return;

        let director = await this.directorsRes.findOne({ where: { originalId: directorData.id } });

        if (!director) {
            director = this.directorsRes.create({
            });
        } else {
        }

        await this.directorsRes.save(director);

        const filmDirector = this.filmDirectorRes.create({
            film: { id: savedFilm.id } as FilmsModel,
            director,
        });

        await this.filmDirectorRes.save(filmDirector);
    }

    // ...
}
