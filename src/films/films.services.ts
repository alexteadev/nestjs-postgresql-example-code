import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmsModel } from './models/films.model';
import { GetFilmsDto } from './dto/get-films.dto';
import { IFilmList } from 'src/interface/IFilms';
import { getCountriesKeysFromNumbers } from './countries.utils';
import { IFilm } from 'src/interface/IFilm';
import { ITags } from 'src/interface/ITags';
import { IGenres, ISubgenre } from 'src/interface/IGenres';
import { FavoriteFilmsDto } from './dto/favorite-films.dto';
import { User } from 'src/users/user.decorator';
import { UserModel } from 'src/users/users.model';
import { FilmFavoriteModel } from './models/films-favorite.model';
import { MyFilmsDto } from './dto/my-films.dto';

@Injectable()
export class FilmsService {
    constructor(
        @InjectRepository(FilmsModel)
        private readonly filmsRepo: Repository<FilmsModel>,
        @InjectRepository(UserModel)
        private readonly userRepo: Repository<UserModel>,
        @InjectRepository(FilmFavoriteModel)
        private readonly favoriteRepo: Repository<FilmFavoriteModel>,
    ) {}

    async getFilms(dto: GetFilmsDto): Promise<{ filmList: IFilmList[]; totalPages: number }> {
        const ITEMS_PER_PAGE = 49;
        const offset = (dto.page - 1) * ITEMS_PER_PAGE;
        let categoryFiltersApplied = false;

        // filter by GENRE
        if (dto.genre && dto.genre.length > 0) {
            categoryFiltersApplied = true;
            const filteredIdsByGenre = await this.getFilteredFilmIdsByGenre(dto.genre);
            filmIds = filteredIdsByGenre;
        }
        
        // ...

        // filter by TAG
        if (dto.tags && dto.tags.length > 0) {
            categoryFiltersApplied = true;
            const idsByTags = await this.getFilteredFilmIdsByTags(dto.tags);
            filmIds = filmIds.length > 0 ? filmIds.filter((id) => idsByTags.includes(id)) : idsByTags;
        }

        // filter by COUNTRY
        if (dto.country && dto.country.length > 0) {
            categoryFiltersApplied = true;
            const countryCodes = getCountriesKeysFromNumbers(dto.country);
            const idsByCountry = await this.getFilteredFilmIdsByCountry(countryCodes);
            filmIds = filmIds.length > 0 ? filmIds.filter((id) => idsByCountry.includes(id)) : idsByCountry;
        }

        // ...

        // connect additional models
        let query = this.filmsRepo
            .createQueryBuilder('film')
            .leftJoinAndSelect('film.filmGenres', 'filmGenre')
            .leftJoinAndSelect('filmGenre.genre', 'genre')
            .leftJoinAndSelect('film.filmSubgenres', 'filmSubgenre')
            .leftJoinAndSelect('film.filmTags', 'filmTag');

        if (categoryFiltersApplied) {
            if (filmIds === null || filmIds.length === 0) {
                return { filmList: [], totalPages: 0 };
            }
            query = query.where('film.id IN (:...filmIds)', { filmIds });
        }

        // filter by YEAR
        if (dto.year && dto.year.length > 0) {
            query = query.andWhere('film.year BETWEEN :startYear AND :endYear', {
                startYear: Math.min(...dto.year),
                endYear: Math.max(...dto.year),
            });
        }

        const totalFilms = await query.getCount();
        const totalPages = Math.ceil(totalFilms / ITEMS_PER_PAGE);
        let orderByColumn: string;
        switch (dto.sortBy) {
            case 'rating':
                orderByColumn = 'film.rating';
                break;
            case 'year':
                orderByColumn = 'film.year';
                break;
            default:
                orderByColumn = 'film.id';
        }

        const films = await query
            .orderBy(orderByColumn, dto.direction.toUpperCase() as 'ASC' | 'DESC')
            .skip(offset)
            .take(ITEMS_PER_PAGE)
            .getMany();

        const filmList = films.map((film) => {
            const genres = film.filmGenres.reduce((acc, fg) => {
                const genreName = fg.genre.name;
                if (!acc[genreName]) {
                    acc[genreName] = {
                        id: fg.genre.id,
                        subgenres: {},
                    };
                }

                if (fg.genre.subgenres) {
                    fg.genre.subgenres.forEach((subgenre: any) => {
                        acc[genreName].subgenres[subgenre.name] = subgenre.id;
                    });
                }

                return acc;
            }, {} as IGenres);

            return {
                title: film.title,
                genre: genres,
                poster: film.originalPoster,
                rating: film.rating,
                // ...
            };
        });

        return { filmList, totalPages };
    }

