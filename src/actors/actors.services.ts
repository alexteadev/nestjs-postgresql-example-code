import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActorsModel } from './actors.model';
import { GetActorsDto } from './dto/get-actors.dto';
import { IActorsList } from 'src/interface/IActors';
import { IActor } from 'src/interface/IActor';
import { IFilms } from 'src/interface/IFilms';
import { IGenres } from 'src/interface/IGenres';

@Injectable()
export class ActorsService {
    constructor(
        @InjectRepository(ActorsModel)
        private readonly actorsRepository: Repository<ActorsModel>,
    ) {}

    async createActors() {
        return null;
    }

    async getActorById(id: number): Promise<IActor> {
        const actor = await this.actorsRepository.findOne({
            where: { id },
            relations: [
                'filmActors',
                'filmActors.film',
                'filmActors.film.filmGenres',
                'filmActors.film.filmGenres.genre',
            ],
        });

        if (!actor) {
            throw new NotFoundException(`Actor with ID ${id} not found`);
        }

        const films: IFilms = {};
        actor.filmActors.forEach((filmActor, index) => {
            const film = filmActor.film;
            const genres = film.filmGenres.reduce((acc, fg) => {
                const genreName = fg.genre.name;
                if (!acc[genreName]) {
                    acc[genreName] = {
                        id: fg.genre.id,
                        subgenres: {},
                    };
                }

                if (fg.genre.subgenres && fg.genre.subgenres.length > 0) {
                    fg.genre.subgenres.forEach((subgenre) => {
                        if (subgenre && subgenre.name && typeof acc[genreName].subgenres === 'object') {
                            acc[genreName].subgenres[subgenre.name] = subgenre.id;
                        }
                    });
                }
                // }

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
            id: actor.id,
            biography: actor.biography,
            birthday: actor.birthday ? actor.birthday.toISOString().split('T')[0] : '',
            deathday: actor.deathday ? actor.deathday.toISOString().split('T')[0] : null,
            name: actor.name,
            place_of_birth: actor.placeOfBirth,
            photo: actor.photo,
            films,
        };
    }

    async getActors(dto: GetActorsDto): Promise<{ actorsList: IActorsList[]; totalPages: number }> {
        const ITEMS_PER_PAGE = 70;
        const { count, rating, sortBy, direction, page } = dto;

        const maxRating = rating[1] > 8 ? 7.6 : rating[1];

        const orderDirection: 'ASC' | 'DESC' = direction.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        const ratingField = `actor.totalRatings / actor.filmCount`;

        const query = this.actorsRepository
            .createQueryBuilder('actor')
            .where('actor.filmCount BETWEEN :minCount AND :maxCount', { minCount: count[0], maxCount: count[1] })
            .andWhere(`${ratingField} BETWEEN :minRating AND :maxRating`, {
                minRating: rating[0],
                maxRating: maxRating,
            })
            .andWhere('actor.id != :excludedId', { excludedId: 169 })
            .orderBy(sortBy === 'rating' ? ratingField : 'actor.filmCount', orderDirection)
            .skip((page - 1) * ITEMS_PER_PAGE)
            .take(ITEMS_PER_PAGE);

        const actors = await query.getMany();
        const totalActors = await query.getCount();
        const totalPages = Math.ceil(totalActors / ITEMS_PER_PAGE);

        const actorsList: IActorsList[] = actors.map((actor) => ({
            id: actor.id,
            name: actor.name,
            photo: actor.photo,
            rating: parseFloat((actor.totalRatings / actor.filmCount).toFixed(1)),
            count: actor.filmCount,
            url: `${actor.id}-${actor.name.replace(/\s+/g, '-').toLowerCase()}`,
        }));

        return { actorsList, totalPages };
    }
}
