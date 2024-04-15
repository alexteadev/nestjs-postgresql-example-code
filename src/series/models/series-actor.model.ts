import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { SeriesModel } from './series.model';
import { ActorsModel } from 'src/actors/actors.model';

@Entity('series-actor')
export class SeriesActorModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    as: string;

    @ManyToOne(() => SeriesModel, (series) => series.seriesActors)
    series: SeriesModel;

    @ManyToOne(() => ActorsModel, (actor) => actor.seriesActors)
    actor: ActorsModel;
}
