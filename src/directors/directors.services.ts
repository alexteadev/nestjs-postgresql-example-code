import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DirectorsModel } from './directors.model';
import { GetDirectorsDto } from './dto/get-directors.dto';
import { IDirectorsList } from 'src/interface/IDirectors';
import { IFilms } from 'src/interface/IFilms';
import { IDirector } from 'src/interface/IDirector';
import { IGenres } from 'src/interface/IGenres';

@Injectable()
export class DirectorsService {
    constructor(
        @InjectRepository(DirectorsModel)
        private readonly directorsRepository: Repository<DirectorsModel>,
    ) {}

    async createDirectors() {
        return null;
    }

    async getDirectorById(id: number): Promise<IDirector> {
        const director = await this.directorsRepository.findOne({
            where: { id },
            relations: [
                'filmDirectors',
                'filmDirectors.film',
                'filmDirectors.film.filmGenres',
                'filmDirectors.film.filmGenres.genre',
            ],
        });

        if (!director) {
            throw new NotFoundException(`Director with ID ${id} not found`);
        }

        const films: IFilms = {};

        director.filmDirectors.forEach((filmDirector, index) => {
            const film = filmDirector.film;
            const genres = film.filmGenres.reduce((acc, fg) => {
                acc[fg.genre.name] = {
                    id: fg.genre.id,
                    subgenres: {},
                };
                return acc;
            }, {} as IGenres);

            films[index + 1] = {
                title: film.title,
                year: film.year.toString(),
                genre: genres,
                poster: film.poster,
                rating: film.rating,
                url: `${film.id}-${film.title
                    .replace(/[^a-zA-Z0-9\s]/g, '')
                    .replace(/\s+/g, '-')
                    .toLowerCase()}-${film.year}`,
            };
        });

        return {
            id: director.id,
            biography: director.biography,
            birthday: director.birthday ? director.birthday.toISOString().split('T')[0] : '',
            deathday: director.deathday ? director.deathday.toISOString().split('T')[0] : null,
            name: director.name,
            place_of_birth: director.placeOfBirth,
            photo: director.photo,
            films,
        };
    }

    async getDirectors(dto: GetDirectorsDto): Promise<{ directorsList: IDirectorsList[]; totalPages: number }> {
        const ITEMS_PER_PAGE = 70;
        const { count, rating, sortBy, direction, page } = dto;

        const orderDirection: 'ASC' | 'DESC' = direction.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        const ratingField = `director.totalRatings / director.filmCount`;

        const query = this.directorsRepository
            .createQueryBuilder('director')
            .where('director.filmCount BETWEEN :minCount AND :maxCount', { minCount: count[0], maxCount: count[1] })
            .andWhere(`${ratingField} BETWEEN :minRating AND :maxRating`, {
                minRating: rating[0],
                maxRating: rating[1],
            })
            .orderBy(sortBy === 'rating' ? ratingField : 'director.filmCount', orderDirection)
            .skip((page - 1) * ITEMS_PER_PAGE)
            .take(ITEMS_PER_PAGE);

        const directorsList: IDirectorsList[] = directors.map((director) => ({
            id: director.id,
            name: director.name,
            photo: director.photo,
            rating: parseFloat((director.totalRatings / director.filmCount).toFixed(1)),
            count: director.filmCount,
            url: `${director.id}-${director.name.replace(/\s+/g, '-').toLowerCase()}`,
        }));

        return { directorsList, totalPages };
    }
}
