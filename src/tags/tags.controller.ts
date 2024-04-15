import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.services';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Get('create')
    async createTags() {
        return await this.tagsService.createTags();
    }

    @Get()
    async getAllTags() {
        return await this.tagsService.findAll();
    }
}
