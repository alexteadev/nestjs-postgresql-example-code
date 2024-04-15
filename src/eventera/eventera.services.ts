import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { eraData } from 'src/data/DataEra';
import { Repository } from 'typeorm';
import { EventEraModel } from './evetera.model';

@Injectable()
export class EventEraService {
    constructor(
        @InjectRepository(EventEraModel)
        private readonly epochRepository: Repository<EventEraModel>,
    ) {}

    async createEra() {
        for (const name in eraData) {
            const existingEpoch = await this.epochRepository.findOne({ where: { originalId } });

            if (!existingEpoch) {
                const epoch = this.epochRepository.create({
                    originalId,
                    name,
                });

                await this.epochRepository.save(epoch);
            }
        }
    }
}
