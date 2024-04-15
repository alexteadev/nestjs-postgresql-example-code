import { FilmAwardModel } from 'src/films/models/films-award.model';
import { SeriesAwardModel } from 'src/series/models/series-award.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('award')
export class AwardModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    originalId: number;

    @Column()
    name: string;

    @OneToMany(() => FilmAwardModel, (filmAwardModel) => filmAwardModel.award)
    filmAwards: FilmAwardModel[];

    @OneToMany(() => SeriesAwardModel, (seriesAwardModel) => seriesAwardModel.award)
    seriesAwards: SeriesAwardModel[];
}