    async getFilteredFilmIdsByGenre(genres: number[]): Promise<number[]> {
        const genreFilteredFilms = await this.filmsRepo
            .createQueryBuilder('film')
            .leftJoin('film.filmGenres', 'filmGenre')
            .leftJoin('filmGenre.genre', 'genre')
            .where('genre.originalId IN (:...genres)', { genres })
            .groupBy('film.id')
            .having('COUNT(DISTINCT genre.originalId) = :genreCount', { genreCount: genres.length })
            .select('film.id')
            .getRawMany();
        return genreFilteredFilms.map((film) => film.film_id);
    }

    async getFilteredFilmIdsBySubgenre(subgenres: number[]): Promise<number[]> {
        const subgenreFilteredFilms = await this.filmsRepo
            .createQueryBuilder('film')
            .leftJoin('film.filmSubgenres', 'filmSubgenre')
            .leftJoin('filmSubgenre.subgenre', 'subgenre')
            .where('subgenre.originalId IN (:...subgenres)', { subgenres })
            .groupBy('film.id')
            .having('COUNT(DISTINCT subgenre.originalId) = :subgenreCount', { subgenreCount: subgenres.length })
            .select('film.id')
            .getRawMany();
        return subgenreFilteredFilms.map((film) => film.film_id);
    }

    async getFilteredFilmIdsByTags(tags: number[]): Promise<number[]> {
        // ...
        return tagFilteredFilms.map((film) => film.film_id);
    }

    // ...

    async getFilmById(id: number): Promise<IFilm> {
        const film = await this.filmsRepo.findOne({
            where: { id },
            relations: ['filmGenres.genre', 'filmTags.tag', 'filmDirectors.director', 'filmActors.actor'],
        });

        // ...

        const directors = film.filmDirectors.map((fd) => ({
            id: fd.director.id.toString(),
            name: fd.director.name,
            url: `${fd.director.id}-${fd.director.name
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .replace(/\s+/g, '-')
                .toLowerCase()}`,
            photo: fd.director.photo,
        }));

        const actors = film.filmActors.map((fa) => ({
            id: fa.actor.id.toString(),
            name: fa.actor.name,
            url: `${fa.actor.id}-${fa.actor.name
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .replace(/\s+/g, '-')
                .toLowerCase()}`,
            photo: fa.actor.photo,
            character: fa.as,
        }));

        // ...

        return {
            id: film.id,
            title: film.title,
            overview: film.overview,
            // ...
            genres,
            tags,
            director,
            actors,
        };
    }

    async addToFavorite(dto: FavoriteFilmsDto, userEmail: User) {

        const existingFavorite = await this.favoriteRepo.findOne({
            where: {
                user: { id: user.id },
                film: { id: dto.id },
            },
        });

        if (existingFavorite) {
            return { message: 'Film is already added to favorites' };
        }

        const favorite = new FilmFavoriteModel();
        favorite.user = user;
        favorite.film = film;

        await this.favoriteRepo.save(favorite);

        return { message: 'Film added to favorites successfully' };
    }

    async getMyFilms(dto: MyFilmsDto, user: User): Promise<{ filmList: IFilmList[]; totalPages: number }> {
        const userEntity = await this.userRepo.findOne({ where: { email: user.email } });
        if (!userEntity) {
            throw new NotFoundException(`User with email ${user.email} not found`);
        }

        const ITEMS_PER_PAGE = 49;
        const { page, sortBy, direction } = dto;

        let query = this.favoriteRepo
            .createQueryBuilder('favorite')
            .leftJoinAndSelect('favorite.film', 'film')
            .leftJoinAndSelect('film.filmGenres', 'filmGenres')
            .leftJoinAndSelect('filmGenres.genre', 'genre')
            .leftJoinAndSelect('genre.subgenres', 'subgenres')
            .where('favorite.user.id = :userId', { userId: userEntity.id });

        if (sortBy === 'rating' || sortBy === 'year') {
            const orderByField = sortBy === 'year' ? 'film.year' : 'film.rating';
            query = query.orderBy(orderByField, direction.toUpperCase() as 'ASC' | 'DESC');
        }

        const totalFavorites = await query.getCount();
        const totalPages = Math.ceil(totalFavorites / ITEMS_PER_PAGE);

        query = query.skip((page - 1) * ITEMS_PER_PAGE).take(ITEMS_PER_PAGE);

        const favorites = await query.getMany();

        const filmList: IFilmList[] = favorites.map((favorite) => {
            const film = favorite.film;
            const genre: IGenres =
                film.filmGenres?.reduce((acc, fg) => {
                    if (fg.genre) {
                        const genreName = fg.genre.name;
                        if (!acc[genreName]) {
                            acc[genreName] = {
                                id: fg.genre.id,
                                subgenres:
                                    fg.genre.subgenres?.reduce((subAcc, subgenre) => {
                                        if (subgenre) {
                                            subAcc[subgenre.name] = subgenre.id;
                                        }
                                        return subAcc;
                                    }, {} as ISubgenre) || {},
                            };
                        }
                    }
                    return acc;
                }, {} as IGenres) || {};

            return {
                title: film.title,
                year: film.year.toString(),
                genre,
                // ...
            };
        });

        return { filmList, totalPages };
    }
}
