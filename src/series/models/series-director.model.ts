import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SeriesModel } from './series.model';
import { DirectorsModel } from 'src/directors/directors.model';

@Entity('series-director')
export class SeriesDirectorModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SeriesModel, (series) => series.seriesDirectors)
    series: SeriesModel;

    @ManyToOne(() => DirectorsModel, (director) => director.seriesDirectors)
    director: DirectorsModel;
}
