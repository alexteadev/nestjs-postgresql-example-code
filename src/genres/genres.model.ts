import { FilmGenreModel } from 'src/films/models/films-genre.model';
import { SeriesGenreModel } from 'src/series/models/series-genre.model';
import { SubgenresModel } from 'src/subgenres/subgenres.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('genre')
export class GenresModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    originalId: number;

    @Column()
    name: string;

    @OneToMany(() => SubgenresModel, (subgenresModel) => subgenresModel.genre)
    subgenres: SubgenresModel[];

    @OneToMany(() => FilmGenreModel, (filmGenreModel) => filmGenreModel.genre)
    filmGenres: FilmGenreModel[];

    @OneToMany(() => SeriesGenreModel, (seriesGenreModel) => seriesGenreModel.genre)
    seriesGenres: SeriesGenreModel[];
}
