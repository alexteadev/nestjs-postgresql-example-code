import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { SubgenresService } from './subgenres.services';

@Controller('subgenres')
export class SubgenresController {
    constructor(private readonly subgenresService: SubgenresService) {}

    @Get('create')
    async processFilms(@Res() res: Response) {
        // ..
    }
}
