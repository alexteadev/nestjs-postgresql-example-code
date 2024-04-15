import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AwardModel } from './awards.model';
import { awardsData } from 'src/data/AwardsData';

@Injectable()
export class AwardsService {
    constructor(
        @InjectRepository(AwardModel)
        private readonly awardRepository: Repository<AwardModel>,
    ) {}

    async createAwards() {
        for (const name in awardsData) {
            let existingAward = await this.awardRepository.findOne({ where: { id } });

            if (!existingAward) {
                existingAward = this.awardRepository.create({
                    id,
                    name,
                });
                await this.awardRepository.save(existingAward);
            }
        }
    }
}
