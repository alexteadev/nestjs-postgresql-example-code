import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FilmsModel } from './films.model';
import { SubgenresModel } from '../../subgenres/subgenres.model';

@Entity('film-subgenre')
export class FilmSubgenreModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => FilmsModel, (film) => film.filmSubgenres)
    film: FilmsModel;

    @ManyToOne(() => SubgenresModel, (subgenre) => subgenre.filmSubgenres)
    subgenre: SubgenresModel;
}
