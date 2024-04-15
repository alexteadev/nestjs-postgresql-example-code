import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { FilmsModel } from './films.model';
import { DirectorsModel } from 'src/directors/directors.model';

@Entity('film-director')
export class FilmDirectorModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => FilmsModel, (film) => film.filmDirectors)
    film: FilmsModel;

    @ManyToOne(() => DirectorsModel, (director) => director.filmDirectors)
    director: DirectorsModel;
}
