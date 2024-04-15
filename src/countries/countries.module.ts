import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.services';
import { CountryModel } from './countries.model';

@Module({
    imports: [TypeOrmModule.forFeature([CountryModel])],
    controllers: [CountriesController],
    providers: [CountriesService],
})
export class CountriesModule {}
