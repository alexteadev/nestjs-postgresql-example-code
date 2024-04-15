import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ActorsService } from './actors.services';
import { GetActorsDto } from './dto/get-actors.dto';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('actors')
export class ActorsController {
    constructor(private readonly actorService: ActorsService) {}

    @Get('create')
    async createTags() {
        return await this.actorService.createActors();
    }

    @Post('getlist')
    async getActors(@Body() dto: GetActorsDto) {
        return await this.actorService.getActors(dto);
    }

    @Get('byid/:id')
    async getListById(
        @Param('id', IdValidationPipe) id: number,
    ) {
        return this.actorService.getActorById(id);
    }
}
