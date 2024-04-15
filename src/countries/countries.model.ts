import { FilmCountryModel } from 'src/films/models/films-country.model';
import { SeriesCountryModel } from 'src/series/models/series-country.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('country')
export class CountryModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;

    @OneToMany(() => FilmCountryModel, (filmCountryModel) => filmCountryModel.country)
    filmCountry: FilmCountryModel[];

    @OneToMany(() => SeriesCountryModel, (seriesCountryModel) => seriesCountryModel.country)
    seriesCountry: SeriesCountryModel[];
}
