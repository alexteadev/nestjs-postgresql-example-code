import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SeriesModel } from './series.model';
import { AwardModel } from 'src/awards/awards.model';

@Entity('series-award')
export class SeriesAwardModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SeriesModel, (series) => series.seriesAwards)
    series: SeriesModel;

    @ManyToOne(() => AwardModel, (award) => award.seriesAwards)
    award: AwardModel;
}
