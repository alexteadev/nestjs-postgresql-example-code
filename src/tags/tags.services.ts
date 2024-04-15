import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { tagsData } from 'src/data/DataTags';
import { TagsModel } from './tags.model';

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(TagsModel)
        private readonly tagsRes: Repository<TagsModel>,
    ) {}

    // ...

    async findAll(): Promise<TagsModel[]> {
        return await this.tagsRes.find();
    }
}
