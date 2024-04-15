import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryModel } from './countries.model';
import { countriesData } from 'src/data/CountriesData';

@Injectable()
export class CountriesService {
    constructor(
        @InjectRepository(CountryModel)
        private readonly countryRepository: Repository<CountryModel>,
    ) {}

    async createCountries() {
        for (const country of countriesData) {
            const existingCountry = await this.countryRepository.findOne({
                where: { code: country.iso_3166_1 },
            });

            if (existingCountry) {
                continue;
            }

            const newCountry = this.countryRepository.create({
                code: country.iso_3166_1,
                name: country.english_name,
            });

            await this.countryRepository.save(newCountry);
        }
    }
}
