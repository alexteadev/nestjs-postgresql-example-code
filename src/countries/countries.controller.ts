import { Controller, Get } from '@nestjs/common';
import { CountriesService } from './countries.services';

@Controller('countries')
export class CountriesController {
    constructor(private readonly countryService: CountriesService) {}

    @Get('create')
    async createCounty() {
        return await this.countryService.createCountries();
    }
}
