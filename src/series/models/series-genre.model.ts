import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SeriesModel } from './series.model';
import { GenresModel } from 'src/genres/genres.model';

@Entity('series-genre')
export class SeriesGenreModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SeriesModel, (series) => series.seriesGenres)
    series: SeriesModel;

    @ManyToOne(() => GenresModel, (genre) => genre.seriesGenres)
    genre: GenresModel;
}
