import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { FilmsModel } from './films.model';
import { AwardModel } from 'src/awards/awards.model';

@Entity('film-award')
export class FilmAwardModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => FilmsModel, (film) => film.filmAwards)
    film: FilmsModel;

    @ManyToOne(() => AwardModel, (award) => award.filmAwards)
    award: AwardModel;
}
