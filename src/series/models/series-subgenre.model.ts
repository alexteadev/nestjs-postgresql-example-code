import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SubgenresModel } from '../../subgenres/subgenres.model';
import { SeriesModel } from './series.model';

@Entity('series-subgenre')
export class SeriesSubgenreModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SeriesModel, (series) => series.seriesSubgenres)
    series: SeriesModel;

    @ManyToOne(() => SubgenresModel, (subgenre) => subgenre.seriesSubgenres)
    subgenre: SubgenresModel;
}
