import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FilmsModel } from './films.model';
import { GenresModel } from 'src/genres/genres.model';

@Entity('film-genre')
export class FilmGenreModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => FilmsModel, (film) => film.filmGenres)
    film: FilmsModel;

    @ManyToOne(() => GenresModel, (genre) => genre.filmGenres)
    genre: GenresModel;
}
