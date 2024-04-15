import { FilmActorModel } from 'src/films/models/films-actor.model';
import { SeriesActorModel } from 'src/series/models/series-actor.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('actor')
export class ActorsModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    imdbID: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    photo: string;

    @Column({ nullable: true })
    birthday: Date;

    @Column({ nullable: true })
    deathday: Date;

    @Column({ nullable: true })
    gender: number;

    @Column({ nullable: true })
    placeOfBirth: string;

    @Column('text')
    biography: string;

    @Column()
    filmCount: number;

    @Column('float')
    totalRatings: number;

    @OneToMany(() => FilmActorModel, (filmActorModel) => filmActorModel.actor)
    filmActors: FilmActorModel[];

    @OneToMany(() => SeriesActorModel, (seriesActorModel) => seriesActorModel.actor)
    seriesActors: SeriesActorModel[];
}
