import { Controller, Get } from '@nestjs/common';
import { AwardsService } from './awards.services';

@Controller('awards')
export class AwardsController {
    constructor(private readonly awardService: AwardsService) {}

    @Get('create')
    async createAwards() {
        return await this.awardService.createAwards();
    }
}
