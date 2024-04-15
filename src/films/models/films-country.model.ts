import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { FilmsModel } from './films.model';
import { CountryModel } from 'src/countries/countries.model';

@Entity('film-country')
export class FilmCountryModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => FilmsModel, (film) => film.filmCountry)
    film: FilmsModel;

    @ManyToOne(() => CountryModel, (country) => country.filmCountry)
    country: CountryModel;
}
