import { Controller, Get } from '@nestjs/common';
import { EventEraService } from './eventera.services';

@Controller('eventera')
export class EventeraController {
    constructor(private readonly eraService: EventEraService) {}

    @Get('create')
    async createTags() {
        return await this.eraService.createEra();
    }
}
