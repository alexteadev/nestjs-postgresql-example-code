import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModel } from './tags.model';
import { TagsService } from './tags.services';

@Module({
    imports: [TypeOrmModule.forFeature([TagsModel])],
    controllers: [TagsController],
    providers: [TagsService],
})
export class TagsModule {}
