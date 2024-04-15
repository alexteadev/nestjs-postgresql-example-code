import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { GenresService } from './genres.services';

@Controller('genres')
export class GenresController {
    constructor(private readonly genresService: GenresService) {}

    @Get('create')
    async processFilms(@Res() res: Response) {
        // ...
    }
}
