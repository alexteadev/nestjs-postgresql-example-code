import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { CountryModel } from 'src/countries/countries.model';
import { SeriesModel } from './series.model';

@Entity('series-country')
export class SeriesCountryModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SeriesModel, (film) => film.seriesCountry)
    series: SeriesModel;

    @ManyToOne(() => CountryModel, (country) => country.seriesCountry)
    country: CountryModel;
}
