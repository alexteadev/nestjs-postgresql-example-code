import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenresModel } from './genres.model';

@Injectable()
export class GenresService {
    constructor(
        @InjectRepository(GenresModel)
        private readonly genresRes: Repository<GenresModel>,
    ) {}

    async createGenres() {
        // ...
    }
}
