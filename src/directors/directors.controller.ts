import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DirectorsService } from './directors.services';
import { GetDirectorsDto } from './dto/get-directors.dto';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('directors')
export class DirectorsController {
    constructor(private readonly directorsService: DirectorsService) {}

    @Get('create')
    async createTags() {
        return await this.directorsService.createDirectors();
    }

    @Post('getlist')
    async getActors(@Body() dto: GetDirectorsDto) {
        return await this.directorsService.getDirectors(dto);
    }

    @Get('byid/:id')
    async getListById(@Param('id', IdValidationPipe) id: number) {
        return this.directorsService.getDirectorById(id);
    }
}
