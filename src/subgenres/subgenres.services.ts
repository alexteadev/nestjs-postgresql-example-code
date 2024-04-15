import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubgenresModel } from './subgenres.model';
import { genresData } from 'src/data/DataGenres';
import { GenresModel } from 'src/genres/genres.model';

@Injectable()
export class SubgenresService {
    constructor(
        @InjectRepository(SubgenresModel)
        private readonly subgenresRes: Repository<SubgenresModel>,
        @InjectRepository(GenresModel)
        private readonly genresRes: Repository<GenresModel>,
    ) {}

    async createSubgenres() {
        for (const genreName in genresData) {
            const genreInfo = genresData[genreName];
            const genre = await this.genresRes.findOne({ where: { originalId: genreInfo.id } });

            // ...
        }
    }
}
