import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { FilmsModel } from './films.model';
import { ActorsModel } from 'src/actors/actors.model';

@Entity('film-actor')
export class FilmActorModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    as: string;

    @ManyToOne(() => FilmsModel, (film) => film.filmActors)
    film: FilmsModel;

    @ManyToOne(() => ActorsModel, (actor) => actor.filmActors)
    actor: ActorsModel;
}
