import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwardsController } from './awards.controller';
import { AwardsService } from './awards.services';
import { AwardModel } from './awards.model';

@Module({
    imports: [TypeOrmModule.forFeature([AwardModel])],
    controllers: [AwardsController],
    providers: [AwardsService],
})
export class AwardsModule {}
