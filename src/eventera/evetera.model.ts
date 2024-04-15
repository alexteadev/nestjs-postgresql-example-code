import { FilmEraModel } from 'src/films/models/films-era.model';
import { SeriesEraModel } from 'src/series/models/series-era.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('event-era')
export class EventEraModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    originalId: number;

    @Column()
    name: string;

    @OneToMany(() => FilmEraModel, (filmEpochModel) => filmEpochModel.era)
    filmEpochs: FilmEraModel[];

    @OneToMany(() => SeriesEraModel, (seriesEpochModel) => seriesEpochModel.era)
    seriesEpochs: SeriesEraModel[];
}
